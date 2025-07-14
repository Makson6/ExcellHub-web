import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <div className="w-72 md:w-96">
        <DotLottieReact
          src="https://lottie.host/2f2194bc-a07e-4ccb-97fb-fdd036dca02c/ZUvcVLD4bg.lottie"
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <h2 className="text-2xl font-semibold mt-4 mb-2">
        Oups ! Page introuvable
      </h2>
      <p className="mb-6 text-center max-w-md">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
