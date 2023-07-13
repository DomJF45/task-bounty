import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import getUserFromLocalStorage from "../utils/getUserFromLocalStorage";
import { dataBase, iContributor, iManager, iUser } from "../data/dataBase";
import { login } from "./userService";

interface UserState {
  user: iManager | iContributor | undefined;
  loading: boolean;
  success: boolean;
  error: Error | undefined;
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  loading: false,
  success: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      localStorage.removeItem("user");
    },
    reset(state) {
      state.loading = false;
      state.error = undefined;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
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
  },
});

export const { logout, reset } = userSlice.actions;
export default userSlice.reducer;
