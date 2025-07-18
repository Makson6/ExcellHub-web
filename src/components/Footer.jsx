import React from "react";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import {
  MdAttachEmail,
  MdEmail,
  MdMarkEmailUnread,
  MdMarkunreadMailbox,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

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
      <footer className="bg-midnight text-white pt-10  pb-6 px-4 lg:px-12">
        {/* Footer  Details */}
        <div className="grid grid-cols-1 lg:place-items-center sm:grid-cols-2 lg:pl-4    w-full lg:grid-cols-3 gap-6 transition duration-300 ">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className=" flex flex-col gap-1 text-[var(--color-text-light)]">
              <a href="" className="space-y-1 hover:text-[var(--color-accent)]">
                <li>Home</li>
              </a>{" "}
              <Link
                to="/dashboard/profile"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>Profile</li>
              </Link>{" "}
              <Link
                to="/dashbaord"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>Mon Espace</li>
              </Link>{" "}
              <Link
                to="/courses"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>All Courses</li>
              </Link>{" "}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className=" flex flex-col gap-1 text-[var(--color-text-light)]">
              <Link
                to="/#faq"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>FAQs</li>
              </Link>{" "}
              <Link
                to="/#about"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>About</li>
              </Link>{" "}
              <Link
                to="/contact"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>Feedback</li>
              </Link>{" "}
              <Link
                to="/#contact"
                className="space-y-1 hover:text-[var(--color-accent)]"
              >
                <li>Contact Us</li>
              </Link>{" "}
            </ul>
          </div>

          {/* Connect With Us*/}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("socialTitle")}</h3>

            {/* <h3 className="text-lg font-bold mb-4">Connect With Us</h3> */}
            <div className="flex  flex-row md:flex-col  gap-2 text-[var(--color-text-light)]">
              <a
                href="mailto:excellhub@gmail.com"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <MdEmail /> <span id="LinksTxt">Gmail</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaTiktok /> <span id="LinksTxt">Tiktok</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaFacebook /> <span id="LinksTxt">Facebook</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaWhatsapp /> <span id="LinksTxt">Whatsapp</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <FaLinkedin /> <span id="LinksTxt">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        {/* Bas de page */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col lg:flex-row items-center justify-between text-sm text-gray-400">
          <div className="hidden  lg:flex flex-row gap-10 text-xl">
            <a
              href="mailto:excellhub@gmail.com"
              className="flex items-center gap-2 hover:scale-140 hover:text-[var(--color-accent)]"
            >
              <MdEmail />{" "}
            </a>
            <a
              href="#"
              className="flex items-center hover:scale-140 gap-2 hover:text-[var(--color-accent)]"
            >
              <FaTiktok />{" "}
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:scale-140 hover:text-[var(--color-accent)]"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="flex items-center hover:scale-140 gap-2 hover:text-[var(--color-accent)]"
            >
              <FaWhatsapp />
            </a>
          </div>
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
