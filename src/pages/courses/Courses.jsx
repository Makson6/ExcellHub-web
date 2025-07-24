import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import api from "../../api/Axios";
import { Loader } from "lucide-react";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // NEW
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // ajout loading
  const limit = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/courses/paginated", {
          params: {
            page: currentPage,
            limit,
            search,
            sortBy,
          },
        });

        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Erreur de chargement des cours :", error);
      } finally {
        setLoading(false); // fin chargement
      }
    };

    fetchCourses();
  }, [currentPage, search, sortBy]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📚 Tous les cours</h1>

        {/* Barre de recherche + tri */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Rechercher un cours..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg"
          >
            <option value="recent">📅 Les plus récents</option>
            <option value="popular">🔥 Les plus populaires</option>
            <option value="level_asc">⬆️ Niveau : Croissant</option>
            <option value="level_desc">⬇️ Niveau : Décroissant</option>
          </select>
        </div>

        {/* Liste des cours */}
        {loading ? (
          <p className="text-center text-xl text-gray-600">
            <Loader />
          </p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">Aucun cours trouvé.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                ◀ Précédent
              </button>
              <span className="text-lg font-medium">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Suivant ▶
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
