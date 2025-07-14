import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PasswordInput, TextInput } from "../components/Inputs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import ApiHistory from "../api/ApiHistory";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { Loader2 } from "lucide-react"; // icône de chargement (optionnelle)

export default function Login() {
  const { vraiUser } = useAuthStore();
  const navigate = useNavigate();
  const pathName = useLocation().state;
  const [Loading, setLoading] = useState(false);

  const checkDirection = () => {
    switch (pathName) {
      case "/dashboard":
        return navigate("/dashboard");
      default:
        return navigate("/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const credentials = {
        email: formData.mail,
        password: formData.password,
      };

      const res = await ApiHistory.login(credentials);
      const { accessToken, cookieToken } = res.data || {};

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("cookieToken", cookieToken);
        toast.success("Connexion réussie !");
        const fetchedUser = await vraiUser();

        if (fetchedUser) {
          checkDirection();
        } else {
          toast.error("Erreur lors du chargement des données utilisateur");
        }
      } else {
        toast.error("Réponse invalide du serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error(error.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-screen">
      {/* <div className="flex flex-col items-center justify-center px-4 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#1e1e2f] dark:to-dark-bg"> */}
      <div className="relative bg-white dark:bg-midnight w-full max-w-lg mb-30 p-8 rounded-sm shadow-xl shadow-gray-700/80 transition-all duration-500 ease-in-out">
        <Link
          to="/"
          className="absolute right-4 top-3 text-light text-2xl font-bold hover:scale-125"
        >
          ×
        </Link>

        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            Excell<span className="text-black dark:text-white">Hub</span>
          </Link>{" "}
          <h1 className="text-black text-xl py-2 dark:text-light">Login</h1>
        </div>

        <form
          className="space-y-5 boader text-black dark:text-white/85"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            register={register}
            type="email"
            name="mail"
            className="text-light"
            placeholder="ex: user@mail.com"
            autoComplete="email"
            errors={errors}
            rules={{
              required: "L'adresse e-mail est requise",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Adresse e-mail invalide",
              },
            }}
          />

          <PasswordInput
            register={register}
            name="password"
            autoComplete="current-password"
            placeholder="Entrez votre mot de passe"
            errors={errors}
            rules={{
              required: "Mot de passe requis",
              minLength: {
                value: 6,
                message: "Minimum 6 caractères",
              },
            }}
          />

          <button
            type="submit"
            disabled={Loading}
            className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md font-semibold transition duration-300
              ${
                Loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : " bg-secondary/70  border   cursor-pointer dark:bg-secondary/70 hover:bg-secondary/90 text-black/40"
                // : " bg-white  border   cursor-pointer dark:bg-secondary/70 hover:bg-secondary/80 text-black/40"
              }
            `}
          >
            {Loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
            <span className="dark:text-white">
              {Loading ? "Connexion en cours..." : "Se connecter"}
            </span>
          </button>
        </form>

        <div className="flex justify-center my-4">
          <GoogleLoginButton />
        </div>

        <div className="flex justify-end text-sm mt-2">
          <p
            onClick={() => navigate("/forgot-password")}
            className="hover:underline text-blue-500 cursor-pointer"
          >
            Mot de passe oublié ?
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="hover:underline text-secondary font-medium"
          >
            Créer mon compte
          </Link>
        </div>
      </div>
    </div>
  );
}
