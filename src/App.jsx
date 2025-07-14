import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import "./i18n/i18n";
import TestEnv from "./testA";

function App() {
  const { user, accessToken, fetchCurrentUser, vraiUser } = useAuthStore();
  const pageTracker = useLocation().pathname;

  const hideNavbarOn = ["forgot-password"];
  const shouldHideNavbar = hideNavbarOn.includes(pageTracker);

  useEffect(() => {
    if (!user && accessToken) {
      console.log("no user");

      fetchCurrentUser();
      vraiUser();
    }
  }, [user, accessToken, fetchCurrentUser, vraiUser]);

  return (
    <div className="bg-zinc-50 text-lighttext dark:bg-gray-600 dark:text-darktext min-h-screen flex flex-col">
      <Toaster />
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <TestEnv /> */}
    </div>
  );
}

export default App;
