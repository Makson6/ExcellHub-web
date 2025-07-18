import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqQuestions";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ApiHistory from "../api/ApiHistory";

const Home = () => {
  const { t } = useTranslation("home");
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await ApiHistory.home();
        setCourses(response.data || []);
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            "Erreur lors du chargement des cours"
        );
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center w-full  text-text dark:text-white">
        <div className=" px-3 w-full">
          {/* HERO */}
          <section className="text-center py-8 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 text-[var(--color-primary)] dark:text-[var(--color-secondary)]">
              {t("heroTitle")}
            </h1>

            <p className="mt-4 text-lg text-[var(--color-text-light)] dark:text-gray-300">
              {t("heroSubtitle")}
            </p>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <Link
                to="/courses"
                className="bg-[var(--color-primary)] text-white hover:bg-blue-700 rounded-lg px-6 py-3 font-semibold transition"
              >
                {t("discoverCourses")}
              </Link>
              <Link
                to="/register"
                className="bg-[var(--color-secondary)] text-white hover:bg-cyan-600 rounded-lg px-6 py-3 font-semibold transition"
              >
                {t("createAccount")}
              </Link>
            </div>
          </section>

          {/* COURS */}
          <h2 className="text-3xl font-bold mt-10 text-center">
            {t("featuredCourses")}
          </h2>
          {courses.length === 0 ? (
            <div className="text-center   mt-10 text-[var(--color-text-light)]">
              {t("loadingCourses")}
            </div>
          ) : (
            <section className="py-16 max-w-7xl px-4">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-slate-800 hover:scale-[1.03] transition-transform duration-300 cursor-pointer rounded-lg p-4 shadow-md hover:shadow-lg"
                  >
                    <img
                      src={
                        course.thumbnailUrl ||
                        "https://via.placeholder.com/300x150?text=Aperçu"
                      }
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-t-md"
                    />
                    <h2 className="text-xl font-bold mt-4">{course.title}</h2>
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                      {course.description}
                    </p>
                    <Link
                      to={`/courses/${course.id}/chapters`}
                      className="mt-3 inline-block text-[var(--color-primary)] hover:underline"
                    >
                      {t("courseDetails")}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* À PROPOS */}
      <div
        id="about"
        className="h-2/3 w-full py-12  flex items-center justify-center "
      >
        <section className="py-3 text-center dark:text-white px-4">
          <h2 className="text-3xl font-bold">{t("aboutTitle")}</h2>
          <p className="mt-6 max-w-2xl mx-auto cursor-pointer  text-lg text-[var(--color-text-light)] dark:text-gray-400">
            {t("aboutText")} <br />
            <Link className="text-secondary hover:underline" to="/about">
              {t("readMore")}?
            </Link>
          </p>
        </section>
      </div>

      {/* CONTACT */}
      {/* <div
        id="contact"
        className="h-2/3 w-full py-12  flex items-center justify-center "
      > */}
      <section id="contact" className=" dark:text-white py-16 text-center px-4">
        <h2 className="text-3xl font-bold">{t("contactTitle")}</h2>
        <p className="my-6 max-w-2xl mx-auto text-lg text-[var(--color-text-light)] dark:text-gray-400">
          {t("contactText")} <br />
          <Link className="text-secondary hover:underline" to="/contact">
            contact
          </Link>
        </p>
      </section>
      {/* </div> */}

      {/* FAQ + FOOTER */}
      <span id="faq">
        <FaqSection />
      </span>
      <Footer />
    </>
  );
};

export default Home;
