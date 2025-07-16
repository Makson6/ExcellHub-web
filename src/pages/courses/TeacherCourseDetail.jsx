import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/Axios";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

const TeacherCourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/courses/${courseId}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error("Erreur chargement cours:", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Retour
      </button>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <div className="flex gap-3">
          <Link
            to={`/courses/${course.id}/edit`}
            className="text-yellow-600 hover:underline flex items-center gap-1"
          >
            <Pencil size={18} /> Modifier
          </Link>
          <button className="text-red-600 hover:underline flex items-center gap-1">
            <Trash2 size={18} /> Supprimer
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
      <p>
        Catégorie : <span className="font-semibold">{course.category}</span>
      </p>
      <p>
        Durée :{" "}
        <span className="font-semibold">{course.duration || 0} min</span>
      </p>
      <p>
        Statut :{" "}
        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            course.status === "VALIDATED"
              ? "bg-green-600"
              : course.status === "IN_CHECKING"
              ? "bg-yellow-500"
              : "bg-gray-600"
          }`}
        >
          {course.status}
        </span>
      </p>

      <h2 className="text-2xl font-semibold mt-6">Leçons</h2>
      <ul className="space-y-2">
        {course.lessons?.length > 0 ? (
          course.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              <p className="text-sm text-gray-500">
                Durée : {lesson.duration || "?"} min
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Aucune leçon disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default TeacherCourseDetail;
