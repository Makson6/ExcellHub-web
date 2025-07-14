import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import toast from "react-hot-toast";
import api from "../api/Axios";
import AdminNewsletterHistory from "../components/AdminNewsletterHistory";

const editorConfig = {
  namespace: "NewsletterEditor",
  onError: (error) => console.error("Lexical Error:", error),
  editorState: null,
};

export default function AdminNewsletterEditor() {
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await api.get("/api/newsletter");
        setSubscribers(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubscribers();
  }, []);

  const handleSendNewsletter = async () => {
    if (!subject || !htmlContent) {
      toast.error("Le sujet et le contenu sont obligatoires.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("html", htmlContent);
    if (attachment) formData.append("attachment", attachment);

    try {
      setLoading(true);
      await api.post("/api/newsletter/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Newsletter envoyée avec succès !");
      setSubject("");
      setHtmlContent("");
      setAttachment(null);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          📧 Envoyer une Newsletter
        </h2>

        {/* Sujet */}
        <input
          type="text"
          placeholder="Sujet de la newsletter"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition dark:bg-background dark:text-white"
        />

        {/* Editeur WYSIWYG */}
        <LexicalComposer initialConfig={editorConfig}>
          <div className="border border-gray-300 dark:border-gray-700 rounded p-2 min-h-[200px]  text-black dark:text-white shadow-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="min-h-[200px] outline-none p-2" />
              }
              placeholder={
                <div className="p-2 text-gray-400">
                  Contenu de votre newsletter...
                </div>
              }
            />
            <HistoryPlugin />
            <OnChangePlugin
              onChange={(editorState, editor) => {
                editorState.read(() => {
                  const html = $generateHtmlFromNodes(editor, null);
                  setHtmlContent(html);
                });
              }}
            />
          </div>
        </LexicalComposer>

        {/* Pièce jointe */}
        <div>
          <label className="font-medium block mb-2">
            📎 Ajouter une pièce jointe (facultatif)
          </label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-primary file:text-white file:cursor-pointer hover:file:bg-opacity-90 transition"
          />
          {attachment && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              ✅ Fichier sélectionné : {attachment.name}
            </p>
          )}
        </div>

        {/* Destinataires */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            📬 Destinataires ({subscribers.length})
          </h3>
          <div className="max-h-40 overflow-auto border border-gray-200 dark:border-gray-700 rounded p-3 bg-white dark:bg-background text-sm space-y-1">
            {subscribers.map((s) => (
              <div key={s.id} className="text-gray-600 dark:text-gray-300">
                {s.email}
              </div>
            ))}
          </div>
        </div>

        {/* Bouton */}
        <button
          onClick={handleSendNewsletter}
          disabled={loading}
          className="w-full md:w-auto mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition"
        >
          {loading ? "📤 Envoi en cours..." : "🚀 Envoyer la newsletter"}
        </button>

        {/* Historique */}
        <AdminNewsletterHistory />
      </div>
    </div>
  );
}
