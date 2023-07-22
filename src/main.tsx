import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import theme from "./theme.ts";
import { PageNotFound } from "./components/PageNotFound.tsx";
import WithSubnavigation from "./components/Navbar/";
import Landing from "./views/Landing";
import About from "./views/About";
import Who from "./views/Who/index.tsx";
import SidebarWithHeader from "./components/Navbar/DashNav.tsx";
import Dashboard from "./views/Dashboard/index.tsx";
import RegisterCard from "./views/Auth/Register.tsx";
import LoginCard from "./views/Auth/Login.tsx";
import Projects from "./views/Dashboard/Projects/index.tsx";
import Tasks from "./views/Dashboard/Projects/Tasks.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { UserProtect } from "./components/Protect/UserProtect.tsx";
import TasksPage from "./views/Dashboard/Tasks/index.tsx";

export const Layout = () => {
  return (
    <>
      <WithSubnavigation />
      <Outlet />
    </>
  );
};

export const DashLayout = () => {
  return (
    <>
      <UserProtect>
        <SidebarWithHeader>
          <Outlet />
        </SidebarWithHeader>
      </UserProtect>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/who",
        element: <Who />,
      },
    ],
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <DashLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:projectId",
        element: <Tasks />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],

    errorElement: <PageNotFound />,
  },
  {
    path: "/register",
    element: <RegisterCard />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/login",
    element: <LoginCard />,
    errorElement: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
