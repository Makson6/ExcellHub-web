import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import api from "../../api/Axios";
import { useAuthStore } from "../../store/useAuthStore";
import UserNotConnected from "../../components/security/UserNotConnected";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [enrollments, setEnrollments] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [qui, setQui] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  const [statusAccount, setStatusAccount] = useState(false);

  // Quizzes à faire
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const completedRes = await api.get("/api/lesson-progress/completed");
        const completedLessonIds = completedRes.data.lessonIds;

        const res = await api.get("/api/quizzes/my-quizzes");
        const allQuizzes = res.data.uncompletedQuizzes;

        const filteredQuizzes = allQuizzes.filter((quiz) =>
          completedLessonIds.includes(quiz.lessonId)
        );

        setQui(filteredQuizzes);
      } catch (error) {
        console.error("Erreur lors du chargement des quizzes terminés", error);
      } finally {
        setLoadingQuizzes(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Cours avec progression
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/subscribe/me");
        const baseEnrollments = res.data.enrollments || [];

        const progressPromises = baseEnrollments.map(async (enroll) => {
          try {
            const progressRes = await api.get(
              `/api/subscribe/${enroll.courseId}/progress`
            );
            return {
              ...enroll,
              progress: progressRes.data.progress,
            };
          } catch (err) {
            console.warn(
              `Erreur progression pour le cours ${enroll.courseId}:`,
              err
            );
            return { ...enroll, progress: 0 };
          }
        });

        const enrichedEnrollments = await Promise.all(progressPromises);
        setEnrollments(enrichedEnrollments);
      } catch (err) {
        console.error("Erreur lors du fetch des cours :", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  // Status vérification
  useEffect(() => {
    if (user?.statusAccount === "VERIFIED") {
      setStatusAccount(true);
    }
  }, [user]);

  const verifyMe = async () => {
    const toastId = toast.loading("Envoi du mail de vérification...");
    try {
      await api.post("/api/auth/verify-user-email");
      toast.success("Un mail de vérification a été envoyé !", { id: toastId });
    } catch (error) {
      console.log("Erreur de vérification du mail:", error);
      toast.error(error.message, { id: toastId });
    }
  };

  if (user === null) return <UserNotConnected />;

  const certificates = [
    { title: "Certificat Excel Débutant", date: "12 juin 2025", link: "#" },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div
            className="flex flex-col w-full md:flex-row items-center gap-4 cursor-pointer"
            onClick={() => {
              if (user.statusAccount === "VERIFIED") {
                navigate("/dashboard/profile");
              }
            }}
          >
            {user?.avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500"
                src={user.avatar}
                alt="Avatar"
              />
            ) : (
              <span className="flex items-center justify-center w-20 h-20 rounded-full ring-2 ring-blue-500 bg-white">
                <span className="text-6xl">🤵🏿</span>
              </span>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.fullName || "Élève"}</h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          {!statusAccount && (
            <button
              onClick={verifyMe}
              className="text-red-600 animate-bounce hover:scale-110 transition"
            >
              Vérifier mon compte
            </button>
          )}
        </div>

        {/* Liens de compte */}
        {user.role !== "STUDENT" && (
          <div className="grid grid-cols-2 sm:flex gap-4 justify-center">
            {[
              ...(user.role === "TEACHER" || user.role === "ADMIN"
                ? [{ to: "/dashboard/student", label: "👨🏻‍🎓 Mon compte Élève" }]
                : []),
              ...(user.role === "TEACHER" || user.role === "ADMIN"
                ? [
                    {
                      to: "/dashboard/teacher",
                      label: "👨🏿‍🏫 Mon compte Professeur",
                    },
                  ]
                : []),
              ...(user.role === "ADMIN"
                ? [
                    {
                      to: "/dashboard/admin",
                      label: "👤 Mon compte Administrateur",
                    },
                  ]
                : []),
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-600/20 text-center text-white p-2 rounded"
                    : "bg-orange-600 text-white p-2 rounded hover:bg-green-700 transition"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Cours */}
        <section>
          <h2 className="text-2xl font-semibold">Mes cours</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loadingCourses ? (
              <p>Chargement des cours...</p>
            ) : enrollments.length > 0 ? (
              enrollments.map((enroll, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold">{enroll.course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                    {enroll.course.description}
                  </p>
                  <div className="h-2 rounded-full bg-gray-300 dark:bg-gray-700 mt-2">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${enroll.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Progression : {enroll.progress}%
                  </p>
                  <Link
                    to={`/courses/${enroll.courseId}/chapters`}
                    className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                  >
                    Accéder au cours →
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                Vous n’êtes inscrit à aucun cours pour le moment.
              </p>
            )}
          </div>
        </section>

        {/* Quizzes */}
        <section>
          <h2 className="text-2xl font-semibold">🗒️ Quiz à passer</h2>
          <div className="mt-4 space-y-3">
            {loadingQuizzes ? (
              <p>Chargement des quizzes...</p>
            ) : qui.length > 0 ? (
              qui.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow hover:shadow-lg"
                >
                  <h3 className="font-bold">{quiz.title}</h3>
                  <Link
                    to={`/lesson/${quiz.lessonId}/quiz`}
                    className="mt-1 inline-block text-blue-600 hover:underline"
                  >
                    Faire le quiz →
                  </Link>
                </div>
              ))
            ) : (
              <p>Aucun quiz à passer pour le moment.</p>
            )}
          </div>
        </section>

        {/* Certificats */}
        <section>
          <h2 className="text-2xl font-semibold">🎓 Certificats obtenus</h2>
          <div className="mt-4 space-y-3">
            {certificates.length > 0 ? (
              certificates.map((certif, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow hover:shadow-lg"
                >
                  <h3 className="font-bold">{certif.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Obtenu le : {certif.date}
                  </p>
                  <a
                    href={certif.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-blue-600 hover:underline"
                  >
                    Télécharger le certificat →
                  </a>
                </div>
              ))
            ) : (
              <p>Pas encore de certificats obtenus.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
