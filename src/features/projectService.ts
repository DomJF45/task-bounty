import { createAsyncThunk } from "@reduxjs/toolkit";
import { dataBase, iProject, iStatusColumn } from "../data/dataBase";

type ProjectError = {
  message: string;
};

const getUserProjects = createAsyncThunk<
  iProject[],
  string,
  {
    rejectValue: ProjectError;
  }
>("user/projects", async (userId, thunkAPI) => {
  const response = await new Promise<iProject[]>((resolve) => {
    //const user = getUserFromLocalStorage();
    setTimeout(() => {
      if (dataBase.projects !== undefined) {
        resolve(
          dataBase.projects.filter((project: iProject) => {
            if (project) {
              return project.projectManager.id === userId;
            }
          })
        );
      }
    }, 1000);
  });
  if (!response) {
    thunkAPI.rejectWithValue({
      message: "Could Not Get Projects",
    });
    return [];
  }
  return response;
});

const getProjectTasks = createAsyncThunk<
  iStatusColumn,
  string,
  {
    rejectValue: ProjectError;
  }
>("user/projects/:projectId/tasks", async (projectId, thunkAPI) => {
  const response = await new Promise<iStatusColumn>((resolve) => {
    setTimeout(() => {
      const projectById = dataBase.projects?.find(
        (p: iProject) => p.id === projectId
      );
      if (projectById) {
        resolve(projectById.tasks);
      }
    }, 1500);
  });
  if (!response) {
    thunkAPI.rejectWithValue({
      message: "Could not Get Project",
    });
  }
  console.log(response);
  return response;
});

export { getUserProjects, getProjectTasks };
