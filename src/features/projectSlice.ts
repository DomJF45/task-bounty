import { createSlice } from "@reduxjs/toolkit";
import {
  dataBase,
  iContributor,
  iManager,
  iProject,
  iStatusColumn,
} from "../data/dataBase";
import getUserFromLocalStorage from "../utils/getUserFromLocalStorage";
import { getProjectTasks, getUserProjects } from "./projectService";
import { INITIAL_COLUMNS } from "../views/Dashboard/Projects/util";

interface ProjectState {
  projects: iProject[];
  tasks: iStatusColumn;
  loading: boolean;
  success: boolean;
  error: Error | undefined;
}

const user: iContributor | iManager | undefined = getUserFromLocalStorage();
//const user = dataBase.users[0];
const getProjects = dataBase.projects?.filter((project) => {
  return project.projectManager.id === user?.id;
});

const initialState: ProjectState = {
  projects: getProjects || ([] as iProject[]),
  tasks: INITIAL_COLUMNS,
  loading: false,
  success: false,
  error: undefined,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset(state) {
      state.loading = false;
      state.success = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getUserProjects.rejected, (state, action) => {
      state.projects = [];
      state.success = false;
      state.loading = false;
      state.error = action.payload as Error;
    });
    builder.addCase(getUserProjects.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProjectTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getProjectTasks.rejected, (state, action) => {
      state.tasks = INITIAL_COLUMNS;
      state.loading = false;
      state.success = false;
      state.error = action.payload as Error;
    });
    builder.addCase(getProjectTasks.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
