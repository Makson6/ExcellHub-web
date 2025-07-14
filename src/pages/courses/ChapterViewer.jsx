import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MuxPlayer from "@mux/mux-player-react";
import { useProgressStore } from "../../store/useProgressStore";
import { toast } from "react-hot-toast";
import api from "../../api/Axios";

const ChapterViewer = () => {
  const { chapterId, courseId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const markComplete = useProgressStore((s) => s.markChapterAsComplete);
  const checkCompleted = useProgressStore((s) => s.isChapterCompleted);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(
          `/api/courses/${courseId}/chapters/${chapterId}`
        );
        if (res.data.lesson) {
          setChapter(res.data.lesson);
        } else {
          console.warn("❗ Aucune leçon trouvée.");
        }
      } catch (error) {
        console.error("Erreur API :", error.message);
      } finally {
        setLoading(false);
      }
    };

    const checkStatus = async () => {
      const done = await checkCompleted(courseId, chapterId);
      setIsCompleted(done);
    };

    fetchLesson();
    checkStatus();
  }, [courseId, chapterId, checkCompleted]);

  const handleComplete = async () => {
    try {
      await api.post(`/api/lesson-progress/${chapterId}/complete`);
      markComplete(courseId, chapterId);
      setIsCompleted(true);
      toast.success("Chapitre terminé !");
    } catch (err) {
      console.error("Erreur progression:", err);
      toast.error("Erreur serveur, réessayez.");
    }
  };

  if (loading) return <p className="p-6">Chargement en cours...</p>;
  if (!chapter) return <p className="p-6">Chapitre introuvable</p>;

  const { video, content, title, resources = [] } = chapter;
  const playbackId = video?.muxPlaybackId;
  const muxReady = video?.status === "ready";

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-center font-bold mb-4">{title}</h1>

        {/* Lecture vidéo Mux */}
        <h2 className="text-xl my-5 font-semibold">Vidéo</h2>
        {playbackId ? (
          muxReady ? (
            <div className="w-full rounded-md overflow-hidden shadow-md bg-black">
              <MuxPlayer
                playbackId={playbackId}
                streamType="on-demand"
                controls
                autoPlay={false}
                muted={false}
                preload="auto"
                primaryColor="#3b82f6"
                accentColor="#78dcca"
                preferPlayback="html"
                metadata={{
                  video_title: title,
                  viewer_user_id: "user-id",
                  video_id: video?.id,
                }}
                style={{
                  aspectRatio: "16/9",
                  width: "100%",
                  maxWidth: "100%",
                  borderRadius: "8px",
                }}
              />
            </div>
          ) : (
            <p className="text-yellow-500">Vidéo en cours de traitement...</p>
          )
        ) : (
          <p className="text-red-500">Aucune vidéo disponible.</p>
        )}

        {/* Synthèse */}
        <h2 className="text-xl mt-5 mb-2 font-semibold">
          Synthèse du chapitre
        </h2>
        <div>{content || <p>Pas de contenu disponible.</p>}</div>

        {/* Ressources */}
        <h2 className="text-xl my-5 font-semibold">Ressources</h2>
        {resources.length > 0 ? (
          <div className="flex gap-3 flex-wrap my-2">
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-200 hover:bg-amber-300 cursor-pointer w-fit p-2 rounded-md px-6"
              >
                📄 {res.title || `Fichier-${idx + 1}`}
              </a>
            ))}
          </div>
        ) : (
          <p className="italic text-gray-500">Aucune ressource disponible.</p>
        )}

        {/* Bouton terminer */}
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`mt-6 px-6 py-3 rounded-lg ${
            isCompleted
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
          }`}
        >
          {isCompleted ? "✅ Déjà terminé" : "Terminer ce chapitre"}
        </button>

        {/* Lien vers quiz */}
        <div className="mt-6 text-center">
          {isCompleted ? (
            <Link
              to={`/lesson/${chapterId}/quiz`}
              className="inline-block px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Passer le Test
            </Link>
          ) : (
            <p className="text-center text-gray-400 italic mt-4">
              Terminez d'abord la leçon pour débloquer le quiz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterViewer;
