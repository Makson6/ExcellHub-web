// import React, { useEffect, useState } from "react";
// import AdminPayment from "./airtelTest/AdminPaymentTest";

// const PaymentsList = () => {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     // Exemple de données statiques
//     const examplePayments = [
//       {
//         id: "1",
//         transactionId: "TXN123456",
//         status: "Réussi",
//         amount: 49.99,
//         currency: "€",
//         createdAt: "2025-06-25T14:23:00Z",
//       },
//       {
//         id: "2",
//         transactionId: "TXN987654",
//         status: "Échoué",
//         amount: 19.99,
//         currency: "€",
//         createdAt: "2025-06-24T09:15:00Z",
//       },
//       {
//         id: "3",
//         transactionId: "TXN456789",
//         status: "En attente",
//         amount: 99.99,
//         currency: "€",
//         createdAt: "2025-06-23T18:45:00Z",
//       },
//     ];

//     // Simuler un fetch avec un délai
//     setTimeout(() => {
//       setPayments(examplePayments);
//     }, 500);
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <h2 className="text-2xl font-bold">Historique des Paiements</h2>
//       <table className="min-w-full mt-4 border rounded">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Transaction</th>
//             <th className="p-3">Statut</th>
//             <th className="p-3">Montant</th>
//             <th className="p-3">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((pay) => (
//             <tr key={pay.id}>
//               <td className="p-3">{pay.transactionId}</td>
//               <td className="p-3">{pay.status}</td>
//               <td className="p-3">
//                 {pay.amount} {pay.currency}
//               </td>
//               <td className="p-3">
//                 {new Date(pay.createdAt).toLocaleString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <AdminPayment />
//     </div>
//   );
// };

// export default PaymentsList;
