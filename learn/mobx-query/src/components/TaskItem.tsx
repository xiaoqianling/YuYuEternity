import { Task, updateTask, deleteTask } from "@/api/tasks";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useMutation, useQueryClient } from "react-query";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const store = useTaskStore();
  const queryClient = useQueryClient();

  // 更新任务状态的mutation
  const updateTaskMutation = useMutation(
    (updatedTask: Task) => updateTask(updatedTask),
    {
      onSuccess: (updatedTask) => {
        store.updateTask(updatedTask);
        queryClient.invalidateQueries("tasks");
      },
      onError: (error) => {
        console.error("Error updating task:", error);
      },
    },
  );

  // 删除任务的mutation
  const deleteTaskMutation = useMutation((id: string) => deleteTask(id), {
    onSuccess: () => {
      store.deleteTask(task.id);
      queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });

  const toggleCompleted = () => {
    updateTaskMutation.mutate({
      ...task,
      completed: !task.completed,
    });
  };

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompleted}
          className="mr-2"
        />
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
