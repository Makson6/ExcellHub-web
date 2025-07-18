import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";
import { TextInput } from "../../components/Inputs";
import { useState } from "react";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const tosatId = toast.loading(
      "Un email contenant l'OTP est en cours d'envoi..."
    );
    try {
      setIsLoading(true);
      const credentials = {
        email: formData.mail,
      };

      const res = await api.post("/api/auth/forgot-password", credentials);

      // toast.remove("");
      console.log(res.data.message);

      if (res.status === 200) {
        // toast.success(res.data.message);
        toast.success("OTP envoyé, vérifie ta boîte mail.", { id: tosatId });
        navigate("/verify-otp-password", {
          state: { email: formData.mail },
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error(error.response?.data?.message || "Erreur de connexion", {
        id: tosatId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" mt-40 flex items-center dark:text-light justify-center">
      <div className="relative dark:bg-dark-bg p-8 rounded-lg w-full max-w-md shadow-2xl shadow-gray-950">
        <Link to="/">
          <span
            className="absolute cursor-pointer hover:font-semibold text-2xl right-4 top-2 text-white"
            style={{ textShadow: "2px 0px 3px rgba(255, 255, 255, 0.6)" }}
          >
            x
          </span>
        </Link>

        <h2 className="text-2xl font-semibold mb-3 text-center">
          ForgotPassword
        </h2>

        <form className="grid" onSubmit={handleSubmit(onSubmit)}>
          <span className="mb-3"> Email:</span>
          <TextInput
            register={register}
            type="email"
            name="mail"
            placeholder="Adresse électronique"
            errors={errors}
            rules={{
              required: "L'adresse e-mail est requise",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Adresse e-mail invalide",
              },
            }}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <p className="flex items-center justify-center gap-2 bg-[var(--light-zinc)] dark:bg-[var(--dark-green)] rounded-md cursor-none w-full py-2 px-8">
                {" "}
                En cours d'envoi...
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2 bg-[var(--light-zinc)] hover:bg-[var(--light-hover-button)] hover:dark:bg-secondary/60 dark:bg-secondary/40 rounded-md cursor-pointer w-full py-2 px-8">
                {" "}
                Envoyer Mon Email
              </p>
            )}
          </button>
        </form>

        <div className="mt-6 text-center  text-sm">
          As-tu deja un compte ?{" "}
          <Link to="/login" className="hover:text-accent hover:underline ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
