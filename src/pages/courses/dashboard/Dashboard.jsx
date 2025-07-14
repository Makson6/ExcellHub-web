import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import StudentDashboard from "./Student";
import AdminDashboard from "./Admin";
import TeacherDashboard from "./Teacher";
import Login from "../../Login";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboard2 from "../../../components/AdminPageTeste2";
import toast from "react-hot-toast";

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
        toast.error("Connect your account please!");
        setLoading(false);
      }, 10000);
    }
  }, [loading]);
  if (loading) return <p>Chargement...</p>;

  if (!user) {
    navigate("/login", { state: dashboard });
  }

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard2 user={user} />;
    case "STUDENT":
      return <StudentDashboard user={user} />;
    case "TEACHER":
      return <TeacherDashboard user={user} />;
    default:
      return <div>Rôle utilisateur inconnu</div>;
  }
}
