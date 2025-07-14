// // QuizViewer.jsx
// import React, { useState, useEffect } from "react";
// import api from "../../api/Axios";
// import { useParams } from "react-router-dom";

// const QuizViewer = () => {
//   const { lessonId } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         // const res = await api.get(`/api/quizzes/lesson/${lessonId}`);

//         const { data } = await api.get(`/api/quizzes/lesson/${lessonId}`);
//         setQuiz(data);
//       } catch (err) {
//         console.error("Erreur lors du chargement du quiz :", err);
//       }
//     };

//     fetchQuiz();
//   }, [lessonId]);

//   const handleChange = (questionId, option) => {
//     setAnswers({ ...answers, [questionId]: option });
//   };

//   const handleSubmit = () => {
//     setSubmitted(true);
//   };

//   if (!quiz) return <p>Chargement du quiz...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
//       {quiz?.questions?.map((q, idx) => {
//         const userAnswer = answers[q.id];
//         const isCorrect = submitted && userAnswer === q.answer;
//         return (
//           <div key={q.id} className="mb-6">
//             <p className="font-semibold">
//               {idx + 1}. {q.text}
//             </p>
//             <div className="ml-4 mt-2 space-y-1">
//               {q.options.map((opt) => (
//                 <label key={opt} className="block">
//                   <input
//                     type="radio"
//                     name={q.id}
//                     value={opt}
//                     disabled={submitted}
//                     checked={userAnswer === opt}
//                     onChange={() => handleChange(q.id, opt)}
//                     className="mr-2"
//                   />
//                   {opt}
//                 </label>
//               ))}
//             </div>
//             {submitted && (
//               <div className="mt-2 text-sm">
//                 {isCorrect ? (
//                   <p className="text-green-600">✅ Bonne réponse</p>
//                 ) : (
//                   <>
//                     <p className="text-red-600">❌ Mauvaise réponse</p>
//                     <p className="text-gray-600">
//                       Bonne réponse : <strong>{q.answer}</strong>
//                     </p>
//                     {q.explanation && (
//                       <p className="text-gray-500 italic mt-1">
//                         💡 {q.explanation}
//                       </p>
//                     )}
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}
//       {!submitted && (
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
//           onClick={handleSubmit}
//         >
//           Soumettre mes réponses
//         </button>
//       )}
//     </div>
//   );
// };

// export default QuizViewer;
