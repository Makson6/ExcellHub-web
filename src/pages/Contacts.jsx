import React, { useState } from "react";
import api from "../api/Axios"; // ton instance axios
import { toast } from "react-hot-toast";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const mail = await api.post("/api/users/message", formData);
      if (!mail) {
        console.log("pas des mail a envoyer");
      } else {
        toast.success(mail.data.message || "Email envoyé avec succès!");
        setFormData({ fullName: "", email: "", message: "" });
        console.log("message", mail.data);
        //  toast.error(mail)
      }
    } catch (error) {
      toast.error("Connectez vous a Internet");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <section className=" mt-25  lg:py-10 lg:px-6">
        {/* <section className=" mt-25 dark:bg-gray-900 lg:py-10 lg:px-6"> */}
        <div className="container px-4">
          <div className="flex flex-wrap justify-between ">
            {/* Texte de contact */}
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <h2 className="mb-6 lg:text-8xl font-semibold lg:text-[30px]  uppercase text-gray-900 dark:text-white ">
                  Prenez contact avec nous
                </h2>
                <p className="mb-9 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  Nous sommes disponibles pour répondre à toutes vos questions.
                  24H/7 N’hésitez pas à nous joindre via les moyens ci-dessous.
                </p>

                {/* Adresse */}
                <div className="mb-8 flex items-start space-x-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="lg:text-xl font-bold text-gray-900 dark:text-white">
                      Adresse
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      N° 132, Av Limete, Kinshasa, RDC
                    </p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="mb-8 flex items-start space-x-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="lg:text-xl font-bold text-gray-900 dark:text-white">
                      Téléphone
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300">
                      +243 999 000 000
                    </p>
                  </div>
                </div>
                {/* {whatsapp} */}
                <div className="mb-8 flex items-start space-x-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="lg:text-xl font-bold text-gray-900 dark:text-white">
                      <a
                        href="https://wa.me/243999095633"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contacter via WhatsApp
                      </a>
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300">
                      +243 999 000 000
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-8 flex items-start space-x-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="lg:text-xl font-bold text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a href="mailto:excellishub.com">excellishub@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="bg-white rounded-lg p-8 shadow-md dark:bg-gray-800">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Envoyez-nous un message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="votre nom complet"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre adresse email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="dite nous en quoi nous pouvons vous aider, vous servir c'est notre plaisir"
                      className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      disabled={loading}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 cursor-pointer w-full rounded-md text-white transition ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "Envoi..." : "Envoyer"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
