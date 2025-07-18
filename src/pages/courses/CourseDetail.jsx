import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { FaStar, FaHeart } from "react-icons/fa";

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  const { courseId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // 🔄 Fetch du cours, rating, likes, etc.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await api.get(`/api/courses/${courseId}/chapters`);
        setCourse(courseRes.data.course);

        if (user) {
          const [enrollRes, ratingRes, likeRes] = await Promise.all([
            api.get(`/api/subscribe/${courseId}`),
            api.get(`/api/courses/${courseId}/reviews/stats`),
            api.get(`/api/courses/${courseId}/likes`),
          ]);

          setIsEnrolled(enrollRes?.data?.enrolled || false);
          setAverageRating(ratingRes?.data?.average || 0);
          setRatingsCount(ratingRes?.data?.count || 0);
          setUserRating(ratingRes?.data?.userRating || null);

          setLikesCount(likeRes?.data?.likes || 0);
          setUserLiked(likeRes?.data?.userLiked || false);
        }
      } catch (err) {
        console.error("Erreur :", err);
        toast.error("Erreur lors du chargement du cours");
        setUser(null);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchData();
  }, [courseId, user]);

  const handleInscription = async () => {
    setIsLoading(true);

    if (!user) {
      toast.error("Connectez-vous pour vous inscrire.");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 3000);
      return;
    }

    if (!course) return;

    if (!course.price || course.price === 0) {
      navigate("/subscription", {
        state: { courseId: course.id, courseTitle: course.title },
      });
    } else {
      navigate("/payment", {
        state: {
          price: course.price,
          courseTitle: course.title,
          courseId: course.id,
        },
      });
    }
  };

  const formatDuration = (secondsFloat) => {
    if (!secondsFloat || isNaN(secondsFloat) || secondsFloat <= 0)
      return "Non précisée";
    const totalSeconds = Math.round(secondsFloat);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours > 0 && `${hours}h`,
      minutes > 0 && `${minutes}min`,
      (seconds > 0 || (!hours && !minutes)) && `${seconds}s`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const totalDurationInSeconds = course?.lessons?.reduce((acc, lesson) => {
    const duration = parseFloat(lesson?.duration);
    return acc + (isNaN(duration) ? 0 : duration);
  }, 0);

  // ⭐ Soumettre une note
  const submitRating = async (rating) => {
    try {
      if (!user) return toast.error("Connectez-vous pour noter !");
      await api.post(`/api/courses/${course.id}/reviews`, { rating });
      toast.success("Merci pour votre note !");
      setUserRating(rating);
      // Refresh stats
      const res = await api.get(`/api/courses/${courseId}/reviews/stats`);
      setAverageRating(res.data.average);
      setRatingsCount(res.data.count);
    } catch (e) {
      toast.error("Erreur lors de l'envoi de la note");
    }
  };

  // ❤️ Gérer like
  const toggleLike = async () => {
    if (!user) return toast.error("Connectez-vous pour aimer ce cours !");
    try {
      if (!userLiked) {
        await api.post(`/api/courses/${courseId}/likes`);
        setLikesCount((prev) => prev + 1);
        setUserLiked(true);
      } else {
        await api.delete(`/api/courses/${courseId}/likes`);
        setLikesCount((prev) => prev - 1);
        setUserLiked(false);
      }
    } catch (e) {
      toast.error("Erreur lors du traitement du like");
    }
  };

  if (loading) return <div className="p-6 text-center">Chargement...</div>;
  if (!course)
    return (
      <div className="p-6 text-center text-red-500">📛 Cours introuvable.</div>
    );

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Titre + infos */}
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold mb-1">{course.title}</h1>
          <p className="text-gray-600 mb-2">{course.description}</p>

          {/* ⭐ Note moyenne */}
          <div className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-600 text-sm">
              {averageRating.toFixed(1)} / 5 ({ratingsCount} avis)
            </span>
          </div>

          {/* ❤️ Likes */}
          <div className="mt-2 flex items-center gap-2">
            <button onClick={toggleLike} className="flex items-center gap-1">
              <FaHeart
                className={`transition ${
                  userLiked ? "text-red-500" : "text-gray-400"
                }`}
              />
              <span className="text-sm text-gray-600">{likesCount} j’aime</span>
            </button>
          </div>

          <p className="text-gray-700 mt-3 font-medium">
            💰 Prix :{" "}
            <span className="text-green-600">{course.price ?? 0} $</span>
          </p>

          <p className="text-gray-700 font-medium">
            ⏱ Durée totale : {formatDuration(totalDurationInSeconds)}
          </p>

          {isEnrolled ? (
            <div className="mt-4 text-green-600 font-semibold">
              ✅ Vous êtes déjà inscrit à ce cours.
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInscription}
              className={
                isLoading
                  ? "mt-4 cursor-not-allowed bg-gray-400 text-white px-4 py-2 rounded"
                  : "mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              }
            >
              🚀 S'inscrire maintenant
            </button>
          )}
        </div>

        {/* Programme */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">📑 Programme du cours</h2>
          <ul className="space-y-4">
            {course.lessons?.map((lesson, index) => (
              <li
                key={lesson.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:shadow transition"
              >
                <div>
                  <p className="font-medium">
                    {index + 1}. {lesson.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Durée : {formatDuration(lesson.duration)}
                  </p>
                </div>
                <button
                  onClick={() =>
                    isEnrolled
                      ? navigate(`/courses/${courseId}/chapters/${lesson.id}`)
                      : toast.error("Veuillez vous inscrire pour accéder.")
                  }
                  className={`text-blue-600 cursor-pointer hover:underline ${
                    !isEnrolled ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isEnrolled ? "  Continuer →" : "Commencer →"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bloc pour noter */}
        <div className="mt-8">
          <p className="mb-2 text-gray-700 font-medium">Notez ce cours :</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <FaStar
                key={n}
                onClick={() => submitRating(n)}
                className={`cursor-pointer transition ${
                  userRating >= n ? "text-yellow-400" : "text-gray-300"
                }`}
                size={28}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
