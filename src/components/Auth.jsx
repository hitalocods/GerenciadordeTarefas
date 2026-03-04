import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-900 p-8 rounded-2xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">
          SmartTasks Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-slate-800 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 bg-slate-800 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 p-3 rounded-xl"
        >
          Entrar
        </button>

        <button
          onClick={handleRegister}
          className="w-full bg-slate-700 p-3 rounded-xl"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
}

export default Auth;