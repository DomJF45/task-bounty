import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";
import { iUser } from "../data/dataBase";
import authService, { IncomingUserData } from "./userService";

interface UserState {
  user: iUser | undefined;
  loading: boolean;
  success: boolean;
  error: Error | undefined;
}

type UserError = {
  message: string;
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  loading: false,
  success: false,
  error: undefined,
};

export const login = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const resToken = await authService.login(userData);
      console.log(resToken.data.token);
      localStorage.setItem("token", JSON.stringify(resToken.data.token));
      const resUser = await authService.getUser(resToken.data.token);
      console.log(resUser);
      return resUser;
    } catch (error) {
      thunkAPI.rejectWithValue({
        message: "Could Not Login",
      });
    }
  }
);

export const register = createAsyncThunk<
  iUser,
  IncomingUserData,
  {
    rejectValue: UserError;
  }
>("user/register", async (userData: IncomingUserData, thunkAPI) => {
  try {
    const resToken = await authService.register(userData);
    localStorage.setItem("token", JSON.stringify(resToken.data.token));
    return await authService.getUser(resToken.data.token);
  } catch (error) {
    thunkAPI.rejectWithValue({
      message: "Could Not Register",
    });
  }
});

export const getUser = createAsyncThunk<
  iUser,
  string,
  { rejectValue: UserError }
>("/user", async (token: string, thunkAPI) => {
  if (token) {
    try {
      const res = await authService.getUser(token);
      localStorage.setItem("user", JSON.stringify({ ...res, password: "" }));
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue({
        message: "Could Not Get User",
      });
    }
  } else {
    thunkAPI.rejectWithValue({
      message: "No Token",
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    reset(state) {
      state.loading = false;
      state.error = undefined;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.success = action.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = undefined;
      state.success = false;
      state.loading = false;
      state.error = action.payload as Error;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = undefined;
      state.success = false;
      state.loading = false;
      state.error = action.payload as Error;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = undefined;
      state.success = false;
      state.error = action.payload as Error;
      state.loading = false;
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { logout, reset } = userSlice.actions;
export default userSlice.reducer;
