import { addTask } from "@/api/tasks";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const store = useTaskStore();
  const queryClient = useQueryClient();

  // 添加任务的mutation
  const addTaskMutation = useMutation((title: string) => addTask(title), {
    onSuccess: (newTask) => {
      store.addTask(newTask);
      queryClient.invalidateQueries("tasks");
      setTitle("");
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTaskMutation.mutate(title);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-b">
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={addTaskMutation.isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
        >
          {addTaskMutation.isLoading ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
