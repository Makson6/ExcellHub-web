import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-16"
      style={{
        backgroundColor: "var(--light-background)",
        color: "var(--dark-primary)",
      }}
    >
      {/* Titre principal */}
      <h1
        className="text-5xl font-extrabold mb-8 text-center"
        style={{ color: "var(--light-primary2)" }}
      >
        {t("aboutTitle")}
      </h1>

      {/* Introduction */}
      <p
        className="text-xl mb-10 leading-relaxed text-center max-w-3xl mx-auto"
        style={{ color: "var(--dark-primary)" }}
      >
        {t("aboutIntro")}
      </p>

      <hr style={{ borderColor: "var(--light-zinc2)" }} className="my-8" />

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-3">{t("missionTitle")}</h2>
        <p className="text-lg leading-relaxed">{t("missionText")}</p>
      </section>

      {/* Vision */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-3">{t("visionTitle")}</h2>
        <p className="text-lg leading-relaxed">{t("visionText")}</p>
      </section>

      <hr style={{ borderColor: "var(--light-zinc2)" }} className="my-8" />

      {/* Fonctionnalités */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-5">{t("featuresTitle")}</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          {t("featuresList", { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <hr style={{ borderColor: "var(--light-zinc2)" }} className="my-8" />

      {/* Fondateur */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <img
          src="/ExcellHub_Founder.jpg"
          alt="Fondateur"
          className="w-44 h-44 rounded-full object-cover shadow-lg"
          style={{ border: "4px solid var(--light-accent)" }}
        />
        <div className="text-center md:text-left">
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--dark-primary)" }}
          >
            {t("founderName")}
          </h3>
          {/* Details */}
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            suscipit debitis accusamus magnam deserunt qui odit earum quidem
            rerum! Impedit blanditiis architecto quas officiis quae hic iure
            itaque quidem nemo?
          </p>
          {/* Links */}
          <div className="flex flex-wrap justify-center py-4 pt-9 md:flex-row  gap-8">
            {/* <div className="flex m-6 flex-col md:flex-row  gap-2 text-[var(--color-text-light)]"> */}
            <a
              target="_blank"
              href="mailto:elschamahmulume@gmail.com"
              className="flex items-center gap-2 hover:text-[var(--color-accent)]"
            >
              <MdEmail /> <span id="LinksTxt">Gmail</span>
            </a>
            <a
              target="_blank"
              href="https://www.tiktok.com/@makel.01?_r=1&_d=efi8bg3a42cflf&sec_uid=MS4wLjABAAAALYfkKStMTINyPkJXpcgHbD6pt6fmXNq_waZcXtElJleZ-bMyU7iuvaV7hB9v9G2u&share_author_id=6886953970134254593&sharer_language=fr&source=h5_m&u_code=ebhak6218k1dag&timestamp=1752909434&user_id=7314218466793374725&sec_user_id=MS4wLjABAAAAn3TLUG0ToY0ZXU0gJFlBjACq4AOcu6vhPrEL3V6BrIM8rqZfL3ZZn39gp8oYLZoA&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7511019560264435512&share_link_id=f258dbd3-1d64-4a0d-af09-f42392a76797&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&enable_checksum=1"
              className="flex items-center gap-2 hover:text-[var(--color-accent)]"
            >
              <FaTiktok /> <span id="LinksTxt">Tiktok</span>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/elschamah.makelele"
              className="flex items-center gap-2 hover:text-[var(--color-accent)]"
            >
              <FaFacebook /> <span id="LinksTxt">Facebook</span>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/elschamah-mulume-makelele-b87934214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="flex items-center gap-2 hover:text-[var(--color-accent)]"
            >
              <FaLinkedin /> <span id="LinksTxt">LinkedIn</span>
            </a>
          </div>
          <p className="text-lg italic" style={{ color: "var(--dark-green2)" }}>
            {t("founderQuote")}
          </p>
        </div>
      </section>

      {/* Bouton Contact */}
      <div className="text-center  mb-12">
        <Link to="/contacts">
          <button className="font-medium px-8 py-3 rounded-full hover:bg-secondary/70 cursor-pointer text-black dark:text-light shadow-lg">
            {t("contactUs")}
          </button>
        </Link>
      </div>

      {/* Remerciement */}
      <div
        className="text-center italic"
        style={{ color: "var(--dark-green2)" }}
      >
        {t("thankYou")}
      </div>
    </div>
  );
};

export default About;
