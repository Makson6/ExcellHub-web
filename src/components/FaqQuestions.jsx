import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import api from "../api/Axios"; // ton Axios configuré

const FaqSection = () => {
  const { t } = useTranslation("faq");
  const faqs = t("questions", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const tosatId = toast.loading("email en cours d'envoi..");
    try {
      const res = await api.post("/api/newsletter", { email });
      toast.success(res.data.message || "Inscription réussie !", {
        id: tosatId,
      });
      e.target.reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de l’inscription",
        { id: tosatId }
      );
    }
  };
  const handleToggle = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <>
      {/* FAQ Section */}
      <section className=" text-black  dark:text-white  px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t("faqTitle")}</h2>
          <p className="mt-3 text-lg text-midnight dark:text-light">
            {t("faqIntro")}
          </p>

          <div className="mt-10 space-y-4 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-midnight dark:hover:text-secondary text-black dark:text-white rounded-xl shadow-md transition overflow-hidden"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center p-5 text-left font-medium focus:outline-none dark:hover:bg-dark-bg hover:bg-gray-100 dark:hover:bg-opacity-10 transition"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-5 pb-5 text-sm text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className=" text-black  dark:text-white  py-16 px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold">{t("newsletterTitle")}</h2>
        <p className="mt-3 text-light text-lg max-w-2xl">
          {t("newsletterText")}
        </p>
        <form
          className="mt-6 w-full max-w-md flex flex-col sm:flex-row gap-3"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            name="email"
            placeholder={t("newsletterPlaceholder")}
            className="flex-1 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-1 border border-midnight dark:border-white focus:ring-accent"
            required
          />
          <button
            type="submit"
            className="bg-secondary dark:bg-midnight hover:text-white dark:hover:text-secondary dark:hover:bg-midnight/70 text-[var(--color-tahiti)] font-semibold px-6 py-3 rounded-lg  cursor-pointer transition"
          >
            {t("newsletterButton")}
          </button>
        </form>
      </section>
    </>
  );
};

export default FaqSection;
