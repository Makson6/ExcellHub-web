import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js"; // ✅ Import Stripe
// import { loadStripe } from "@stripe/stripe-js"; // ✅ Import Stripe
import router from "./routes/index.jsx";
import "./index.css";

// const stripePromise = loadStripe("VOTRE_CLE_PUBLIQUE_STRIPE_ICI"); // 👈 À REMPLACER

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Elements stripe={stripePromise}> */}
    <RouterProvider router={router} />
    {/* </Elements> */}
  </StrictMode>
);
