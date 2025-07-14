import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/Axios";
import { useEffect } from "react";

export default function OtpVerification() {
  const location = useLocation();
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  //verifier la page si reelement l'utilisateur a deja mis son email
  useEffect(() => {
    if (!location.state) {
      toast.error("Vous devez fournir un email pour avoir accès à cette page.");
      navigate("/login");
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; //regex pour accepter seulement une seule valeur

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const newOtp = [...otpValues];
      newOtp[index - 1] = "";
      setOtpValues(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpValues.join("");

    if (otp.length < 6) {
      toast.error("Entrez les 6 chiffres du code OTP");
      return;
    }

    try {
      const credentials = {
        otp,
        email: location.state?.email,
      };

      const res = await api.post("/api/auth/verify-otp", credentials);
      navigate("/reset-password", {
        state: { email: credentials.email },
      });
      toast.success(res.data.message || "OTP vérifié avec succès !");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur de vérification OTP"
      );
    }
  };

  return (
    <div className="dark:bg-[var(--dark-background)] min-h-screen flex items-center justify-center px-4">
      <div className="bg-[var(--light-primary)] dark:bg-[var(--dark-primary)] p-8 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Vérification OTP
        </h2>
        <p className="text-center mb-4 text-sm text-gray-600 dark:text-gray-300">
          Entrez le code OTP à 6 chiffres envoyé à votre e-mail.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex gap-3 justify-center">
            {otpValues.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-[var(--light-zinc)] hover:bg-[var(--light-hover-button)] hover:dark:bg-[var(--dark-hover-button)] dark:bg-[var(--dark-green)] text-white font-semibold rounded-md w-full py-2"
          >
            Vérifier
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Tu as déjà un compte ?{" "}
          <a
            href="/login"
            className="text-[var(--light-zinc)] hover:underline dark:text-[var(--dark-accent)]"
          >
            Connexion
          </a>
        </div>
      </div>
    </div>
  );
}
