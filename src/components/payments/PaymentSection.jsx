import React from "react";
import "react-phone-input-2/lib/style.css";
import { Link, useLocation } from "react-router-dom";
// import { useAuthStore } from "../../store/useAuthStore.js";

export default function PaymentSection() {
  const location = useLocation();

  const courseTitle = location.state?.courseTitle;
  const courseId = location.state?.courseId;
  const price = location.state?.price;
  //donnes a soumettre dans le mail
  const paylodData = { courseTitle, price, courseId };

  //fonction pour gerer le cliqueEvent
  // const handlePayment = async () => {
  //   if (!user || !user.id) {
  //     toast.error("⚠️ Veuillez vous connecter pour effectuer un paiement.");
  //     return;
  //   }

  //   if (!phoneNumber || phoneNumber.length < 9) {
  //     toast.error("📱 Numéro de téléphone invalide !");
  //     return;
  //   }

  //   const bookingId = `BOOK-${Date.now()}`;
  //   const normalizedPhone = phoneNumber.replace(/\D/g, "");

  //   try {
  //     setStatus("processing");

  //     const response = await api.post("/api/payment", {
  //       userId: user.id,
  //       courseId,
  //       bookingId,
  //       amount: price,
  //       phone: normalizedPhone,
  //       email: user.email,
  //       name: user.name,
  //     });

  //     const paymentUrl = response.data.data?.payment_url;

  //     if (paymentUrl) {
  //       window.location.href = paymentUrl;
  //     } else {
  //       toast.error("❌ Impossible de récupérer l'URL de paiement.");
  //       setStatus(null);
  //     }
  //   } catch (error) {
  //     console.error("Erreur paiement:", error);
  //     toast.error("Erreur lors du lancement du paiement.");
  //     setStatus(null);
  //   }
  // };

  return (
    <div className="mx-auto mt-[30%] sm:my-[12%]  lg:mt-40 dark:bg-gray-800 rounded-2xl p-6 max-w-lg shadow-lg">
      <div className="flex justify-center items-center my-3">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Excell<span className="text-black dark:text-zinc-50">Hub</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <h2 className=" text-xl my-10 mt-0 font-semibold text-gray-800 dark:text-gray-100 text-center">
          Etes-vous interesse par le cours {""}: <br />
          <span className="text-secondary">{courseTitle}</span> ?.
          <br />
          Il est a seulement a {""}:{" "}
          <span className="text-lg  font-medium text-center text-green-600 mt-2">
            {price} ${" "}
          </span>
        </h2>
      </div>
      <div className="flex justify-center dark:text-white">
        Cliquez sur le bouton {"<<Souscrire>>"} et recevais un email avec tous
        les infos neccessaire pour avoir acces a ce cours et poursuivre
        l'aventure.{" "}
      </div>
      <div className="flex  justify-around text-white ">
        <button
          type="button"
          className={`w-full cursor-pointer mt-6 rounded-lg py-3 font-bold text-white ${
            status === "processing"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 dark:bg-primary/60 dark:hover:bg-primary"
          }`}
        >
          {status === "processing" ? "⏳ Paiement en cours..." : `Souscrire`}
        </button>
      </div>
      <div className="flex justify-around text-white ">
        <button
          type="button"
          className={`w-full cursor-pointer mt-6 rounded-lg py-3 font-bold text-white ${
            status === "processing"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600/90 hover:bg-red-500 dark:hover:bg-red-600"
          }`}
        >
          {status === "processing" ? "⏳ Paiement en cours..." : `Annuler`}
        </button>
      </div>
    </div>
  );
}
