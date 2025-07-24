import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import StudentDashboard from "./Student";
import AdminDashboard from "./Admin";
import TeacherDashboard from "./Teacher";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export default function Dashboard() {
  const { user, vraiUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dashboardPath = useLocation().pathname;

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        await vraiUser();
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: dashboardPath });
    }
  }, [loading, user, navigate, dashboardPath]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader size={55} className="animate-spin mb-20 dark:text-light" />
      </div>
    );
  }

  if (!user) return null; // Pour éviter un rendu inutile pendant redirection

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard user={user} />;
    case "STUDENT":
      return <StudentDashboard user={user} />;
    case "TEACHER":
      return <TeacherDashboard user={user} />;
    default:
      return <div>Rôle utilisateur inconnu</div>;
  }
}
