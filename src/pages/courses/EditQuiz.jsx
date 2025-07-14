import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";

const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/api/quizzes/${quizId}`);
        const { title, questions, lessonId } = res.data;

        const formattedQuestions = questions.map((q) => ({
          text: q.text,
          options: q.options.map((opt, index) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
          explanation: q.explanation || "",
        }));

        reset({ title, questions: formattedQuestions });
        setSelectedLessonId(lessonId || "");
      } catch (err) {
        console.error(err);
        toast.error("Impossible de charger le quiz.");
      }
    };

    const fetchLessons = async () => {
      try {
        const res = await api.get("/api/lessons");
        setLessons(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors du chargement des leçons.");
      }
    };

    fetchQuiz();
    fetchLessons();
  }, [quizId, reset]);

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      questions: data.questions,
      lessonId: selectedLessonId || null,
    };

    try {
      await api.put(`/api/quizzes/${quizId}`, payload);
      toast.success("Quiz modifié avec succès !");
      navigate("/admin/quizzes");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la modification du quiz.");
    }
  };

  const watchQuestions = watch("questions");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Modifier le Quiz</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-semibold">Titre du quiz *</label>
          <input
            {...register("title", { required: "Le titre est requis" })}
            className="border w-full p-2 rounded"
            placeholder="Ex: Quiz chapitre 1"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold">Associer à une leçon *</label>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="border w-full p-2 rounded"
          >
            <option value="">-- Choisir une leçon --</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>

        {fields.map((question, questionIndex) => (
          <div
            key={question.id || questionIndex}
            className="border p-4 rounded shadow-sm bg-gray-50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Question {questionIndex + 1}</h2>
              <button
                type="button"
                onClick={() => remove(questionIndex)}
                className="text-red-500 text-sm"
              >
                Supprimer
              </button>
            </div>

            <input
              {...register(`questions.${questionIndex}.text`, {
                required: "La question est requise",
              })}
              className="border w-full p-2 rounded"
              placeholder="Texte de la question"
            />

            <div className="space-y-2">
              {[0, 1, 2, 3].map((optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    {...register(
                      `questions.${questionIndex}.options.${optIndex}.text`,
                      { required: true }
                    )}
                    className="border w-full p-2 rounded"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      {...register(
                        `questions.${questionIndex}.options.${optIndex}.isCorrect`
                      )}
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>

            <input
              {...register(`questions.${questionIndex}.explanation`)}
              className="border w-full p-2 rounded"
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
          className="bg-gray-200 px-4 py-2 rounded"
        >
          ➕ Ajouter une question
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Mettre à jour le quiz
        </button>
      </form>

      {/* Preview */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Aperçu</h2>
        <h3 className="text-lg font-semibold mb-2">{watch("title")}</h3>
        {watchQuestions &&
          watchQuestions.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium">
                {i + 1}. {q.text}
              </p>
              <ul className="list-disc ml-6">
                {q.options.map((opt, j) => (
                  <li
                    key={j}
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
    </div>
  );
};

export default EditQuiz;
