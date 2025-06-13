import TaskList from "@/components/TaskList";

const TaskPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Task Manager
        </h1>
        <TaskList />
      </div>
    </div>
  );
};

export default TaskPage;
