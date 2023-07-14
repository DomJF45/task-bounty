import { createAsyncThunk } from "@reduxjs/toolkit";
import { dataBase, iManager, iContributor, iUser } from "../data/dataBase";

const login = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    const { email, password } = userData;
    const response = await new Promise<iManager | iContributor | undefined>(
      (resolve) => {
        setTimeout(() => {
          resolve(
            dataBase.users.find(
              (user: iUser) =>
                email === user.email && password === user.password
            )
          );
        }, 1000);
      }
    );
    if (!response) {
      thunkAPI.rejectWithValue("Cannot Get User");
      return undefined;
    }
    localStorage.setItem("user", JSON.stringify({ ...response, password: "" }));
    return response;
  }
);

export { login };
