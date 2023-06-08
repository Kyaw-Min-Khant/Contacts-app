import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyChuxUfvaDNuM3ERTCwCmWpRxvZhIYDdcs",
  authDomain: "contant-dd3ff.firebaseapp.com",
  projectId: "contant-dd3ff",
  storageBucket: "contant-dd3ff.appspot.com",
  messagingSenderId: "592854765536",
  appId: "1:592854765536:web:5fb4565e0992cf2d7b6585",
  measurementId: "G-FLKQ7YP3H6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
