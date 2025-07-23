export const baseURL =
  import.meta.env.VITE_BACKEND_URL || "https://excellhub-api.onrender.com";

// configuration Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBszo0Lkb3aJXAlkIPCHRFLdNk_bX_C250",
  authDomain: "excell-is-hub.firebaseapp.com",
  projectId: "excell-is-hub",
  storageBucket: "excell-is-hub.firebasestorage.app",
  messagingSenderId: "910985373035",
  appId: "1:910985373035:web:20cfc05820b3961868982e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
