import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential =
          await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
          displayName: nickname,
        });
      }
    } catch (err) {
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        setError("Esse email já está em uso.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha precisa ter pelo menos 6 caracteres.");
      } else if (err.code === "auth/invalid-email") {
        setError("Email inválido.");
      } else if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta.");
      } else {
        setError("Erro ao autenticar.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-sm space-y-6">

        <h2 className="text-xl font-bold text-center">
          {isLogin ? "Entrar" : "Criar Conta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Apelido"
              className="w-full p-2 rounded bg-slate-800"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-slate-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 rounded bg-slate-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 rounded-lg"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </button>

        </form>

        <p className="text-sm text-center">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400"
          >
            {isLogin ? "Criar conta" : "Entrar"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Auth;