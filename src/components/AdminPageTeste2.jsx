import { Link } from "react-router-dom";
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
import ContentPending from "./ContentPending";
import PublishedCourses from "./PublishedCourses";
import UserNotADMIN from "./UserNotADMIN";
import api from "../api/Axios";
import CreateTeacherModal from "./admin/createTeacherModal";
import CreateAdminModal from "./admin/CreateAdminModal";
import SuspendUserModal from "./admin/SuspendUserModal";
import AddCourseModal from "./admin/AddCourseModal";
import toast from "react-hot-toast";
import UserNotConnected from "./UserNotConnected";
import DeleteUserModal from "./admin/DeleteUserModal";

const AdminDashboard2 = () => {
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

  const [showCreateTeacherModal, setShowCreateTeacherModal] = useState(false);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showDellUserModal, setShowDellUserModal] = useState(false);

  const pageSize = 3;

  useEffect(() => {
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
      }
    };
    fetchAll();
  }, []);

  if (theUser === null) return <UserNotADMIN />;
  const Role = theUser.role;

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

  const statusAccount = theUser?.statusAccount;

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
    <div className="min-h-screen py-10 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold">Admin {theUser.fullName}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Gérez les comptes, cours et contenus de la plateforme.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setShowCreateTeacherModal(true)}
              className="bg-blue-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-700"
            >
              ➕ Créer un formateur
            </button>
            <button
              onClick={() => setShowCreateAdminModal(true)}
              className="bg-amber-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-amber-700"
            >
              ➕ Créer un administrteur
            </button>
            <button
              onClick={() => setShowDellUserModal(true)}
              className="bg-red-600 text-white px-3 py-1 cursor-pointer hover:bg-red-700 rounded opacity-80"
            >
              🚫 Supprimer un utilisateur
            </button>
            <Link
              to={"/admin/newsletter"}
              className="bg-sky-950 hover:bg-black text-white px-3 py-1 rounded "
            >
              📬 Gerer les news letter
            </Link>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="bg-green-600 text-white px-3 cursor-pointer py-1 rounded hover:bg-green-700"
            >
              ➕ Ajouter un cours
            </button>
          </div>
        </header>
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
                className="p-2 rounded bg-gray-200 dark:bg-gray-700"
              >
                <option value="name">Trier par nom</option>
                <option value="courses">Trier par cours</option>
              </select>
              <button
                className="bg-gray-600 text-white rounded p-1 hover:bg-gray-700"
                onClick={() => exportData(filteredTeachers, "formateurs.csv")}
              >
                Exporter CSV
              </button>
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
                className="p-2 rounded bg-gray-200 dark:bg-gray-700"
              >
                <option value="name">Trier par nom</option>
                <option value="courses">Trier par cours</option>
              </select>
              <button
                className="bg-gray-600 text-white rounded p-1 hover:bg-gray-700"
                onClick={() => exportData(filteredStudents, "apprenants.csv")}
              >
                Exporter CSV
              </button>
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

export default AdminDashboard2;
