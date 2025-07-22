import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTeacherStore } from "../../store/useTeacherStore";
import { motion } from "framer-motion";
import api from "../../api/Axios";
import UserNotTEACHER from "../../components/security/NotTEACHER";
import UserNotConnected from "../../components/security/UserNotConnected";
import { useAuthStore } from "../../store/useAuthStore";
import DeleteCourseModal from "../../components/modals/DeleteCourseModal";

import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const TeacherDashboard = () => {
  const teacherCourses = useTeacherStore((state) => state.courses);
  const [filter, setFilter] = useState("NORMAL");
  const navigate = useNavigate();
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Role, setRole] = useState(null);
  const [selectedCourseToDelete, setSelectedCourseToDelete] = useState(null);

  const { user } = useAuthStore();

  const filteredCourses = teacherCourses.filter((course) => {
    if (filter === "NORMAL") return true;
    return course.category === filter;
  });

  // Charger les cours
  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/api/courses/my-courses");

      useTeacherStore.setState({ courses: res.data.courses });
    } catch (err) {
      console.error("Erreur de chargement des cours :", err.status);
    }
  };

  // Mettre à jour loading quand user change
  useEffect(() => {
    if (user !== null) {
      setLoading(true);
    }
  }, [user]);

  // Récupérer l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setRole(res.data?.role);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };
    //chage les cours
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/api/courses/my-courses");
        useTeacherStore.setState({ courses: res.data.courses });
      } catch (err) {
        console.error("Erreur de chargement des cours :", err.status);
      }
    };
    setTimeout(() => {
      setLoading(false);
    }, 10000);
    fetchMyCourses();
    fetchUser();
  }, []);
  // Affichage pendant chargement
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader size={55} className="animate-spin mb-20 dark:text-light" />
      </div>
    );
  }

  // Affichage selon le rôle
  if (Role === undefined || Role === null) return <UserNotConnected />;
  if (Role === "STUDENT") return <UserNotTEACHER />;

  const handleDeleteCourse = async (courseId) => {
    setLoadingDelete(courseId);
    setErrorDelete(null);

    try {
      await api.delete(`/api/courses/${courseId}`);
      await fetchMyCourses();
      //     set({ user: null, isAuthenticated: false });
      //   }
      // },
      alert("Cours supprimé avec succès");
    } catch (err) {
      setErrorDelete(
        err.response?.data?.error || "Erreur lors de la suppression du cours"
      );
    } finally {
      setLoadingDelete(null);
    }
  };

  const categoryLabels = {
    NORMAL: "Tous",
    BEGINNER: "Débutant",
    ADVANCED: "Avancé",
  };
  const statusAccount = user?.statusAccount;

  const verifyMe = () => {
    const toastId = toast.loading("loading...");
    try {
      api.post("/api/auth/verify-user-email");
      if (toastId) {
        setTimeout(() => {
          toast.success(
            "a verification mail will be send on your email adress!",
            { id: toastId }
          );
        }, 4000);
      }
    } catch (error) {
      console.log("eereur de verification du mail:", error);
      toast.error("email error", { id: toastId });
    } finally {
      toast.remove("");
    }
  };
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto space-y-12">
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
              <h1 className="text-3xl font-bold text-center">
                {" "}
                {user?.fullName}
              </h1>
              <p className="text-gray-500 text-center">{user?.email}</p>
            </div>
          </div>
        </div>
        <div>
          {user?.role !== "STUDENT" && (
            <div className="comptes grid grid-cols-2 mt-3 sm:flex flex-row gap-9 justify-center items-center">
              {[
                ...(user?.role === "TEACHER" || user?.role === "ADMIN"
                  ? [
                      {
                        to: "/dashboard/student",
                        label: "👨🏻‍🎓 Mon compte Élève",
                      },
                    ]
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
                      ? "bg-gray-600/20 text-center text-white overflow-hidden p-1 w-full rounded cursor-not-allowed"
                      : "bg-orange-600 text-white text-center w-full transition duration-300 p-1 cursor-pointer md:hover:scale-105 rounded hover:bg-green-700"
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <div className=" flex items-center justify-center">
          <span
            onClick={verifyMe}
            className=" w-fit text-red-600 hover:animate-bounce cursor-pointer hover:text-red-700 animate-none "
          >
            {statusAccount === "VERIFIED" ? "" : <>Verify my account</>}
          </span>
        </div>
        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/create-course")}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition"
          >
            ➕ Créer un nouveau cours
          </button>

          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-semibold transition"
          >
            ➕ Créer un quiz
          </button>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full font-medium transition ${
                filter === key
                  ? "bg-blue-600  text-white"
                  : "bg-gray-200 cursor-pointer dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Liste des cours */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">📚 Vos cours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => {
                const chaptersCount = course.lessons?.length || 1;
                const pourcentage = Math.round(
                  (course.avgProgress / chaptersCount) * 100
                );

                return (
                  <motion.div
                    key={course.id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      👥 {course.totalStudents} élèves inscrits
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      📈 Avancement moyen : {course.avgProgress} /{" "}
                      {chaptersCount}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      🗒️ Quizes : {course.avgProgress} / {chaptersCount}
                    </p>
                    <div className="flex w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full mt-3">
                      <div
                        className="flex bg-green-500 h-2 rounded-full"
                        style={{ width: `${pourcentage}%` }}
                      />
                    </div>
                    <div className="mt-4 flex gap-4 text-sm font-medium">
                      <Link
                        to={`/courses/${course.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Voir le cours
                      </Link>
                      <Link
                        to={`/courses/${course.id}/edit`}
                        className="text-yellow-600 hover:underline"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => setSelectedCourseToDelete(course.id)}
                        className="text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>

                      {/* <button
                        disabled={loadingDelete === course.id}
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {loadingDelete === course.id
                          ? "Suppression..."
                          : "Supprimer"}
                      </button> */}
                    </div>
                    {errorDelete && loadingDelete === course.id && (
                      <p className="text-red-500 mt-2">{errorDelete}</p>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <p className="text-gray-500 dark:text-gray-300">
                Aucun cours à afficher.
              </p>
            )}
          </div>
        </div>
      </div>
      {selectedCourseToDelete && (
        <DeleteCourseModal
          courseId={selectedCourseToDelete}
          onClose={() => setSelectedCourseToDelete(null)}
          onSuccess={fetchMyCourses}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
