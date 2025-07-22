import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Paiement Réussi !
        </h2>
        <p className="text-gray-700 mb-4">
          Merci pour votre achat. Votre paiement a bien été reçu.
        </p>
        <Link
          to="/mes-cours"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Accéder à mes cours
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
