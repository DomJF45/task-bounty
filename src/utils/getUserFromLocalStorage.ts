import { iUser } from "../data/dataBase";

export function getUserFromLocalStorage(): iUser | undefined {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return undefined;
  }
}

export function getTokenFromLocalStorage(): string | undefined {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  } else {
    return undefined;
  }
}
