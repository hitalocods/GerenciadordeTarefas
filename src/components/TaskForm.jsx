import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("baixa");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      priority,
      completed: false,
    };

    onAddTask(newTask);
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova tarefa..."
        className="flex-1 bg-slate-800 p-3 rounded-xl text-white"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-slate-800 p-3 rounded-xl"
      >
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>

      <button className="bg-indigo-600 px-4 rounded-xl">
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;