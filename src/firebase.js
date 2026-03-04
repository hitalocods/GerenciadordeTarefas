import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsq5d1tXjtmqYJyTtAXrYWmI_QYDUr5JA",
  authDomain: "gerenciadordetarefas-56bd9.firebaseapp.com",
  projectId: "gerenciadordetarefas-56bd9",
  storageBucket: "gerenciadordetarefas-56bd9.firebasestorage.app",
  messagingSenderId: "898421686996",
  appId: "1:898421686996:web:9f37a46dc572046584f141"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);