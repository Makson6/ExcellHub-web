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
  useEffect(() => {
    async function fetchUser() {
      await vraiUser();
      setLoading(false);
    }

    fetchUser();
  }, [vraiUser]);
  const dashboard = useLocation().pathname;
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  }, [loading]);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader size={55} className="animate-spin mb-20 dark:text-light" />
      </div>
    );
  if (!user) {
    navigate("/login", { state: dashboard });
  }

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
