import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../../api/Axios";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      chapters: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters",
  });

  // Récupération du cours depuis l’API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/courses/${courseId}`);
        const course = res.data?.course;

        if (!course) {
          alert("Cours introuvable.");
          return navigate("/teacher-dashboard");
        }

        // Reset avec les données du cours
        reset({
          title: course.title,
          description: course.description,
          chapters: course.lessons.map((lesson) => ({
            title: lesson.title,
            playbackId:
              lesson.video?.muxPlaybackId || lesson.video?.playbackId || "",
          })),
        });
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement du cours.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/courses/${courseId}`, data);
      alert("✅ Modifications enregistrées !");
      navigate("/teacher-dashboard");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’enregistrement.");
    }
  };

  if (loading)
    return <p className="p-6 text-gray-500">Chargement en cours...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-neutral-900 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        ✏️ Modifier le cours
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Titre du cours</label>
          <input
            {...register("title", { required: true })}
            className="w-full border rounded px-3 py-2 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border rounded px-3 py-2 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Chapitres</h2>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded mb-4 bg-gray-50 dark:bg-neutral-800"
            >
              <div>
                <label className="block font-medium">Titre du chapitre</label>
                <input
                  {...register(`chapters.${index}.title`, { required: true })}
                  className="w-full border px-3 py-2 rounded dark:bg-neutral-700 dark:text-white"
                />
              </div>
              <div className="mt-2">
                <label className="block font-medium">Playback ID (MUX)</label>
                <input
                  {...register(`chapters.${index}.playbackId`, {
                    required: true,
                  })}
                  className="w-full border px-3 py-2 rounded dark:bg-neutral-700 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm mt-3"
              >
                ❌ Supprimer ce chapitre
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ title: "", playbackId: "" })}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ➕ Ajouter un chapitre
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          ✅ Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
