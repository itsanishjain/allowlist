import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyAj2bmupAzNZ7eSNsOA3n1uoOrsbsKcV3k",
  authDomain: "allowlist-51697.firebaseapp.com",
  projectId: "allowlist-51697",
  storageBucket: "allowlist-51697.appspot.com",
  messagingSenderId: "441125607199",
  appId: "1:441125607199:web:0ea8e9a1eaf47efd02822a",
  measurementId: "G-8VC2L2RBZ3",
});

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
