import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
//home
import homeEN from "./en/home.json";
import homeFR from "./fr/home.json";
import homeLN from "./ln/home.json";
import homeSW from "./sw/home.json";
//faq
import faqFR from "./fr/faq.json";
import faqEN from "./en/faq.json";
import faqLN from "./ln/faq.json";
import faqSW from "./sw/faq.json";
//navbar
import navbarFR from "./fr/navbar.json";
import navbarEN from "./en/navbar.json";
import navbarLN from "./ln/navbar.json";
import navbarSW from "./sw/navbar.json";
//footer
import footerFR from "./fr/footer.json";
import footerEN from "./en/footer.json";
import footerLN from "./ln/footer.json";
import footerSW from "./sw/footer.json";
//about
import aboutFR from "./fr/about.json";
import aboutEN from "./en/about.json";
import aboutLN from "./ln/about.json";
import aboutSW from "./sw/about.json";
//privacy
import privacyFR from "./fr/privacy.json";
import privacyEN from "./en/privacy.json";
import privacyLN from "./ln/privacy.json";
import privacySW from "./sw/privacy.json";
//conditiongeneral
import conditiongeneralFR from "./fr/Conditiongeneral.json";
import conditiongeneralEN from "./en/Conditiongeneral.json";
import conditiongeneralLN from "./ln/Conditiongeneral.json";
import conditiongeneralSW from "./sw/Conditiongeneral.json";
//terms
import termsFR from "./fr/terms.json";
import termsEN from "./en/terms.json";
import termsLN from "./ln/terms.json";
import termsSW from "./sw/terms.json";

const resources = {
  en: {
    home: homeEN,
    faq: faqEN,
    navbar: navbarEN,
    footer: footerEN,
    about: aboutEN,
    privacy: privacyEN,
    condition: conditiongeneralEN,
    terms: termsEN,
  },
  fr: {
    home: homeFR,
    faq: faqFR,
    navbar: navbarFR,
    footer: footerFR,
    about: aboutFR,
    privacy: privacyFR,
    condition: conditiongeneralFR,
    terms: termsFR,
  },
  ln: {
    home: homeLN,
    faq: faqLN,
    navbar: navbarLN,
    footer: footerLN,
    about: aboutLN,
    privacy: privacyLN,
    condition: conditiongeneralLN,
    terms: termsLN,
  },
  sw: {
    home: homeSW,
    faq: faqSW,
    navbar: navbarSW,
    footer: footerSW,
    about: aboutSW,
    privacy: privacySW,
    condition: conditiongeneralSW,
    terms: termsSW,
  },
};

i18n
  .use(LanguageDetector) // détecte automatiquement la langue du navigateur
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    defaultNS: "comon", // tu peux définir un namespace par défaut
    ns: [
      "comon",
      "home",
      "faq",
      "navbar",
      "footer",
      "privacy",
      "condition",
      "terms",
    ],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
