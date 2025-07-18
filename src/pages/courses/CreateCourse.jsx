import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VideoRecorder from "../../components/VideoRecoder";
import api from "../../api/Axios";
import { uploadVideoToMux } from "../courses/Muxtest";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      categoryName: "",
      isFree: false,
      price: null,
      lessons: [{ title: "", content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  const isFree = watch("isFree");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreviews, setVideoPreviews] = useState({});
  const [videoDurations, setVideoDurations] = useState({});
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setIsLoading] = useState(false);

  const handleLessonVideoChange = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreviews((prev) => ({ ...prev, [index]: url }));

      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";
      tempVideo.src = url;
      tempVideo.onloadedmetadata = () => {
        const duration = tempVideo.duration;

        if (!isNaN(duration) && duration > 0) {
          setVideoDurations((prev) => ({
            ...prev,
            [index]: duration,
          }));
        } else {
          console.warn(
            `⛔ Impossible de lire la durée de la vidéo à l'index ${index}`
          );
        }

        URL.revokeObjectURL(tempVideo.src);
      };
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setProgress(10);
      setStatusMessage("📤 Téléversement des vidéos...");

      const { title, description, categoryName, isFree, price, lessons } = data;

      const formData = new FormData(); // Crée formData AVANT la boucle

      const lessonsWithMux = [];
      let resourceFileIndex = 0; // index global des fichiers ressources dans formData

      for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];
        const videoFile = lesson.videoFile?.[0];

        if (!videoFile) {
          toast.error(`Fichier vidéo manquant pour la leçon "${lesson.title}"`);
          setIsLoading(false);
          return;
        }

        // Upload vidéo vers Mux
        const { videoId, muxUploadId } = await uploadVideoToMux(videoFile);
        const duration = videoDurations[i] || null;

        // Garde trace des indexes des ressources associées à cette leçon
        const currentResourceIndexes = [];

        if (lesson.resources?.length) {
          for (let j = 0; j < lesson.resources.length; j++) {
            formData.append("resourcesFiles", lesson.resources[j]); // ajoute fichier dans formData
            currentResourceIndexes.push(resourceFileIndex);
            resourceFileIndex++;
          }
        }

        lessonsWithMux.push({
          title: lesson.title,
          content: lesson.content,
          videoId,
          muxUploadId,
          duration,
          resourcesIndexes: currentResourceIndexes,
        });

        setProgress(10 + ((i + 1) / lessons.length) * 40);
      }

      setStatusMessage("📦 Préparation des données...");

      // Ajoute le JSON des autres données du cours
      formData.append(
        "data",
        JSON.stringify({
          title,
          description,
          categoryName,
          isFree,
          price: isFree ? null : parseFloat(price),
          lessons: lessonsWithMux,
        })
      );

      // Ajoute la miniature si fournie
      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      setProgress(80);
      setStatusMessage("📡 Envoi à l'API...");

      await api.post("/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProgress(100);
      setStatusMessage("✅ Cours créé avec succès !");
      toast.success("✅ Cours créé avec succès !");
      setIsLoading(false);
      navigate("/teacher-dashboard");
    } catch (error) {
      console.error("❌ [AXIOS ERROR]", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Une erreur est survenue lors de la création du cours"
      );
      setProgress(0);
      setStatusMessage("Erreur lors de la création du cours.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10 bg-white dark:bg-midnight dark:text-light rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center mb-16">
        Créer un nouveau cours
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-medium">Titre du cours</label>
          <input
            {...register("title", { required: "Le titre est requis" })}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : Formation Excel Avancée"
            type="text"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "La description est requise",
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="Une description détaillant le contenu du cours..."
          />
        </div>

        <div>
          <label className="block font-medium">
            Catégorie (niveau) du cours
          </label>
          <select
            {...register("categoryName")}
            className="w-full border cursor-pointer rounded px-3 py-2"
            defaultValue="NORMAL"
          >
            <option value="">-- Choisir Une Catégorie --</option>
            <option value="BEGINNER">Débutant</option>
            <option value="NORMAL">Normal</option>
            <option value="ADVANCED">Avancé</option>
          </select>
        </div>

        <div className="flex">
          <label className="block font-medium">Cours gratuit ?</label>
          <div className=" ml-8">
            <input
              className=" cursor-pointer"
              type="checkbox"
              {...register("isFree")}
            />
          </div>
        </div>

        {!isFree && (
          <div>
            <label className="block font-medium">Prix du cours ($)</label>
            <input
              {...register("price", {
                required: "Le prix est requis pour un cours payant",
                valueAsNumber: true,
              })}
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Ex : 19.95"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="block font-medium">Miniature du cours</label>
          <input
            {...register("thumbnail", { required: "La miniature est requise" })}
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setThumbnailPreview(URL.createObjectURL(file));
              }
            }}
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Prévisualisation"
              className="mt-2 rounded max-w-[300px]"
            />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold">Leçons</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded p-4 mt-4 space-y-3">
              <div>
                <label className="block font-medium">Titre de la leçon</label>
                <input
                  {...register(`lessons.${index}.title`, {
                    required: "Le titre de la leçon est requis",
                  })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Ex: Introduction à Excel"
                />
              </div>
              <div>
                <label className="block font-medium">Contenu de la leçon</label>
                <textarea
                  {...register(`lessons.${index}.content`)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Contenu détaillé du chapittre..."
                />
              </div>
              <div>
                <label className="block font-medium">Vidéo de la leçon</label>
                <input
                  {...register(`lessons.${index}.videoFile`)}
                  className="w-full border rounded px-3 py-2"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleLessonVideoChange(index, e)}
                />
                {videoPreviews[index] && (
                  <>
                    <video
                      controls
                      src={videoPreviews[index]}
                      className="mt-2 rounded w-full max-w-[500px]"
                    />
                    {videoDurations[index] && (
                      <p className="text-sm text-gray-600">
                        ⏱️ Durée estimée :{" "}
                        {Math.round(videoDurations[index] / 60)} min
                      </p>
                    )}
                  </>
                )}
              </div>
              <div>
                <label className="block font-medium">
                  Ressources supplémentaires
                </label>
                <input
                  {...register(`lessons.${index}.resources`)}
                  className="w-full border rounded px-3 py-2"
                  type="file"
                  multiple
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm mt-2"
              >
                🗑️ Supprimer cette leçon
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ title: "", content: "" })}
            className="mt-3 px-4 py-2 cursor-pointer bg-blue-600/60 text-white rounded hover:bg-blue-700"
          >
            ➕ Ajouter une leçon
          </button>
        </div>

        {/* <VideoRecorder onRecordingComplete={() => {}} /> */}
        {progress > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-700">{statusMessage}</p>
            <div className="w-full bg-gray-200 rounded h-3 mt-1">
              <div
                className="bg-green-600 h-3 rounded"
                style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
              />
            </div>
          </div>
        )}

        <div>
          <button
            disabled={loading}
            type="submit"
            className={`w-full text-white px-6 py-3 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600/60 cursor-pointer hover:bg-green-700"
            }`}
          >
            {loading ? "⏳ Création en cours..." : "✅ Créer le cours"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
