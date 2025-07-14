// testEnv.jsx
import React from "react";
export default function TestEnv() {
  return (
    <div className="p-4">
      <p>
        VITE_BACKEND_URL = {import.meta.env.VITE_BACKEND_URL || "❌ Non défini"}
      </p>
    </div>
  );
}
