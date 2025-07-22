import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Papa from "papaparse";
import ContentPending from "../../components/ContentPending";
import PublishedCourses from "../../components/PublishedCourses";
import UserNotADMIN from "../../components/security/UserNotADMIN";
import api from "../../api/Axios";
import CreateTeacherModal from "../../components/modals/createTeacherModal";
import CreateAdminModal from "../../components/modals/CreateAdminModal";
import SuspendUserModal from "../../components/modals/SuspendUserModal";
import AddCourseModal from "../../components/modals/AddCourseModal";
import toast from "react-hot-toast";
import UserNotConnected from "../../components/security/UserNotConnected";
import DeleteUserModal from "../../components/modals/DeleteUserModal";
import { Loader } from "lucide-react";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [theUser, setTheUser] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    pendingReview: 0,
  });
  const [teachersData, setTeachersData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [registrationsData, setRegistrationsData] = useState([]);

  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [sortTeacher, setSortTeacher] = useState("name");
  const [sortStudent, setSortStudent] = useState("name");
  const [pageTeacher, setPageTeacher] = useState(1);
  const [pageStudent, setPageStudent] = useState(1);

  const [loading, setLoading] = useState(false);
  const [showCreateTeacherModal, setShowCreateTeacherModal] = useState(false);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showDellUserModal, setShowDellUserModal] = useState(false);

  const pageSize = 3;

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [
          meRes,
          statsRes,
          teachersRes,
          studentsRes,
          coursesRes,
          registrationsRes,
        ] = await Promise.all([
          api.get("/api/auth/me", config),
          api.get("/api/admin/stats", config),
          api.get("/api/admin/teachers", config),
          api.get("/api/admin/students", config),
          api.get("/api/admin/courses", config),
          api.get("/api/admin/registrations-stats", config),
        ]);

        setTheUser(meRes.data);
        setStats(statsRes.data);
        setTeachersData(teachersRes.data);
        setStudentsData(studentsRes.data);
        setCoursesData(coursesRes.data);
        setRegistrationsData(registrationsRes.data);
      } catch (err) {
        console.error("❌ Erreur admin dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader size={55} className="animate-spin mb-20 dark:text-light" />
      </div>
    );

  if (!theUser) return <UserNotADMIN />;
  const Role = theUser?.role;
  if (Role === undefined) return <UserNotConnected />;

  const filteredTeachers = teachersData.filter((t) =>
    t.name.toLowerCase().includes(searchTeacher.toLowerCase())
  );
  const filteredStudents = studentsData.filter((s) =>
    s.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const sortedTeachers = [...filteredTeachers].sort((a, b) =>
    sortTeacher === "name"
      ? a.name.localeCompare(b.name)
      : b.courses - a.courses
  );
  const sortedStudents = [...filteredStudents].sort((a, b) =>
    sortStudent === "name"
      ? a.name.localeCompare(b.name)
      : b.courses - a.courses
  );

  const paginatedTeachers = sortedTeachers.slice(
    (pageTeacher - 1) * pageSize,
    pageTeacher * pageSize
  );
  const paginatedStudents = sortedStudents.slice(
    (pageStudent - 1) * pageSize,
    pageStudent * pageSize
  );

  const exportData = (data, filename) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  const publishedCourses = (coursesData || []).filter(
    (c) => c.status === "PUBLISHED"
  );
  const pendingCourses = (coursesData || []).filter(
    (c) => c.status === "IN_CHECKING"
  );

  const statusAccount = user?.statusAccount;

  const verifyMe = async () => {
    const toastId = toast.loading("loading...");
    try {
      await api.post("/api/auth/verify-user-email");

      toast.success("verification email was sent on your adress!", {
        id: toastId,
      });
    } catch (error) {
      console.log("eereur de verification du mail:", error);
      toast.error("email error", { id: toastId });
    } finally {
      toast.remove("");
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header user */}
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between p-4 sm:p-6 mb-0 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div
            className="flex flex-col  w-full  md:flex-row items-center gap-4 cursor-pointer"
            onClick={() => navigate("/dashboard/profile")}
          >
            {theUser?.avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500"
                src={theUser?.avatar}
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
                {theUser?.fullName}
              </h1>
              <p className="text-gray-500 text-center">{theUser?.email}</p>
            </div>
          </div>
        </div>
        <div className="comptes grid grid-cols-1 sm:grid-cols-2 place-items-center place-center gap-3 md:flex  mt-3 md:gap-9 justify-center items-center transition-all duration-350">
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
        <div className="mt-4 grid grid-cols-2  sm:flex flex-wrap gap-2">
          <button
            onClick={() => setShowCreateTeacherModal(true)}
            className="bg-blue-600 text-white  px-3 py-1 hover:scale-105 cursor-pointer rounded hover:bg-blue-700"
          >
            ➕ Créer un formateur
          </button>
          <button
            onClick={() => setShowCreateAdminModal(true)}
            className="bg-amber-600 text-white  px-3 py-1 cursor-pointer hover:scale-105 rounded hover:bg-amber-700"
          >
            ➕ Créer un administrteur
          </button>
          <button
            onClick={() => setShowDellUserModal(true)}
            className="bg-red-600 text-white px-3 py-1 hover:scale-105 cursor-pointer hover:bg-red-700 rounded opacity-80"
          >
            🚫 Supprimer un utilisateur
          </button>
          <Link
            to={"/admin/newsletter"}
            className="bg-sky-950 hover:bg-black hover:scale-105 text-white px-3 py-1 rounded "
          >
            📬 Gerer les news letter
          </Link>
          <Link
            to={"/admin/logs"}
            className="bg-pink-900 hover:bg-black hover:scale-105 text-white px-3 py-1 rounded "
          >
            📬 Historique admin
          </Link>
          {/* <button
            onClick={() => setShowAddCourseModal(true)}
            className="bg-green-600 text-white px-3 hover:scale-105 cursor-pointer py-1 rounded hover:bg-green-700"
          >
            ➕ Ajouter un cours
          </button> */}
        </div>

        <div className=" flex items-center justify-center">
          <span
            onClick={verifyMe}
            className=" w-fit text-red-600 hover:animate-bounce cursor-pointer hover:text-red-700 animate-none "
          >
            {statusAccount === "VERIFIED" ? "" : <>Verify my account</>}
          </span>
        </div>
        <motion.section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Apprenants", value: stats.totalStudents },
            { label: "Formateurs", value: stats.totalTeachers },
            { label: "Cours publiés", value: stats.totalCourses },
            { label: "Contenus en attente", value: stats.pendingReview },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded p-5 shadow hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        <section>
          <h2 className="text-2xl font-semibold">📈 Inscriptions</h2>
          <div className="bg-white dark:bg-gray-800 rounded p-4 mt-3 shadow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Formateurs */}
        <section>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">👔 Formateurs</h2>
            <div className="flex gap-2">
              <select
                value={sortTeacher}
                onChange={(e) => setSortTeacher(e.target.value)}
                className="p-2 rounded cursor-pointer bg-gray-200 dark:bg-gray-700"
              >
                <option value="name">Trier par nom</option>
                <option value="courses">Trier par cours</option>
              </select>
              {/* <button
                className="bg-gray-600 text-white rounded p-1 hover:bg-gray-700"
                onClick={() => exportData(filteredTeachers, "formateurs.csv")}
              >
                Exporter CSV
              </button> */}
            </div>
          </div>
          <input
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
            placeholder="Rechercher un formateur..."
            className="mt-2 p-2 rounded w-full bg-gray-200 dark:bg-gray-700"
          />
          <div className="mt-3 space-y-2">
            {paginatedTeachers.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center hover:shadow-lg"
              >
                <div>
                  <span>{t.name}</span>
                  <span className="ml-2 text-gray-500">{t.courses} cours</span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/edit-teacher/${t.id}`}
                    className="bg-yellow-500 text-white rounded px-2 py-1 text-sm hover:bg-yellow-600"
                  >
                    Éditer
                  </Link>
                  <button
                    onClick={() => {
                      setUserToSuspend(t);
                      setShowSuspendModal(true);
                    }}
                    className="bg-red-600 text-white rounded px-2 py-1 text-sm hover:bg-red-700"
                  >
                    Suspendre
                  </button>
                </div>
              </div>
            ))}

            {paginatedTeachers.length === 0 && (
              <p className="text-gray-500">Aucun formateur</p>
            )}
            <div className="flex justify-center mt-3 gap-2">
              <button
                disabled={pageTeacher === 1}
                onClick={() => setPageTeacher(pageTeacher - 1)}
                className="bg-gray-300 rounded p-1"
              >
                Préc.
              </button>
              <span>{pageTeacher}</span>
              <button
                disabled={pageTeacher * pageSize >= filteredTeachers.length}
                onClick={() => setPageTeacher(pageTeacher + 1)}
                className="bg-gray-300 rounded p-1"
              >
                Suiv.
              </button>
            </div>
          </div>
        </section>
        {/* Apprenants */}
        <section>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">👥 Apprenants</h2>
            <div className="flex gap-2">
              <select
                value={sortStudent}
                onChange={(e) => setSortStudent(e.target.value)}
                className="p-2 rounded cursor-pointer bg-gray-200 dark:bg-gray-700"
              >
                <option value="name">Trier par nom</option>
                <option value="courses">Trier par cours</option>
              </select>
              {/* <button
                className="bg-gray-600 text-white rounded p-1 hover:bg-gray-700"
                onClick={() => exportData(filteredStudents, "apprenants.csv")}
              >
                Exporter CSV
              </button> */}
            </div>
          </div>
          <input
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            placeholder="Rechercher un apprenant..."
            className="mt-2 p-2 rounded w-full bg-gray-200 dark:bg-gray-700"
          />
          <div className="mt-3 space-y-2">
            {paginatedStudents.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-gray-800 p-3 rounded flex justify-between hover:shadow-lg"
              >
                <span>{s.name}</span>
                <span className="text-gray-500">{s.courses} cours suivis</span>
              </div>
            ))}
            {paginatedStudents.length === 0 && (
              <p className="text-gray-500">Aucun apprenant</p>
            )}
            <div className="flex justify-center mt-3 gap-2">
              <button
                disabled={pageStudent === 1}
                onClick={() => setPageStudent(pageStudent - 1)}
                className="bg-gray-300 rounded p-1"
              >
                Préc.
              </button>
              <span>{pageStudent}</span>
              <button
                disabled={pageStudent * pageSize >= filteredStudents.length}
                onClick={() => setPageStudent(pageStudent + 1)}
                className="bg-gray-300 rounded p-1"
              >
                Suiv.
              </button>
            </div>
          </div>
        </section>

        {/* Cours */}

        <PublishedCourses courses={publishedCourses} />
        <ContentPending courses={pendingCourses} />

        {/* <PublishedCourses
          courses={coursesData.filter((c) => c.status === "PUBLISHED")}
        />
        <ContentPending
          courses={coursesData.filter((c) => c.status === "IN_CHECKING")}
        /> */}
      </div>

      {/* Modales */}
      {showCreateTeacherModal && (
        <CreateTeacherModal onClose={() => setShowCreateTeacherModal(false)} />
      )}
      {showCreateAdminModal && (
        <CreateAdminModal onClose={() => setShowCreateAdminModal(false)} />
      )}
      {showDellUserModal && (
        <DeleteUserModal onClose={() => setShowDellUserModal(false)} />
      )}

      {showSuspendModal && userToSuspend && (
        <SuspendUserModal
          user={userToSuspend}
          onClose={() => {
            setUserToSuspend(null);
            setShowSuspendModal(false);
          }}
        />
      )}

      {showAddCourseModal && (
        <AddCourseModal onClose={() => setShowAddCourseModal(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
