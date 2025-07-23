import React, { useState, useEffect } from "react";
import api from "../../api/Axios";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const LessonQuizPage = () => {
  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // Par défaut 15 minutes
  const [intervalId, setIntervalId] = useState(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Chargement du quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/api/quizzes/lesson/${lessonId}`);
        const fetchedQuiz = res?.data?.quizzes?.[0];
        if (fetchedQuiz) {
          setQuiz(fetchedQuiz);
          if (fetchedQuiz.duration) setTimeLeft(fetchedQuiz.duration * 60); // en secondes
        }
      } catch (err) {
        console.error("Erreur de chargement :", err);
        toast.error("Erreur lors du chargement du quiz.");
      }
    };

    if (lessonId) fetchQuiz();
  }, [lessonId]);

  // Timer
  useEffect(() => {
    if (!quiz || submitted) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, [quiz, submitted]);

  // Affichage des indices après 10s
  useEffect(() => {
    const timer = setTimeout(() => setShowHints(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Protection anti-sortie
  useEffect(() => {
    if (submitted) return;

    const handleEscapeAttempt = () => {
      const now = Date.now();

      // Ignore les événements trop rapprochés ou erronés
      if (now - lastInteraction < 1000) return;

      setLastInteraction(now);
      setEscapeCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 1) {
          toast(
            "⚠️ Attention : Si vous quittez à nouveau, le quiz sera soumis."
          );
        } else if (newCount >= 2) {
          toast.error("Quiz soumis automatiquement suite à une 2ᵉ sortie.");
          handleSubmit();
        }
        return newCount;
      });
    };

    const onVisibilityChange = () => {
      if (document.hidden) handleEscapeAttempt();
    };

    const onMouseLeave = (e) => {
      if (!e.relatedTarget && e.clientY <= 0) handleEscapeAttempt();
    };

    window.addEventListener("blur", handleEscapeAttempt);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleEscapeAttempt);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [submitted, lastInteraction]);

  const handleChange = (questionId, option) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("soumission en cours...");
    try {
      if (!quiz || !quiz.questions) return;

      setSubmitted(true);
      clearInterval(intervalId);

      const correct = quiz.questions.reduce((acc, q) => {
        return answers[q.id] === q.options[q.answer] ? acc + 1 : acc;
      }, 0);

      const calculatedScore = ((correct / quiz.questions.length) * 10).toFixed(
        1
      );
      setScore(calculatedScore);

      const quizId = quiz.id;

      await api.post("/api/quizzes/postResult", {
        quizId: quizId,
        score: calculatedScore,
      });
      //marquer comme done une fois soummis
      // await api.post(`/lesson-progress/${lessonId}/complete`);
      toast.success("Quiz soumis avec succes!", { id: toastId });
    } catch (err) {
      console.error("Erreur de soumission du quiz :", err);
      toast.error(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la soumission.",
        {
          id: toastId,
        }
      );
    } finally {
      toast.remove("");
    }
  };

  const formatTime = (sec) => {
    const min = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${min}:${s}`;
  };

  if (!quiz) return <p className="text-center mt-8">Chargement du quiz...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          {!submitted && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded font-mono text-lg shadow">
              ⏱️ {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {escapeCount > 0 && !submitted && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
            ⚠️ Attention : une autre sortie déclenchera la soumission
            automatique.
          </div>
        )}

        <div className="space-y-6">
          {quiz.questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const correctAnswer = q.options[q.answer];
            const isCorrect = submitted && userAnswer === correctAnswer;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow border-2 transition ${
                  submitted
                    ? isCorrect
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-transparent"
                }`}
              >
                <p className="font-semibold text-lg mb-2">
                  {idx + 1}. {q.text}
                </p>

                <div className="space-y-2 ml-4">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded cursor-pointer transition ${
                        userAnswer === opt
                          ? "bg-blue-100 dark:bg-blue-700"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => handleChange(q.id, opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                {submitted && (
                  <div className="mt-3 text-sm">
                    {isCorrect ? (
                      <p className="text-green-600 font-medium">
                        ✅ Bonne réponse
                      </p>
                    ) : (
                      <>
                        <p className="text-red-600 font-medium">
                          ❌ Mauvaise réponse
                        </p>
                        <p className="text-gray-800">
                          ✅ Bonne réponse : <strong>{correctAnswer}</strong>
                        </p>
                        {q.explanation && showHints && (
                          <p className="text-gray-500 italic mt-1">
                            💡 {q.explanation}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              // disabled={quiz.questions.some((q) => !answers[q.id])}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow disabled:opacity-50"
            >
              Soumettre mes réponses
            </button>
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-xl font-semibold">
              🎯 Score obtenu :{" "}
              <span className="text-blue-600">{score}/10</span>
            </p>
            <Link
              to="/dashboard/student"
              className="inline-block mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Retour aux quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonQuizPage;
