import React from "react";
import { toast } from "react-hot-toast";
import ApiHistory from "../../api/ApiHistory";
import { TextInput } from "../Inputs";
import { useForm } from "react-hook-form";

const DeleteUserModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { mail } = data;
    console.log(mail);

    try {
      await ApiHistory.adminDel({ email: mail });

      toast.success("Utilisateur supprimé avec succès");
      reset();
      onClose();
    } catch (err) {
      console.error("Erreur Suppression User:", err);
      toast.error(
        err?.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  };

  return (
    <div className="fixed bg-sky-200/50 h-3/3 inset-0 flex  justify-center items-center  ">
      <div className="absolute  bg-white dark:bg-midnight my-9 rounded-md p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl text-center font-bold">
          🗑️ Email de l'utilisateur
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded p-2"
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteUserModal;
