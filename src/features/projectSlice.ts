import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { iProject, iTask } from "../data/dataBase";
import projectService, { newProjectIncoming } from "./projectService";

interface ProjectState {
  projects: iProject[];
  tasks: iTask[];
  loading: boolean;
  takenLoading: boolean;
  success: boolean;
  error: Error | undefined;
}

type ProjectError = {
  message: string;
};

const initialState: ProjectState = {
  projects: [],
  tasks: [],
  loading: false,
  takenLoading: false,
  success: false,
  error: undefined,
};

export const getUserProjects = createAsyncThunk<
  iProject[],
  string,
  {
    rejectValue: ProjectError;
  }
>("user/projects", async (token, thunkAPI) => {
  try {
    return await projectService.getUserProjects(token);
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: "error",
    });
  }
});

export const addProject = createAsyncThunk<
  void,
  newProjectIncoming,
  {
    rejectValue: ProjectError;
  }
>("user/project", async (project: newProjectIncoming, thunkAPI) => {
  try {
    return await projectService.addProject(project);
  } catch (error) {
    thunkAPI.rejectWithValue({
      message: "error",
    });
  }
});

export const takeProject = createAsyncThunk(
  "user/takeProject",
  async (projectId: string, thunkAPI) => {
    try {
      return await projectService.takeProject(projectId);
    } catch (error) {
      thunkAPI.rejectWithValue({
        message: "error",
      });
    }
  }
);

export const getProjectById = createAsyncThunk(
  "user/projectById",
  async (projectId: string, thunkAPI) => {
    try {
      return await projectService.getProjectById(projectId);
    } catch (error) {
      thunkAPI.rejectWithValue({
        message: "error",
      });
    }
  }
);

export const getTasks = createAsyncThunk(
  "user/project/tasks",
  async (projectId: string, thunkAPI) => {
    try {
      return await projectService.getTasks(projectId);
    } catch (error) {
      thunkAPI.rejectWithValue({
        message: "error",
      });
    }
  }
);

export const addTask = createAsyncThunk(
  "user/project/addTask",
  async (data: { projectId: string; task: iTask }, thunkAPI) => {
    try {
      return await projectService.addTask(data);
    } catch (error) {
      thunkAPI.rejectWithValue({
        message: "error",
      });
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset(state) {
      state.loading = false;
      state.success = false;
      state.error = undefined;
      state.takenLoading = false;
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

    builder.addCase(takeProject.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(takeProject.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload as Error;
    });
    builder.addCase(takeProject.pending, (state) => {
      state.takenLoading = true;
    });

    builder.addCase(addProject.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload as Error;
      state.loading = false;
    });
    builder.addCase(addProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.success = true;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload as Error;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTask.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload as Error;
    });
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;

/*
 *
 * 
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
*/
