// import React from "react";

// const StudentList = ({
//   students,
//   search,
//   setSearch,
//   sort,
//   setSort,
//   page,
//   setPage,
//   pageSize,
//   exportData,
// }) => {
//   const filtered = students.filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const sorted = [...filtered].sort((a, b) =>
//     sort === "name" ? a.name.localeCompare(b.name) : b.courses - a.courses
//   );
//   const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

//   return (
//     <section>
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">👥 Apprenants</h2>
//         <div className="flex gap-2">
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="p-2 rounded bg-gray-200 dark:bg-gray-700"
//           >
//             <option value="name">Trier par nom</option>
//             <option value="courses">Trier par cours</option>
//           </select>
//           <button
//             className="bg-gray-600 text-white rounded p-1 hover:bg-gray-700"
//             onClick={() => exportData(filtered, "apprenants.csv")}
//           >
//             Exporter CSV
//           </button>
//         </div>
//       </div>
//       <input
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Rechercher un apprenant..."
//         className="mt-2 p-2 rounded w-full bg-gray-200 dark:bg-gray-700"
//       />
//       <div className="mt-3 space-y-2">
//         {paginated.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white dark:bg-gray-800 p-3 rounded flex justify-between hover:shadow-lg"
//           >
//             <span>{s.name}</span>
//             <span className="text-gray-500">{s.courses} cours suivis</span>
//           </div>
//         ))}
//         {paginated.length === 0 && (
//           <p className="text-gray-500">Aucun apprenant</p>
//         )}
//         <div className="flex justify-center mt-3 gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="bg-gray-300 rounded p-1"
//           >
//             Préc.
//           </button>
//           <span>{page}</span>
//           <button
//             disabled={page * pageSize >= filtered.length}
//             onClick={() => setPage(page + 1)}
//             className="bg-gray-300 rounded p-1"
//           >
//             Suiv.
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StudentList;
