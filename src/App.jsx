import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("todas");

  // 🔐 Observa login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Busca tarefas do usuário
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ Criar tarefa
  async function addTask(task) {
    await addDoc(collection(db, "tasks"), {
      ...task,
      completed: false,
      userId: user.uid,
    });
  }

  // 🗑 Deletar
  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
  }

  // ✅ Alternar concluída
  async function toggleTask(id, completed) {
    await updateDoc(doc(db, "tasks", id), {
      completed: !completed,
    });
  }

  if (!user) return <Auth />;

  // 🔎 Filtro
  const filteredTasks = tasks.filter((task) => {
    if (filter === "concluidas") return task.completed;
    if (filter === "pendentes") return !task.completed;
    if (filter === "alta") return task.priority === "alta";
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "alta"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6 hidden md:flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Gerenciador De Tarefas</h1>
        <div className="flex items-center gap-2 text-gray-400">
          <LayoutDashboard size={18} />
          Dashboard
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Bem-vindo 👋</h2>
            <p className="text-gray-400">
              {user.displayName || user.email}
            </p>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700 transition"
          >
            Sair
          </button>
        </div>

        {/* Progresso */}
        <div className="bg-slate-900 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progresso Geral</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>

        {/* Cards filtro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Card
            icon={<LayoutDashboard size={20} />}
            label="Total"
            value={totalTasks}
            active={filter === "todas"}
            onClick={() => setFilter("todas")}
          />
          <Card
            icon={<CheckCircle size={20} />}
            label="Concluídas"
            value={completedTasks}
            color="text-emerald-400"
            active={filter === "concluidas"}
            onClick={() => setFilter("concluidas")}
          />
          <Card
            icon={<Clock size={20} />}
            label="Pendentes"
            value={pendingTasks}
            color="text-yellow-400"
            active={filter === "pendentes"}
            onClick={() => setFilter("pendentes")}
          />
          <Card
            icon={<AlertTriangle size={20} />}
            label="Alta Prioridade"
            value={highPriorityTasks}
            color="text-red-400"
            active={filter === "alta"}
            onClick={() => setFilter("alta")}
          />
        </div>

        {/* Form */}
        <TaskForm onAddTask={addTask} />

        {/* Lista */}
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
        />
      </main>
    </div>
  );
}

function Card({ icon, label, value, color, onClick, active }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`p-5 rounded-2xl shadow-lg flex flex-col gap-3 cursor-pointer transition ${active
          ? "bg-indigo-600/20 border border-indigo-500"
          : "bg-slate-900 hover:bg-slate-800"
        }`}
    >
      <div className="text-gray-400 flex items-center gap-2">
        {icon}
        {label}
      </div>

      <div className={`text-2xl font-bold ${color || "text-white"}`}>
        {value}
      </div>
    </motion.div>
  );
}

export default App;