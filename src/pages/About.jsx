import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
          src="/fondateurVelovo.jpg"
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
          <p className="text-lg italic" style={{ color: "var(--dark-green2)" }}>
            {t("founderQuote")}
          </p>
        </div>
      </section>

      {/* Bouton Contact */}
      <div className="text-center mb-12">
        <Link to="/contacts">
          <button
            className="font-medium px-8 py-3 rounded-full shadow-lg transition duration-300"
            style={{
              backgroundColor: "var(--light-accent)",
              color: "#fff",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--light-hover-button)";
              e.currentTarget.style.color = "var(--dark-primary)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--light-accent)";
              e.currentTarget.style.color = "#fff";
            }}
          >
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
