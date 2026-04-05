import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2Rm_wVuoJUNZ3tzCuILbnTPld_qwZZQs",
  authDomain: "dons-badass-empire-ai.firebaseapp.com",
  projectId: "dons-badass-empire-ai",
  storageBucket: "dons-badass-empire-ai.firebasestorage.app",
  messagingSenderId: "445080148231",
  appId: "1:445080148231:web:95136966f642704ec58da2",
  measurementId: "G-99QGF4FSQ3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
