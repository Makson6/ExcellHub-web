import React from "react";

const ContentPending = ({ courses }) => {
  const pending = courses.filter((c) => c.status === "En attente");
  return (
    <section>
      <h2 className="text-2xl font-semibold">🕒 Contenus en attente</h2>
      <div className="mt-3 space-y-2">
        {pending.map((c) => (
          <div
            key={c.id}
            className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded shadow"
          >
            <span>{c.title}</span>
          </div>
        ))}
        {pending.length === 0 && (
          <p className="text-gray-500">Aucun contenu en attente</p>
        )}
      </div>
    </section>
  );
};

export default ContentPending;
