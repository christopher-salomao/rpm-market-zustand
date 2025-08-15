import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDu0MCeEz1JkNxQpJLc8qCR_boCCwgmak",
  authDomain: "rpm-market-6b9a7.firebaseapp.com",
  projectId: "rpm-market-6b9a7",
  storageBucket: "rpm-market-6b9a7.firebasestorage.app",
  messagingSenderId: "997846325625",
  appId: "1:997846325625:web:b912869f43c71858af77a8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
