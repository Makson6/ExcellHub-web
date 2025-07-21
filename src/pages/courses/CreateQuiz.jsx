import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";

const CreateQuiz = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // validation en temps réel
    defaultValues: {
      title: "",
      questions: [
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          explanation: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger les cours
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/courses");
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "Impossible de charger les cours.";
        toast.error(errorMessage);
      }
    };

    fetchCourses();
  }, []);

  // // Charger les leçons du cours sélectionné
  useEffect(() => {
    const fetchLessons = async () => {
      if (!selectedCourseId) {
        setLessons([]);
        return;
      }

      setLoadingLessons(true);

      try {
        const res = await api.get(`/api/courses/${selectedCourseId}/lessons`);
        const data = res.data;

        setLessons(Array.isArray(data) ? data : []);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || "Erreur de récupération des leçons";
        toast.error(errorMessage);
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchLessons();
  }, [selectedCourseId]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!selectedLessonId) {
      toast.error("Veuillez sélectionner une leçon.");
      return;
    }

    const formattedQuestions = data.questions.map((q) => {
      const answerIndex = q.options.findIndex((opt) => opt.isCorrect);
      if (answerIndex < 0) {
        throw new Error("Chaque question doit avoir une réponse correcte.");
      }
      return {
        text: q.text,
        options: q.options.map((opt) => opt.text),
        answer: answerIndex,
        explanation: q.explanation || null,
      };
    });

    const payload = {
      duration: data.duration,
      title: data.title,
      lessonId: selectedLessonId,
      questions: formattedQuestions,
    };

    try {
      await api.post("/api/quizzes", payload);
      toast.success("Quiz créé avec succès !");
      reset();
      setSelectedCourseId("");
      setSelectedLessonId("");
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Erreur lors de la création du quiz.");
      // toast.error("Erreur lors de la création du quiz.");
    } finally {
      setLoading(false);
    }
  };

  const watchQuestions = watch("questions");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Créer un Quiz</h1>

      {/* Sélecteurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cours */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Cours concerné *
          </label>
          <select
            className="w-full border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setSelectedLessonId("");
            }}
          >
            <option value="">-- Choisir un cours --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Leçon */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Leçon liée (facultatif)
          </label>
          <select
            className="w-full border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            disabled={!selectedCourseId || loadingLessons}
          >
            <option value="">-- Aucune --</option>
            {loadingLessons ? (
              <option disabled>Chargement...</option>
            ) : lessons.length === 0 ? (
              <option disabled>
                {selectedCourseId
                  ? "Aucune leçon disponible"
                  : "Sélectionnez un cours"}
              </option>
            ) : (
              lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
      {/* Formulaire */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Titre du quiz */}
        <div className=" grid grid-cols-2">
          <div className="">
            <label className="block mb-1 font-medium text-gray-700">
              Titre du quiz *
            </label>
            <input
              {...register("title", { required: "Le titre est requis" })}
              className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ex : Quiz chapitre 1"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Duree du quiz (min) *
            </label>
            <input
              {...register("duration", {
                required: "La duree du quiz est requise",
              })}
              className="w-1/4 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ex : 15"
              type="number"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>

        {/* Questions dynamiques */}
        {fields.map((q, qi) => (
          <div
            key={q.id}
            className="border border-gray-200 p-4 rounded bg-gray-50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Question {qi + 1}</h2>
              <button
                type="button"
                onClick={() => remove(qi)}
                className="text-red-500 hover:underline"
              >
                Supprimer
              </button>
            </div>

            <input
              {...register(`questions.${qi}.text`, {
                required: "Texte de la question requis",
              })}
              className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Texte de la question"
            />

            {/* Options */}
            <div className="space-y-2">
              {Array(4)
                .fill(0)
                .map((_, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input
                      type="text"
                      {...register(`questions.${qi}.options.${oi}.text`, {
                        required: "Option requise",
                      })}
                      className="flex-grow border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={`Option ${oi + 1}`}
                    />
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        {...register(`questions.${qi}.options.${oi}.isCorrect`)}
                      />
                      Correct
                    </label>
                  </div>
                ))}
            </div>

            <input
              {...register(`questions.${qi}.explanation`)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Explication (facultatif)"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              text: "",
              options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
              explanation: "",
            })
          }
          className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          ➕ Ajouter une question
        </button>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            type="submit"
            disabled={!selectedCourseId}
            className={`px-6 py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Enregistrer le quiz
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            {showPreview ? "Masquer" : "Prévisualiser"}
          </button>
        </div>
      </form>

      {/* Prévisualisation */}
      {showPreview && (
        <div className="mt-8 border-t pt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Aperçu du Quiz</h2>
          {watchQuestions.map((q, qi) => (
            <div key={qi} className="p-4 border rounded bg-gray-50">
              <p className="font-medium">
                {qi + 1}. {q.text}
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                {q.options.map((opt, oi) => (
                  <li
                    key={oi}
                    className={
                      opt.isCorrect ? "text-green-700 font-semibold" : ""
                    }
                  >
                    {opt.text} {opt.isCorrect && "✓"}
                  </li>
                ))}
              </ul>
              {q.explanation && (
                <p className="text-sm text-gray-500 mt-1">💡 {q.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
