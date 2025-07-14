// @ts-nocheck
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import api from "../api/Axios.js";
// import { isValidPhoneNumber } from "libphonenumber-js";
import airtelLogo from "../assets/airtel.png";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
export default function PaymentSection({ price }) {
  const [provider, setProvider] = useState("airtel");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState(null);
  const Coursprice = useLocation().state?.price;
  // if (!isValidPhoneNumber(paymentData.phoneNumber)) {
  //   toast.error("⚠️ Veuillez entrer un numéro de téléphone valide !");
  //   return;
  // }
  const courseTitle = useLocation().state.courseTitle;
  const courseId = useLocation().state.courseId;
  // console.log("couseTitle:", courseTitle);
  // console.log("cousrseId:", courseId);

  const handleAirtelPayment = async () => {
    try {
      const paymentData = {
        provider,
        phoneNumber: `${phoneNumber}`,
        amount: Coursprice,
        courseId: courseId,
      };
      if (courseTitle === undefined) {
        return toast.error("courseTitle est:", courseTitle);
      }
      const res = api.post("/api/payments/airtel", paymentData);
      console.log("📦 Données à soumettre :", res);

      setStatus("processing");

      setTimeout(() => {
        setStatus("success");
        toast.success(
          `✅ Paiement Airtel Money effectué pour "${courseTitle}" !`
        );
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto my-[6%] dark:bg-gray-800 rounded-2xl p-6 max-w-lg shadow-lg">
      <div className="flex justify-center items-center my-3">
        <Link to="/" className="text-2xl font-bold  text-blue-600">
          Excell<span className="text-black dark:text-zinc-50">Hub</span>
        </Link>
      </div>
      {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
        <div>💳Votre Mode de Payement :</div>
        {provider}
      </h2>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
        Montant a payer : <span className="text-green-600">{Coursprice} $</span>
      </h2> */}
      <div className="flex space-x-3 mt-5">
        <button
          className={`flex-1 rounded-lg p-3 cursor-pointer font-bold text-center flex flex-col items-center space-y-2 ${
            provider === "airtel"
              ? // ? "bg-midnight text-white"
                " text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105"
          }`}
          onClick={() => setProvider("airtel")}
        >
          <img src={airtelLogo} alt="Airtel" className="h-28 w-30 rounded-md" />
          <p>Airtel Money</p>
        </button>
        {/* <button
          className={`flex-1 rounded-lg p-3 cursor-pointer font-bold text-center flex flex-col items-center space-y-2 ${
            provider === ""
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105"
          }`}
          onClick={() => setProvider("")}
        >
          <span className="text-4xl">💳</span>
          Stripe
        </button> */}
      </div>
      {provider === "airtel" && (
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            📱 Numéro de téléphone
          </label>
          <div className="mt-2">
            <PhoneInput
              country={"cd"}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              inputClass="!w-full !h-12 !rounded-lg !border"
              buttonClass="!rounded-l-lg"
            />
          </div>
        </div>
      )}
      {provider === "" && (
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            💳 Numéro de carte
          </label>
          <div className="mt-2 rounded-lg border p-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            {/* <CardElement /> */}
          </div>
        </div>
      )}
      <button
        type="submit"
        onClick={provider === "airtel" ? handleAirtelPayment : ""}
        disabled={status === "processing"}
        className={`w-full cursor-pointer mt-6 rounded-lg py-3 font-bold text-white 
            ${
              status === "processing"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
      >
        {status === "processing"
          ? "⏳ Paiement en cours…"
          : `Payer ${Coursprice} $`}
      </button>
      {status === "success" && (
        <p className="text-green-600 font-medium text-center mt-3">
          ✅ Paiement effectué avec succès !
        </p>
      )}
      {status === "failed" && (
        <p className="text-red-600 font-medium text-center mt-3">
          ❌ Échec du paiement
        </p>
      )}
    </div>
  );
}
