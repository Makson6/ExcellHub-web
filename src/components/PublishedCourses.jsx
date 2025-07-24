import React from "react";

const PublishedCourses = ({ courses }) => {
  if (!Array.isArray(courses)) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">✅ Cours publiés</h2>
      <div className="mt-3 space-y-2">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-green-100 dark:bg-green-800 p-3 rounded shadow"
            >
              <span>{course.title}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun cours publié</p>
        )}
      </div>
    </section>
  );
};

export default PublishedCourses;
