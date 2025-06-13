import { createContext, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TaskStore } from "./models/taskStore";
import TaskPage from "./pages/TaskPage";

// 创建任务存储上下文
export const TaskStoreContext = createContext<TaskStore | undefined>(undefined);

// 任务存储提供者
const TaskStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useMemo(() => new TaskStore(), []);
  return (
    <TaskStoreContext.Provider value={store}>
      {children}
    </TaskStoreContext.Provider>
  );
};

// 创建React-Query客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分钟后数据过期
      cacheTime: 1000 * 60 * 10, // 10分钟后从缓存中移除
      retry: 3, // 出错时重试3次
      refetchOnWindowFocus: false, // 窗口聚焦时不重新获取数据
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskStoreProvider>
        <TaskPage />
      </TaskStoreProvider>
    </QueryClientProvider>
  );
};

export default App;
