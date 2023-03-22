
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBhQlvQx5ydy-kkQg0RsEIWnxY2C4rPQY8",
  authDomain: "food-app-f6b3e.firebaseapp.com",
  projectId: "food-app-f6b3e",
  storageBucket: "food-app-f6b3e.appspot.com",
  messagingSenderId: "1046842777057",
  appId: "1:1046842777057:web:2fe11eeff7d67ceb2b46a0",
  measurementId: "G-XS5085K21L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
