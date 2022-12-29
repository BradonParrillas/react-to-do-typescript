import { Task } from "../types";
import printWithColor from "../utilities/printWithColor";

export const saveInLocalStorage = (tasks: Array<Task>): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  printWithColor("task saved in local storage");
};

export const getFromLocalStorage = (): Array<Task> => {
  const data = localStorage.getItem("tasks");
  if (typeof data === "string") {
    const dataObj = JSON.parse(data);
    return dataObj;
  }
  return [];
};
