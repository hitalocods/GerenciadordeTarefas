import { motion } from "framer-motion";
import { X } from "lucide-react";

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-slate-900 p-6 rounded-2xl text-gray-400">
        Nenhuma tarefa adicionada ainda.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 p-4 rounded-xl flex items-center justify-between"
        >
          <div
            onClick={() => onToggleTask(task.id)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                task.priority === "alta"
                  ? "bg-red-500"
                  : task.priority === "media"
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
            />

            <span
              className={`text-sm ${
                task.completed
                  ? "line-through text-gray-500"
                  : "text-white"
              }`}
            >
              {task.title}
            </span>
          </div>

          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-400 hover:text-red-300 transition"
          >
            <X size={18} />
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default TaskList;