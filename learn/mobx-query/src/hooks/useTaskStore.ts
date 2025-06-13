import { useContext } from "react";
import { TaskStore } from "../models/taskStore";
import { TaskStoreContext } from "../App";

export const useTaskStore = (): TaskStore => {
  const store = useContext(TaskStoreContext);
  if (!store) {
    throw new Error("useTaskStore must be used within a TaskStoreProvider");
  }
  return store;
};
