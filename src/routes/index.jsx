import React from "react";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/security/PrivateRoutes";
// 📄 Pages générales
import Home from "../pages/Home";
import About from "../pages/auth/About";
import Contact from "../pages/Contacts";
import NotFound from "../pages/NotFound";
import Mentenance from "../pages/auth/Mentenance";

// 🔐 Auth
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import OtpVerification from "../pages/auth/OtpVerification";
import VerifyOTPpass from "../components/security/VerifyOTPpass";
import VerifyEmail from "../components/security/VerifyEmail";

// 👤 Utilisateur
import ProfilePage from "../pages/auth/ProfilePage";
import PrivacyAndSecurity from "../pages/auth/PrivacyAndSecurity";
import GeneralConditions from "../pages/auth/ConditionGenerale";
import TermsOfService from "../pages/auth/Term";

// 🎓 Cours
import Courses from "../pages/courses/Courses";
import CourseDetail from "../pages/courses/CourseDetail";
import ChapterViewer from "../pages/courses/ChapterViewer";
import CreateCourse from "../pages/courses/CreateCourse";
import EditCourse from "../pages/courses/EditCourse";
import TeacherCourseDetail from "../pages/courses/TeacherCourseDetail";
import Subscribe from "../pages/courses/Subscription";

// 🧪 Quiz
import CreateQuiz from "../pages/courses/CreateQuiz";
import LessonQuizPage from "../pages/Quizes/LessonQuizPage";

// 💳 Paiement
import PaymentSection from "../components/payments/PaymentSection";
import PaymentSuccess from "../components/payments/PymentSuccess";
import PaymentCancel from "../components/payments/PaymentCancel";

// 📊 Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import AdminDashboard from "../pages/dashboard/Admin";
import TeacherDashboard from "../pages/dashboard/Teacher";
import StudentDashboard from "../pages/dashboard/Student";

// 🛠 Admin
import AdminNewsletterEditor from "../pages/courses/AdminNewsletter";
import AdminActionsLogs from "../components/AdminActionsLogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 🌐 Public
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      // 🔐 Auth
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-otp-password", element: <OtpVerification /> },
      { path: "verify-forgot-password", element: <VerifyOTPpass /> },
      { path: "verify-user-email", element: <VerifyEmail /> },

      // ✅ Routes protégées par ProtectedRoute
      {
        path: "/dashboard/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "privacy",
        element: (
          <ProtectedRoute>
            <PrivacyAndSecurity />
          </ProtectedRoute>
        ),
      },
      {
        path: "conditions",
        element: (
          <ProtectedRoute>
            <GeneralConditions />
          </ProtectedRoute>
        ),
      },
      {
        path: "terms",
        element: (
          <ProtectedRoute>
            <TermsOfService />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId",
        element: (
          <ProtectedRoute>
            <TeacherCourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId/edit",
        element: (
          <ProtectedRoute>
            <EditCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId/chapters",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId/chapters/:chapterId",
        element: (
          <ProtectedRoute>
            <ChapterViewer />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-course",
        element: (
          <ProtectedRoute>
            <CreateCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscription",
        element: (
          <ProtectedRoute>
            <Subscribe />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-quiz",
        element: (
          <ProtectedRoute>
            <CreateQuiz />
          </ProtectedRoute>
        ),
      },
      {
        path: "lesson/:lessonId/quiz",
        element: (
          <ProtectedRoute>
            <LessonQuizPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <PaymentSection />
          </ProtectedRoute>
        ),
      },
      {
        path: "mentenance",
        element: (
          <ProtectedRoute>
            <Mentenance />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <ProtectedRoute>
            <PaymentCancel />
          </ProtectedRoute>
        ),
      },

      {
        path: "dashboard",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin",
            element: (
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "teacher",
            element: (
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "student",
            element: (
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "admin/newsletter",
        element: (
          <ProtectedRoute>
            <AdminNewsletterEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/logs",
        element: (
          <ProtectedRoute>
            <AdminActionsLogs />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ❌ Page 404
  { path: "*", element: <NotFound /> },
]);

export default router;
