import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const quizList = [
  {
    id: "excel-part1",
    title: "QCM Excel - Partie 1",
    questions: [
      {
        question:
          "Quelle est la formule pour additionner des nombres dans Excel ?",
        options: ["=SUM()", "=ADD()", "=TOTAL()", "=CALC()"],
        answer: 0,
      },
      {
        question: "Comment figer une ligne ou colonne ?",
        options: [
          "Affichage > Figer les volets",
          "Affichage > Ancrer ligne",
          "Format > Verrouiller ligne",
          "Aucun des choix",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "gp-intro",
    title: "QCM Gestion de Projet - Introduction",
    questions: [
      {
        question: "Quelle est la première phase de la gestion de projet ?",
        options: ["Exécution", "Clôture", "Planification", "Initialisation"],
        answer: 3,
      },
      {
        question: "Qu'est-ce qu'un livrable de projet ?",
        options: [
          "Une réunion",
          "Un produit final du projet",
          "Une idée de réunion",
          "Aucun des choix",
        ],
        answer: 1,
      },
    ],
  },
];

const QuizPage = () => {
  const { quizId } = useParams();

  // Liste des quiz
  if (!quizId) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">Liste des Quiz</h1>
          <div className="mt-6 space-y-4">
            {quizList.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold">{quiz.title}</h2>
                <Link
                  to={`/quiz/${quiz.id}`}
                  className="mt-2 inline-block text-blue-600 hover:underline"
                >
                  Commencer le quiz →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Page détaillée du quiz
  const quiz = quizList.find((q) => q.id === quizId);
  if (!quiz) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold">Quiz introuvable</h1>
        <Link to="/quiz" className="mt-4 text-blue-600 hover:underline">
          Retour à la liste des quiz
        </Link>
      </div>
    );
  }

  const [userAnswers, setUserAnswers] = useState(
    Array(quiz.questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex, optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };
  const resetQuiz = () => {
    setUserAnswers(Array(quiz.questions.length).fill(null));
    setSubmitted(false);
  };
  const score = userAnswers.filter(
    (ans, index) => ans === quiz.questions[index].answer
  ).length;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <div className="mt-6 space-y-4">
          {quiz.questions.map((q, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow space-y-2 ${
                submitted
                  ? userAnswers[index] === q.answer
                    ? "border-2 border-green-500"
                    : "border-2 border-red-500"
                  : ""
              }`}
            >
              <h2 className="font-bold">
                {index + 1}. {q.question}
              </h2>
              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => !submitted && handleAnswer(index, i)}
                    className={`rounded p-2 cursor-pointer ${
                      userAnswers[index] === i
                        ? "bg-blue-100 dark:bg-blue-700"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              {submitted && (
                <p
                  className={`mt-2 font-semibold ${
                    userAnswers[index] === q.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {userAnswers[index] === q.answer
                    ? "Bonne réponse !"
                    : `Réponse correcte : ${q.options[q.answer]}`}
                </p>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-bold"
            disabled={userAnswers.includes(null)}
          >
            Soumettre le quiz
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-xl font-bold">
              Score : {score} / {quiz.questions.length}
            </p>
            <div className="flex gap-4">
              <button
                onClick={resetQuiz}
                className="bg-gray-300 hover:bg-gray-400 rounded-lg px-4 py-2 font-bold text-gray-800"
              >
                Refaire le quiz
              </button>
              <Link
                to="/quiz"
                className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 font-bold text-white"
              >
                Retour à la liste des quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
