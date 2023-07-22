import axios from "axios";

const URL = "https://task-bounty.fly.dev";

const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(URL + "/user/login", userData);
  if (response.data) {
    return response.data;
  }
};

const getUser = async (token: string) => {
  const response = await axios.get(URL + "/user", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (response.data.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data.data));
    return response.data.data.data;
  }
};

export type IncomingUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  title: "Manager (PM)" | "Contributor (IC)";
};

const register = async (userData: IncomingUserData) => {
  const response = await axios.post(URL + "/user/register", userData);
  if (response.data) {
    return response.data;
  }
};

const authService = {
  register,
  login,
  getUser,
};

export default authService;

// old code

/*
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
*/

/*
const register = createAsyncThunk(
  "user/register",
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      userType: "Manager (PM)" | "Contributor (IC)";
    },
    thunkAPI
  ) => {
    const response = await new Promise<iManager | iContributor>((resolve) => {
      setTimeout(() => {
        resolve(makeUserType(userData));
      }, 900);
    });
    if (!response) {
      thunkAPI.rejectWithValue("Cannot Create User");
      return undefined;
    }
    localStorage.setItem("user", JSON.stringify({ ...response, password: "" }));
    return response;
  }
);
*/

/*
const login = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    const { email, password } = userData;
    const res = await axios.post("user/login", {
      email: email,
      password: password,
    });
    if (res) {
      console.log("Token from backend");
      localStorage.setItem("userToken", JSON.stringify(res.data)); // should = jwt token
    } else {
      thunkAPI.rejectWithValue("Cannot Get User");
    }
  }
);
*/

/*
const register = createAsyncThunk<
  iUser,
  IncomingUserData,
  {
    rejectValue: UserError;
  }
>("user/register", async (userData: IncomingUserData, thunkAPI) => {
  const res = await axios.post("/user/register", userData);
  if (res) {
    localStorage.setItem("user", JSON.stringify({ ...res, password: "" }));
    return res.data;
  } else {
    thunkAPI.rejectWithValue({
      message: "Could Not Register",
    });
  }
});
*/

/*
const getUser = createAsyncThunk<
  iUser,
  void,
  {
    rejectValue: string;
  }
>("user", async (_: void, thunkAPI) => {
  const res = await axios.get(URL + "/user", axiosConfig);
 
  if (res) {
    localStorage.setItem("user", JSON.stringify({ ...res.data, password: "" }));
    return res.data;
  } else {
    thunkAPI.rejectWithValue("Could Not Get User");
  }
});
*/
