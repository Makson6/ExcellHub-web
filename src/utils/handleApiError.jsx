import { toast } from "react-hot-toast";

/**
 * Gère les erreurs Axios et affiche des toasts clairs pour l'utilisateur
 * @param {object} error - L'erreur Axios
 */
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data?.error || "Requête invalide.");
        break;
      case 401:
        toast.error("Session expirée. Veuillez vous reconnecter.");
        break;
      case 403:
        toast.error("Accès refusé. Vous n’avez pas les droits.");
        break;
      case 404:
        toast("Ressource introuvable.", { icon: "🔍" });
        break;
      case 500:
        toast.error("Erreur serveur. Veuillez réessayer plus tard.");
        break;
      default:
        toast.error(data?.error || "Une erreur s’est produite.");
    }
  } else if (error.request) {
    toast.error("Aucune réponse du serveur. Vérifie ta connexion.");
  } else {
    toast.error("Erreur inconnue : " + error.message);
  }

  console.error("❌ [API ERROR] →", error);
};

export default handleApiError;
