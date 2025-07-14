import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PrivacyAndSecurity = () => {
  const { t } = useTranslation("privacy");

  return (
    <div
      className="max-w-5xl mx-auto px-6 py-16"
      style={{
        backgroundColor: "var(--light-background)",
        color: "var(--dark-primary)",
      }}
    >
      <h1
        className="text-4xl font-bold text-center mb-10"
        style={{ color: "var(--light-primary)" }}
      >
        🔒 {t("title")}
      </h1>

      {/* Introduction */}
      <p className="text-lg leading-relaxed mb-6">{t("intro")}</p>

      {/* Données collectées */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          {t("dataCollected.title")}
        </h2>
        <ul className="list-disc list-inside space-y-1 text-base">
          {t("dataCollected.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Utilisation des données */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("dataUsage.title")}</h2>
        <p className="text-base">{t("dataUsage.description")}</p>
        <ul className="list-disc list-inside space-y-1 text-base mt-2">
          {t("dataUsage.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Partage des données */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          {t("dataSharing.title")}
        </h2>
        <p className="text-base">{t("dataSharing.description")}</p>
      </section>

      {/* Sécurité */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("security.title")}</h2>
        <p className="text-base">{t("security.description")}</p>
      </section>

      {/* Vos droits */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("yourRights.title")}</h2>
        <p className="text-base">{t("yourRights.description")}</p>
        <ul className="list-disc list-inside mt-2 text-base space-y-1">
          {t("yourRights.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-12 text-center">
        <p className="text-base italic text-gray-600 dark:text-gray-400">
          {t("contact.text")}{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            {t("contact.link")}
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyAndSecurity;
