import { configureStore } from "@reduxjs/toolkit";
import project from "../features/projectSlice";
import user from "../features/userSlice";

export const store = configureStore({
  reducer: {
    project,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
