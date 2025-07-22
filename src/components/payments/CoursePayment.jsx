import React from "react";
import axios from "axios";

const PaiementCours = ({ course, user }) => {
  const handlePaiement = async () => {
    const bookingId = "BOOK-" + Date.now();

    try {
      const res = await axios.post("http://localhost:5000/api/payment", {
        userId: user.id,
        courseId: course.id,
        amount: course.prix,
        bookingId,
        phone: user.tel,
        email: user.email,
        name: user.name + " " + user.lastName,
      });

      if (res.data.data.payment_url) {
        window.location.href = res.data.data.payment_url;
      } else {
        alert("Erreur de redirection vers le paiement.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'initialisation du paiement.");
    }
  };

  return (
    <button
      onClick={handlePaiement}
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      Payer {course.prix} FCFA
    </button>
  );
};

export default PaiementCours;
