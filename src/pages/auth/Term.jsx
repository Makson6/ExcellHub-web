// import React from "react";
// pour velovo
// const TermsOfUse = () => {
//   return (
//     <div
//       className="max-w-5xl mx-auto px-6 py-16"
//       style={{
//         backgroundColor: "var(--light-background)",
//         color: "var(--dark-primary)",
//       }}
//     >
//       <h1
//         className="text-4xl font-bold text-center mb-10"
//         style={{ color: "var(--light-primary)" }}
//       >
//         📜 Conditions d'utilisation
//       </h1>

//       <p className="text-lg leading-relaxed mb-6">
//         Bienvenue sur <strong>Excell-is-Hub App</strong>. En utilisant notre
//         plateforme, vous acceptez les conditions d'utilisation suivantes. Nous
//         vous encourageons à les lire attentivement.
//       </p>

//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">
//           1️⃣ Utilisation autorisée
//         </h2>
//         <p className="text-base">
//           Vous vous engagez à utiliser notre plateforme de manière légale et
//           respectueuse. Toute tentative de fraude, de spam ou d’usurpation
//           d’identité entraînera une suspension immédiate.
//         </p>
//       </section>

//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">2️⃣ Contenu utilisateur</h2>
//         <p className="text-base">
//           Vous êtes responsable des informations et contenus que vous publiez
//           (produits, messages, images). Veillez à ce qu’ils respectent la loi et
//           ne portent pas atteinte aux droits d’autrui.
//         </p>
//       </section>

//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">
//           3️⃣ Suspension et résiliation
//         </h2>
//         <p className="text-base">
//           Nous nous réservons le droit de suspendre ou de supprimer votre compte
//           en cas de non-respect des présentes conditions.
//         </p>
//       </section>

//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">
//           4️⃣ Modifications des conditions
//         </h2>
//         <p className="text-base">
//           Nous pouvons mettre à jour ces conditions à tout moment. Toute
//           modification sera publiée sur cette page.
//         </p>
//       </section>

//       <section className="mt-12 text-center">
//         <p className="text-base italic text-gray-600 dark:text-gray-400">
//           Si vous avez des questions concernant ces conditions, veuillez nous
//           contacter via la page{" "}
//           <a href="/contact" className="text-blue-600 hover:underline">
//             contact
//           </a>
//           .
//         </p>
//       </section>
//     </div>
//   );
// };

// export default TermsOfUse;
import React from "react";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation("terms");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">{t("title")}</h1>

      <p className="text-lg leading-relaxed mb-6">{t("intro")}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("access.title")}</h2>
        <p className="text-base">{t("access.content")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("property.title")}</h2>
        <p className="text-base">{t("property.content")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("behavior.title")}</h2>
        <p className="text-base">{t("behavior.content")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          {t("modification.title")}
        </h2>
        <p className="text-base">{t("modification.content")}</p>
      </section>

      <section className="mt-12 text-center">
        <p className="text-base italic text-gray-600 dark:text-gray-400">
          {t("footer.text")}
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
