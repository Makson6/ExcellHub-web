import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Courses from "../pages/courses/Courses";
import CourseDetail from "../pages/courses/CourseDetail.jsx";
import ChapterViewer from "../pages/courses/ChapterViewer";
import NotFound from "../pages/NotFound";
import CreateCourse from "../pages/courses/CreateCourse";
import EditCourse from "../pages/courses/EditCourse";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/dashboard/Student";
import About from "../pages/auth/About.jsx";
import Contact from "../pages/Contacts";
import AdminNewsletterEditor from "../pages/courses/AdminNewsletter.jsx";
import AdminActionsLogs from "../components/AdminActionsLogs.jsx";
import TeacherDashboard from "../pages/dashboard/Teacher";
import CreateQuiz from "../pages/courses/CreateQuiz";
import PaymentSection from "../components/payments/PaymentSection.jsx";
import VerifyOTPpass from "../components/security/VerifyOTPpass.jsx";
import ProfilePage from "../pages/auth/ProfilePage";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivacyAndSecurity from "../pages/auth/PrivacyAndSecurity.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Subscribe from "../pages/courses/Subscription.jsx";
import LessonQuizPage from "../pages/Quizes/LessonQuizPage.jsx";
import VerifyEmail from "../components/security/VerifyEmail.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import TeacherCourseDetail from "../pages/courses/TeacherCourseDetail.jsx";
import OtpVerification from "../pages/auth/OtpVerification.jsx";
import GeneralConditions from "../pages/auth/ConditionGenerale.jsx";
import TermsOfService from "../pages/auth/Term.jsx";
import AdminDashboard from "../pages/dashboard/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:courseId/chapters",
        element: <CourseDetail />,
      },
      {
        path: "/courses/:courseId/chapters/:chapterId",
        element: <ChapterViewer />,
      },
      {
        path: "/subscription",
        element: <Subscribe />,
      },
      {
        path: "/payment",
        element: <PaymentSection />,
      },

      {
        path: "/dashboard",
        children: [
          { path: "", element: <Dashboard /> },
          { path: "/dashboard/admin", element: <AdminDashboard /> },
          { path: "/dashboard/teacher", element: <TeacherDashboard /> },
          { path: "/dashboard/student", element: <StudentDashboard /> },
          {
            path: "/dashboard/profile",
            element: <ProfilePage />,
          },
        ],
      },

      {
        path: "/lesson/:lessonId/quiz",
        element: <LessonQuizPage />,
      },
      //Administration
      {
        path: "/admin/newsletter",
        element: <AdminNewsletterEditor />,
      },
      {
        path: "/admin/adminlogs",
        element: <AdminActionsLogs />,
      },
      //teacher
      {
        path: "/create-quiz",
        element: <CreateQuiz />,
      },
      {
        path: "/courses/:courseId",
        element: <TeacherCourseDetail />,
      },
      {
        path: "/create-course",
        element: <CreateCourse />,
      },
      {
        path: "/courses/:courseId/edit",
        element: <EditCourse />,
      },
      //OteherPages
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy",
        element: <PrivacyAndSecurity />,
      },
      {
        path: "/conditions",
        element: <GeneralConditions />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp-password",
        element: <OtpVerification />,
      },
      {
        path: "/verify-forgot-password",
        element: <VerifyOTPpass />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/verify-user-email",
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
