import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ApiHistory from "../../api/ApiHistory";
import { TextInput } from "../Inputs";
import { useForm } from "react-hook-form";

const DeleteUserModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { mail } = data;
    try {
      setLoading(true);

      await ApiHistory.adminDel({ email: mail });

      toast.success("Utilisateur supprimé avec succès");
      reset();
      onClose();
    } catch (err) {
      console.error("Erreur Suppression User:", err);
      toast.error(
        err?.response?.data?.message || "Erreur lors de la suppression"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bg-sky-200/50 h-3/3 inset-0 flex  justify-center items-center  ">
      <div className="absolute  bg-white dark:bg-midnight my-9 rounded-md p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl text-center font-bold">
          🗑️ supprimer un utilisateur
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register("reason", {
              required: "La raison de la suppression est requise",
              minLength: {
                value: 5,
                message: "La raison doit contenir au moins 5 caractères",
              },
            })}
            placeholder="Raison de la suppression"
            className="w-full h-28 border p-2 rounded resize-none"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm">{errors?.reason?.message}</p>
          )}
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

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 dark:hover:bg-dark-bg dark:bg-dark-bg/60 cursor-pointer rounded p-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded p-2"
            >
              {loading ? "Suppression..." : "Confirmer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteUserModal;
