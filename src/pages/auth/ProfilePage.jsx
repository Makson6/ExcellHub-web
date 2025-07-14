// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore.js";
import api from "../../api/Axios.js";
import { toast } from "react-hot-toast";
import { PhoneNumberInput } from "../../components/Inputs.jsx";
import { CopyCheckIcon } from "lucide-react";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const [avatarPreview, setAvatarPreview] = useState(null);
  // const [avatarPreview, setAvatarPreview] = useState("");

  const handleCheck = async () => {
    const toastId = toast.loading("Vérification en cours...");
    try {
      await api.post("/api/auth/verify-user-email");
      toast.success("E-mail de vérification envoyé ✅", { id: toastId });
    } catch (error) {
      toast.error("Échec de l'envoi de l'e-mail ❌", error.message, {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
      setAvatarPreview(user.avatar || "");
    }
  }, [user, reset]);

  const avatarFile = watch("avatar");

  useEffect(() => {
    if (avatarFile?.length > 0) {
      const file = avatarFile[0];
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  const onSubmit = async (data) => {
    const { fullName, email, mobile } = data;
    const image = data.avatar?.[0];

    if (image) {
      try {
        const formData = new FormData();
        formData.append("avatar", image);

        const res = await api.put("/api/auth/update-avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const newAvatarUrl = res.data.avatarUrl;
        setUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
        setAvatarPreview(newAvatarUrl);
        toast.success("Photo de profil mise à jour !");
      } catch (err) {
        toast.error(
          // err.response?.data?.message ||
          "Erreur lors du téléchargement."
        );
        return;
      }
    }

    try {
      const res = await api.put("/api/auth/update-user", {
        fullName,
        email,
        mobile,
      });

      setUser((prev) => ({ ...prev, ...res.data.updatedFields }));
      toast.success("Profil mis à jour !");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur de mise à jour du profil."
      );
    }
  };

  console.log(user);

  const accountStatus = "VERIFIED";
  return (
    <div className="mt-20 max-w-2xl w-full mx-auto p-6 bg-white dark:bg-[var(--dark-primary)] dark:text-[var(--light-zinc)] rounded-lg shadow-lg">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
        Mon Profil
        {accountStatus && <CopyCheckIcon className="text-green-500 w-6 h-6" />}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-5"
      >
        {/* Avatar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">Photo de profil</label>
            {!accountStatus && (
              <button
                type="button"
                onClick={handleCheck}
                className="text-blue-500 text-sm hover:underline"
              >
                {user.statusAccount === "VERIFIED" ? (
                  <>Vérifier mon compte</>
                ) : (
                  ""
                )}
              </button>
            )}
          </div>

          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Aperçu Avatar"
              className="w-24 h-24 rounded-full object-cover mb-3 border"
            />
          )}

          <input
            type="file"
            accept="image/*"
            {...register("avatar")}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Nom complet */}
        <div>
          <label className="block text-sm font-medium">Nom complet</label>
          <input
            type="text"
            {...register("fullName", { required: "Champ requis" })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Adresse e-mail</label>
          <input
            type="email"
            {...register("email", { required: "Champ requis" })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium">Téléphone</label>
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <PhoneNumberInput field={field} error={errors.mobile?.message} />
            )}
          />
        </div>

        {/* Bouton */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-[var(--dark-green2)] dark:hover:bg-[var(--dark-green)] text-white font-medium py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Mise à jour..." : "Mettre à jour le profil"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
