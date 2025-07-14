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
import ContentPending from "../../../components/ContentPending";
import PublishedCourses from "../../../components/PublishedCourses";
import UserNotADMIN from "../../../components/UserNotADMIN";
import UserNotConnected from "../../../components/UserNotConnected";
import api from "../../../api/Axios";

const AdminDashboard = ({ user }) => {
  // Simulations de données
  const stats = {
    totalStudents: 125,
    totalTeachers: 12,
    totalCourses: 34,
    pendingReview: 5,
  };
  const teachersData = [
    { id: 1, name: "Jean Dupont", courses: 5 },
    { id: 2, name: "Sarah Martin", courses: 3 },
    { id: 3, name: "Joseph Kabila", courses: 5 },
    { id: 4, name: "Moise Martin", courses: 3 },
    { id: 5, name: "Styve Dupont", courses: 5 },
    { id: 6, name: "Marie Martin", courses: 3 },
    { id: 7, name: "Francine Dupont", courses: 5 },
    { id: 8, name: "Sarah Cynthia", courses: 3 },
  ];
  const studentsData = [
    { id: 1, name: "Ali Kamara", courses: 4 },
    { id: 2, name: "Emma Moreau", courses: 2 },
    { id: 3, name: "Marc Lévesque", courses: 1 },
  ];
  const coursesData = [
    { id: 1, title: "JavaScript Avancé", status: "Publié" },
    { id: 2, title: "Gestion de Projet Agile", status: "Publié" },
    { id: 3, title: "Design UX/UI", status: "En attente" },
  ];
  const registrationsData = [
    { month: "Jan", students: 2 },
    { month: "Fév", students: 5 },
    { month: "Mar", students: 7 },
    { month: "Avr", students: 0 },
    { month: "Mai", students: 4 },
    { month: "Juin", students: 6 },
    { month: "Juil", students: 19 },
    { month: "Aout", students: 4 },
    { month: "Sept", students: 28 },
    { month: "Oct", students: 9 },
    { month: "Nov", students: 2 },
    { month: "Dec", students: 9 },
  ];

  // États de recherche, tri, pagination
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [sortTeacher, setSortTeacher] = useState("name");
  const [sortStudent, setSortStudent] = useState("name");
  const [pageTeacher, setPageTeacher] = useState(1);
  const [pageStudent, setPageStudent] = useState(1);

  // États des modales
  const [showCreateTeacherModal, setShowCreateTeacherModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");

  // Pagination
  const pageSize = 3;

  // Filtres & tri
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

  const [theUser, setTheUser] = useState("");
  // Export
  const exportData = (data, filename) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download = filename;
    link.click();
  };
  useEffect(() => {
    const UserP = async () => {
      const user1 = await api.get("/api/auth/me");
      setTheUser(user1);
    };
    UserP();
  }, []);
  const Role = theUser.data?.role;
  if (Role === undefined) return <UserNotConnected />;
  if (Role !== "ADMIN") return <UserNotADMIN />;
  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold">Espace Admin {user?.fullName}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Gérez les comptes, cours et contenus de la plateforme.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setShowCreateTeacherModal(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              ➕ Créer un formateur
            </button>
            <button
              disabled
              className="bg-red-600 text-white px-3 py-1 rounded opacity-30"
            >
              🚫 Suspendre un utilisateur
            </button>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              ➕ Ajouter un cours
            </button>
          </div>
        </header>

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

        <PublishedCourses courses={coursesData} />
        <ContentPending courses={coursesData} />
      </div>

      {/* Modale créer formateur */}
      {showCreateTeacherModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-60">
          <div className="bg-white rounded p-6 space-y-4">
            <h2 className="text-xl font-bold">Créer un formateur</h2>
            <input
              placeholder="Nom du formateur"
              className="p-2 rounded border w-full"
            />
            <input
              placeholder="Email du formateur"
              className="p-2 rounded border w-full"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateTeacherModal(false)}
                className="bg-gray-300 rounded p-2"
              >
                Annuler
              </button>
              <button className="bg-blue-600 text-white rounded p-2">
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale suspendre utilisateur */}
      {showSuspendModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-60">
          <div className="bg-white rounded p-6 space-y-4">
            <h2 className="text-xl font-bold">
              Suspendre {userToSuspend?.name}
            </h2>
            <p>Êtes‑vous sûr de vouloir suspendre cet utilisateur ?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setUserToSuspend(null);
                }}
                className="bg-gray-300 rounded p-2"
              >
                Annuler
              </button>
              <button className="bg-red-600 text-white rounded p-2">
                Suspendre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale ajouter un cours */}
      {showAddCourseModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-60 z-50">
          <div className="bg-white rounded p-6 space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold">Ajouter un nouveau cours</h2>
            <input
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              placeholder="Titre du cours"
              className="p-2 rounded border w-full"
            />
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  alert(
                    `✅ Cours "${newCourseTitle}" ajouté avec statut "En attente"`
                  );
                  setShowAddCourseModal(false);
                  setNewCourseTitle("");
                }}
                className="bg-yellow-500 text-white rounded p-2 hover:bg-yellow-600"
              >
                Ajouter comme En attente
              </button>
              <button
                onClick={() => {
                  alert(
                    `✅ Cours "${newCourseTitle}" ajouté avec statut "Publié"`
                  );
                  setShowAddCourseModal(false);
                  setNewCourseTitle("");
                }}
                className="bg-green-600 text-white rounded p-2 hover:bg-green-700"
              >
                Ajouter comme Publié
              </button>
              <button
                onClick={() => {
                  setShowAddCourseModal(false);
                  setNewCourseTitle("");
                }}
                className="bg-gray-300 rounded p-2"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
