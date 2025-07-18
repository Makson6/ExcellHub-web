// import React from "react";
// pour velovo
// const GeneralConditions = () => {
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
//         📘 Conditions Générales de Vente (CGV)
//       </h1>

//       {/* Introduction */}
//       <p className="text-lg leading-relaxed mb-6">
//         Ces conditions générales de vente régissent les relations entre les
//         utilisateurs vendeurs et acheteurs sur{" "}
//         <strong>Excell-is-Hub App</strong>.
//       </p>

//       {/* Commandes */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">🛒 Commandes</h2>
//         <p className="text-base">
//           Toute commande passée via la plateforme implique l’acceptation des
//           présentes CGV. Le vendeur est responsable de la livraison et de la
//           conformité du produit.
//         </p>
//       </section>

//       {/* Paiement */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">💳 Paiement</h2>
//         <p className="text-base">
//           Les modalités de paiement sont déterminées entre le vendeur et
//           l’acheteur. La plateforme n’intervient pas dans la transaction
//           financière, sauf mention contraire.
//         </p>
//       </section>

//       {/* Litiges */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">⚖️ Litiges</h2>
//         <p className="text-base">
//           En cas de litige, les utilisateurs sont invités à dialoguer de bonne
//           foi. Si nécessaire, un médiateur peut être saisi.
//         </p>
//       </section>

//       {/* Responsabilités */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-2">📌 Responsabilités</h2>
//         <p className="text-base">
//           La plateforme décline toute responsabilité en cas de non-respect
//           contractuel entre les parties. Elle ne garantit pas la véracité ou la
//           disponibilité des produits publiés.
//         </p>
//       </section>

//       {/* Contact */}
//       <section className="mt-12 text-center">
//         <p className="text-base italic text-gray-600 dark:text-gray-400">
//           Pour plus d'informations sur nos conditions générales, veuillez nous
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

// export default GeneralConditions;
import React from "react";
import { useTranslation } from "react-i18next";

const GeneralConditions = () => {
  const { t } = useTranslation("condition");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">{t("title")}</h1>

      <p className="text-lg leading-relaxed mb-6">{t("intro")}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("payment.title")}</h2>
        <p className="text-base">{t("payment.content")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("delivery.title")}</h2>
        <p className="text-base">{t("delivery.content")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("withdrawal.title")}</h2>
        <p className="text-base">{t("withdrawal.content")}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">{t("support.title")}</h2>
        <p className="text-base">{t("support.content")}</p>
      </section>

      <section className="mt-12 text-center">
        <p className="text-base italic text-gray-600 dark:text-gray-400">
          {t("footer.text")}
        </p>
      </section>
    </div>
  );
};

export default GeneralConditions;
