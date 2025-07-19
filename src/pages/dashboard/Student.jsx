import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import api from "../../api/Axios";
import { useAuthStore } from "../../store/useAuthStore";
import UserNotConnected from "../../components/security/UserNotConnected";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [statusAccount, setStatusAccount] = useState(false);
  const { user } = useAuthStore();

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
              progress: progressRes.data.progress, // nombre entre 0 et 100
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
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user?.statusAccount === "VERIFIED") {
      setStatusAccount(true);
    }
  }, [user]);
  const quizzes = [
    { title: "QCM Excel - Partie 1", link: "/quiz/excel-part1" },
    {
      title: "QCM Gestion de Projet - Introduction",
      link: "/quiz/gp-intro",
      // link: "/quizzes/gp-intro",
    },
  ];
  const certificates = [
    { title: "Certificat Excel Débutant", date: "12 juin 2025", link: "#" },
  ];

  if (user === null) return <UserNotConnected />;

  const verifyMe = async () => {
    const toastId = toast.loading("loading...");
    try {
      await api.post("/api/auth/verify-user-email");
      toast.success("a verification mail will be send on your email adress!", {
        id: toastId,
      });
    } catch (error) {
      console.log("eereur de verification du mail:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      toast.remove("");
    }
  };
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          {/* Header user */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div
              className="flex flex-col  w-full  md:flex-row items-center gap-4 cursor-pointer"
              onClick={() => navigate("/dashboard/profile")}
            >
              {user?.avatar ? (
                <img
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500"
                  src={user?.avatar}
                  alt="Avatar"
                />
              ) : (
                <span className="flex items-center justify-center overflow-hidden w-20 h-20 rounded-full object-cover ring-2 ring-blue-500">
                  <span className="text-6xl text-center">{"🤵🏿"}</span>
                </span>
              )}
              <div>
                <h1 className="text-2xl text-center font-bold">
                  {user?.fullName || "Eleve"}
                </h1>
                <p className="text-gray-500 text-center">{user?.email}</p>
              </div>
            </div>
            <span
              onClick={verifyMe}
              className="text-red-600 animate-bounce cursor-pointer hover:scale-110 flex ml-9 "
            >
              {statusAccount ? <p>'</p> : <p>verify my account</p>}
            </span>
          </div>
          <div className="comptes grid grid-cols-2 mt-3 sm:flex flex-row gap-9 justify-center items-center">
            {[
              { to: "/dashboard/student", label: "  👨🏻‍🎓 Mon compte Eleve" },
              { to: "/dashboard/teacher", label: "  👨🏿‍🏫 Mon compte professeur" },
              {
                to: "/dashboard/admin",
                label: "     👤 Mon compte Aministrateur",
              },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-600/20  text-center text-white overflow-hidden  p-1 w-full rounded cursor-not-allowed"
                    : "bg-orange-600 text-white text-center w-full transition duration-300 p-1 cursor-pointer  md:hover:scale-105 rounded hover:bg-green-700"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <p className="mt-8 text-gray-600 dark:text-gray-300">
            Bienvenue ! Consultez vos cours en cours, vos progrès ainsi que vos
            certificats obtenus.
          </p>
        </div>

        {/*Mes cours */}
        <section>
          <h2 className="text-2xl font-semibold">Mes cours</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enrollments.length > 0 ? (
              enrollments.map((enroll, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
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

        {/* Quiz à passer */}
        <section>
          <h2 className="text-2xl font-semibold">
            <span className="text-3xl">🗒️</span>
            {""}Quiz à passer
          </h2>
          <div className="mt-4 space-y-3">
            {quizzes.length < 0 ? (
              quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow hover:shadow-lg"
                >
                  <h3 className="font-bold">{quiz.title}</h3>
                  <Link
                    to={quiz.link}
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

        {/* Certificats obtenus */}
        <section>
          <h2 className="text-2xl font-semibold">
            <span className="text-4xl">🎓</span> {""}Certificats obtenus
          </h2>
          <div className="mt-4 space-y-3">
            {certificates.length < 0 ? (
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
