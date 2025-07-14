// import React from "react";
// import { Link } from "react-router-dom";

// const CourseCard = ({ course }) => {
//   return (
//     <div className="rounded-xl overflow-hidden shadow-md bg-white hover:scale-[1.02] transition-all">
//       <img
//         src={course.thumbnail}
//         alt={course.title}
//         className="w-full h-40 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-bold">{course.title}</h3>
//         <p className="text-gray-600 text-sm mt-2">{course.description}</p>
//         <Link
//           to={`/courses/${course.id}/chapters`}
//           className="inline-block mt-4 text-blue-600 hover:underline"
//         >
//           Voir le cours →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CourseCard = ({ course }) => {
  const { i18n } = useTranslation();

  // Langue courante (fr, en, ln, sw)
  const lang = i18n.language;

  // 🔄 Fallback sur les champs par langue ou par défaut
  const translatedTitle = course[`title_${lang}`] || course.title;
  const translatedDescription =
    course[`description_${lang}`] || course.description;

  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white hover:scale-[1.02] transition-all">
      <img
        src={course.thumbnailUrl}
        alt={translatedTitle}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{translatedTitle}</h3>
        <p className="text-gray-600 text-sm mt-2">{translatedDescription}</p>
        <Link
          to={`/courses/${course.id}/chapters`}
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Voir le cours →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
