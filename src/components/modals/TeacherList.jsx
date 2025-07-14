// import React from "react";
// import { Link } from "react-router-dom";

// const TeacherList = ({
//   teachersData = [],
//   searchTeacher,
//   sortTeacher,
//   pageTeacher,
//   pageSize,
//   setSearchTeacher,
//   setSortTeacher,
//   setPageTeacher,
//   setUserToSuspend,
//   setShowSuspendModal,
//   exportData,
// }) => {
//   const filteredTeachers = teachersData.filter((t) =>
//     t.name.toLowerCase().includes(searchTeacher.toLowerCase())
//   );

//   const sortedTeachers = [...filteredTeachers].sort((a, b) =>
//     sortTeacher === "name"
//       ? a.name.localeCompare(b.name)
//       : b.courses - a.courses
//   );

//   const paginatedTeachers = sortedTeachers.slice(
//     (pageTeacher - 1) * pageSize,
//     pageTeacher * pageSize
//   );

//   return (
//     <section>
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">👔 Formateurs</h2>
//         <div className="flex gap-2">
//           <select
//             value={sortTeacher}
//             onChange={(e) => setSortTeacher(e.target.value)}
//             className="p-2 rounded bg-gray-200 dark:bg-gray-700"
//           >
//             <option value="name">Trier par nom</option>
//             <option value="courses">Trier par cours</option>
//           </select>
//           <button
//             className="bg-gray-600 text-white rounded p-1 hover:bg-gray-700"
//             onClick={() => exportData(filteredTeachers, "formateurs.csv")}
//           >
//             Exporter CSV
//           </button>
//         </div>
//       </div>
//       <input
//         value={searchTeacher}
//         onChange={(e) => setSearchTeacher(e.target.value)}
//         placeholder="Rechercher un formateur..."
//         className="mt-2 p-2 rounded w-full bg-gray-200 dark:bg-gray-700"
//       />
//       <div className="mt-3 space-y-2">
//         {paginatedTeachers.map((t) => (
//           <div
//             key={t.id}
//             className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center hover:shadow-lg"
//           >
//             <div>
//               <span>{t.name}</span>
//               <span className="ml-2 text-gray-500">{t.courses} cours</span>
//             </div>
//             <div className="flex space-x-2">
//               <Link
//                 to={`/admin/edit-teacher/${t.id}`}
//                 className="bg-yellow-500 text-white rounded px-2 py-1 text-sm hover:bg-yellow-600"
//               >
//                 Éditer
//               </Link>
//               <button
//                 onClick={() => {
//                   setUserToSuspend(t);
//                   setShowSuspendModal(true);
//                 }}
//                 className="bg-red-600 text-white rounded px-2 py-1 text-sm hover:bg-red-700"
//               >
//                 Suspendre
//               </button>
//             </div>
//           </div>
//         ))}
//         {paginatedTeachers.length === 0 && (
//           <p className="text-gray-500">Aucun formateur</p>
//         )}
//         <div className="flex justify-center mt-3 gap-2">
//           <button
//             disabled={pageTeacher === 1}
//             onClick={() => setPageTeacher(pageTeacher - 1)}
//             className="bg-gray-300 rounded p-1"
//           >
//             Préc.
//           </button>
//           <span>{pageTeacher}</span>
//           <button
//             disabled={pageTeacher * pageSize >= filteredTeachers.length}
//             onClick={() => setPageTeacher(pageTeacher + 1)}
//             className="bg-gray-300 rounded p-1"
//           >
//             Suiv.
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeacherList;
