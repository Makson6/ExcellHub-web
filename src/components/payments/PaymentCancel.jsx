import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Paiement annulé
        </h2>
        <p className="text-gray-700 mb-4">
          Votre paiement a été annulé ou a échoué. Aucun montant n'a été débité.
        </p>
        <Link
          to="/cours"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retour aux cours
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
