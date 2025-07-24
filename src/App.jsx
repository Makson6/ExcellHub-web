import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import "./i18n/i18n";
import Footer from "./components/Footer";
import FaqSection from "./components/FaqQuestions";

function App() {
  const { user, accessToken, vraiUser } = useAuthStore();
  const location = useLocation();

  const hideNavbarOn = ["forgot-password", "/login", "register"];
  const shouldHideNavbar = hideNavbarOn.some((path) =>
    location.pathname.toLowerCase().includes(path)
  );

  const hasFetchedUser = useRef(false); // ✅ pour éviter appels multiples

  useEffect(() => {
    if (!user && accessToken && !hasFetchedUser.current) {
      hasFetchedUser.current = true;
      vraiUser();
    }
  }, [user, accessToken, vraiUser]);

  return (
    <div className="bg-zinc-50 text-lighttext dark:bg-gray-600 dark:text-darktext min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* {shouldHideNavbar && <FaqSection />} */}
      {shouldHideNavbar && <Footer />}
    </div>
  );
}
export default App;
