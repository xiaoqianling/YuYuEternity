import { makeObservable, observable, action } from "mobx";
import { Task } from "../api/tasks";

export class TaskStore {
  // @observable 可观测的状态
  @observable tasks: Task[] = [];
  @observable loading = false;
  @observable error: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  setTasks = (tasks: Task[]) => {
    this.tasks = tasks;
  };

  @action
  addTask = (task: Task) => {
    this.tasks.push(task);
  };

  @action
  updateTask = (updatedTask: Task) => {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
  };

  @action
  deleteTask = (id: string) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };

  @action
  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  @action
  setError = (error: string | null) => {
    this.error = error;
  };
}
