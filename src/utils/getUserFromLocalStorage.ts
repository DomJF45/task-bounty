import { iManager, iContributor } from "../data/dataBase";

export default function getUserFromLocalStorage():
  | iManager
  | iContributor
  | undefined {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return undefined;
  }
}
