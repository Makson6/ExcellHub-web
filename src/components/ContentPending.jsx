import React, { useState } from "react";
import CourseActionModal from "./modals/CourseActionModal";

const ContentPending = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [actionType, setActionType] = useState("");

  const openModal = (course, type) => {
    setSelectedCourse(course);
    setActionType(type);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setActionType("");
  };

  if (!Array.isArray(courses)) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">🕒 Contenus en attente</h2>
      <div className="mt-3 space-y-2">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded shadow flex justify-between items-center"
          >
            <span>{c.title}</span>
            <div className="space-x-2">
              <button
                className="bg-green-600 cursor-pointer text-white px-2 py-1 rounded hover:bg-green-700"
                onClick={() => openModal(c, "approve")}
              >
                ✅ Activer
              </button>
              <button
                className="bg-red-600 cursor-pointer text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={() => openModal(c, "reject")}
              >
                ❌ Rejeter
              </button>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <p className="text-gray-500">Aucun contenu en attente</p>
        )}
      </div>

      {/* Modal */}
      {selectedCourse && actionType && (
        <CourseActionModal
          course={selectedCourse}
          actionType={actionType}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ContentPending;
