import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/Axios";

const GoogleLoginButton = () => {
  const { vraiUser } = useAuthStore();
  const navigate = useNavigate();
  const pathName = useLocation().state;
  const [Loading, setLoading] = useState(false);

  const checkDirection = () => {
    switch (pathName) {
      case true:
        navigate("/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await api.post("/api/auth/google", {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        firebaseUid: user.uid,
      });

      const { accessToken, cookieToken } = res.data.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("cookieToken", cookieToken);
        toast.success("Connexion avec Google réussie");

        const fetchedUser = await vraiUser();
        if (fetchedUser) {
          checkDirection();
          window.location.reload();
        } else {
          toast.error("Erreur chargement utilisateur");
        }
      } else {
        toast.error("Réponse invalide du serveur");
      }
    } catch (error) {
      console.error("Erreur Google login :", error);
      toast.error("Échec de la connexion Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md font-semibold transition duration-300
              ${
                Loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : " bg-white  border  dark:boader-0 cursor-pointer dark:bg-secondary/70 hover:bg-secondary/80 text-black/40"
              }
            `}
    >
      <FcGoogle size={20} />
      <span className=" dark:text-white ">Continuer avec Google</span>
    </button>
  );
};

export default GoogleLoginButton;
