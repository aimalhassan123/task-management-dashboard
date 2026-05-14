import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgq3VYiDvO8PtrbSJi-Gywq5wgLKnd5dI",
  authDomain: "team-task-manager-1.firebaseapp.com",
  projectId: "team-task-manager-1",
  storageBucket: "team-task-manager-1.firebasestorage.app",
  messagingSenderId: "1027432273242",
  appId: "1:1027432273242:web:9324a27f0d7687ca060f63",
  measurementId: "G-HL93RMXZPQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);