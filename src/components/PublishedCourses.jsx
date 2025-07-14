import React from "react";

const PublishedCourses = ({ courses }) => {
  const published = courses.filter((c) => c.status === "Publié");
  return (
    <section>
      <h2 className="text-2xl font-semibold">✅ Cours publiés</h2>
      <div className="mt-3 space-y-2">
        {published.map((c) => (
          <div
            key={c.id}
            className="bg-green-100 dark:bg-green-800 p-3 rounded shadow"
          >
            <span>{c.title}</span>
          </div>
        ))}
        {published.length === 0 && (
          <p className="text-gray-500">Aucun cours publié</p>
        )}
      </div>
    </section>
  );
};

export default PublishedCourses;
