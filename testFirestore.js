import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

const testConnection = async () => {
  try {
    const docRef = await addDoc(collection(db, "GroundedEmpire"), {
      status: "Online",
      message: "Master Builder is active",
      timestamp: new Date()
    });
    console.log("Success! Data saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

testConnection();
