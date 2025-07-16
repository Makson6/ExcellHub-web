// @ts-nocheck
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoaderIcon, toast } from "react-hot-toast";
import ApiHistory from "../api/ApiHistory";

import {
  TextInput,
  PasswordInput,
  PhoneNumberInput,
  DateInput,
} from "../components/Inputs";

export default function Register() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //envoyer le data au backend
      await ApiHistory.register(data);
      toast.success("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-screen">
      {/* <div className="flex flex-col items-center justify-center px-4 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#1e1e2f] dark:to-dark-bg"> */}
      <div className="relative bg-white dark:bg-midnight w-full max-w-lg mb-30 p-8 rounded-sm shadow-xl shadow-gray-700/80 transition-all duration-500 ease-in-out">
        <Link to="/login">
          <span
            className="absolute cursor-pointer hover:font-semibold text-2xl right-4 top-3 text-white"
            style={{ textShadow: "2px 0px 3px rgba(255, 255, 255, 0.6)" }}
          >
            x
          </span>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            Excell<span className="text-black dark:text-white">Hub</span>
          </Link>{" "}
          <h1 className="text-black text-xl dark:text-light py-2">Register</h1>
        </div>
        <form
          className="space-y-5 boader text-black dark:text-white/85"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            register={register}
            name="fullName"
            placeholder="ex: David CHOKOLA MAKELELE"
            className="text-light"
            errors={errors}
            rules={{
              required: "Le nom est requis",
              minLength: { value: 3, message: "Minimum 3 caractères" },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ '-]*$/, // commence par une lettre
                message:
                  "Ce champ ne doit pas commencer par un caractère spécial!",
              },
            }}
          />

          <TextInput
            register={register}
            type="email"
            name="email"
            placeholder="ex: emailexemple@gmail.com"
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
            placeholder="Mot de passe"
            errors={errors}
            rules={{
              required: "Mot de passe requis",
              minLength: { value: 6, message: "Minimum 6 caractères" },
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
              }
            `}
          >
            {Loading && (
              <LoaderIcon className="animate-spin h-5 w-5 text-white" />
            )}
            <span className="dark:text-white">
              {Loading ? "création en cours..." : "Créer Mon Compte"}
            </span>
          </button>
        </form>

        <div className="flex justify-end bottom-0 mt-4">
          <div className="mt-6 text-center dark:text-light text-sm">
            Avez-vous déjà un compte Excellhub ?{" "}
            <Link
              to="/login"
              className="text-accent dark:text-accent hover:underline"
            >
              Aller à mon compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
