import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <>
      {/* CTA */}
      <section className="border-b border-gray-700 bg-midnight  dark:from-dark-bg  dark:to-midnight text-midnight dark:text-white py-16 text-center px-4">
        <h2 className="text-3xl text-white font-bold mb-2">
          {t("readyTitle")}
        </h2>
        <p className="text-lg text-light mb-6">{t("readySubtitle")}</p>
        <Link
          to="/register"
          className="bg-white text-[var(--color-primary)] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          {t("createAccount")}
        </Link>
      </section>

      {/* Footer Base */}
      <footer className="bg-midnight text-white pt-10 pb-6 px-4 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Réseaux Sociaux */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("socialTitle")}</h3>
            <div className="flex flex-col gap-2 text-[var(--color-text-light)]">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaTiktok /> Tiktok
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaWhatsapp /> Whatsapp
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>

          {/* Produits */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-1 text-[var(--color-text-light)]">
              <li>Video Lessons</li>
              <li>Ressources </li>
              <li>Quizzes</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-1 text-[var(--color-text-light)]">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Feedback</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="flex items-center gap-2 text-[var(--color-text-light)]">
              <MdEmail />
              excellishub@example.com
            </p>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col lg:flex-row items-center justify-between text-sm text-gray-400">
          <p>© ExcellHub 2025 | All Rights Reserved</p>
          <div className="flex gap-4 mt-2 lg:mt-0">
            <Link to="/privacy" className="hover:text-[var(--color-accent)]">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[var(--color-accent)]">
              Terms
            </Link>
            <Link to="/conditions" className="hover:text-[var(--color-accent)]">
              Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
