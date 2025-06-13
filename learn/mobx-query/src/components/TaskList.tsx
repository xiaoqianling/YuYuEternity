import { fetchTasks } from "@/api/tasks";
import { useQuery } from "react-query";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  // 使用React-Query获取任务数据
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery("tasks", fetchTasks);

  if (isLoading) {
    return <div className="p-5 text-center">Loading tasks...</div>;
  }

  if (isError) {
    return (
      <div className="p-5 text-center text-red-500">Error: {error.message}</div>
    );
  }

  if (!tasks) {
    return <div className="p-5 text-center">No tasks found</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <TaskForm />
      {tasks.length === 0 ? (
        <div className="p-5 text-center text-gray-500">No tasks yet</div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
