import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title,
      priority,
    });

    setTitle("");
    setPriority("media");
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nova tarefa..."
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 py-3 rounded-xl hover:bg-indigo-500 transition"
        >
          Adicionar Tarefa
        </button>

      </form>
    </div>
  );
}

export default TaskForm;