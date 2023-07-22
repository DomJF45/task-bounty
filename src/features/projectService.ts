import { iTask } from "../data/dataBase";
import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/getUserFromLocalStorage";

const URL = "https://task-bounty.fly.dev";

const getUserProjects = async (token: string) => {
  console.log(token);
  const response = await axios.get(URL + "/projects", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (response.data) {
    console.log(response.data.data);
    return response.data.data.data;
  }
};

const addTask = async (data: { projectId: string; task: iTask }) => {
  const { projectId, task } = data;
  const token = getTokenFromLocalStorage();
  if (token !== undefined) {
    return await axios.post(URL + "/projects/" + projectId + "/tasks", task, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
};

const getTasks = async (projectId: string) => {
  const token = getTokenFromLocalStorage();
  if (token !== undefined) {
    const response = await axios.get(
      URL + "/projects/" + projectId + "/getTasks",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data) {
      return response.data.data.data;
    }
  }
};

const takeProject = async (projectId: string) => {
  const token = getTokenFromLocalStorage();
  console.log(token);
  if (token !== undefined) {
    await axios.put(
      URL + "/projects/" + projectId,
      {},
      {
        headers: {
          Authorization: "Bearer " + getTokenFromLocalStorage(),
        },
      }
    );
  }
};

export type newProjectIncoming = {
  name: string;
  rank: "S" | "A" | "B" | "C" | "D" | "E" | "F";
  exp: number;
};

const addProject = async (project: newProjectIncoming) => {
  const token = getTokenFromLocalStorage();
  if (token !== undefined) {
    await axios.post(URL + "/project", project, {
      headers: {
        Authorization: "Bearer " + getTokenFromLocalStorage(),
      },
    });
  }
};

const getProjectById = async (projectId: string) => {
  const token = getTokenFromLocalStorage();
  if (token !== undefined) {
    const response = await axios.get(URL + "/project/" + projectId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.data.data.data) {
      return response.data.data.data;
    }
  }
};

const projectService = {
  getUserProjects,
  getProjectById,
  addProject,
  takeProject,
  getTasks,
  addTask,
};
export default projectService;
