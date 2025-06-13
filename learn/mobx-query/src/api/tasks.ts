// 任务类型定义
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// 模拟任务数据
let mockTasks: Task[] = [
  {
    id: "1",
    title: "Learn MobX",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Learn React Query",
    completed: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "3",
    title: "Build a demo app",
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 获取所有任务
export const fetchTasks = async (): Promise<Task[]> => {
  await delay(500); // 模拟网络延迟
  return [...mockTasks];
};

// 添加新任务
export const addTask = async (title: string): Promise<Task> => {
  await delay(500); // 模拟网络延迟
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  mockTasks = [...mockTasks, newTask];
  return newTask;
};

// 更新任务状态
export const updateTask = async (task: Task): Promise<Task> => {
  await delay(500); // 模拟网络延迟
  mockTasks = mockTasks.map((t) => (t.id === task.id ? task : t));
  return task;
};

// 删除任务
export const deleteTask = async (id: string): Promise<void> => {
  await delay(500); // 模拟网络延迟
  mockTasks = mockTasks.filter((task) => task.id !== id);
};
