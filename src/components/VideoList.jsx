// components/VideoList.jsx
import React from "react";

export default function VideoList({ videos, progress, handleDelete }) {
  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}min ${secs}s`;
  };

  return (
    <div className="space-y-4">
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} className="border rounded p-3 space-y-2">
            <h3 className="font-semibold">{video.title}</h3>

            {video.thumbnail && (
              <img
                src={video.thumbnail}
                alt="Thumbnail"
                className="w-full h-auto rounded"
              />
            )}

            {video.status === "ready" && video.muxPlaybackId && (
              <>
                <video
                  controls
                  className="w-full aspect-video rounded"
                  src={`https://stream.mux.com/${video.muxPlaybackId}.m3u8`}
                />
                <p className="text-sm text-gray-500">
                  Durée: {formatDuration(video.duration)}
                </p>
                <a
                  href={`https://stream.mux.com/${video.muxPlaybackId}.m3u8`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Lien direct
                </a>
              </>
            )}

            {video.status === "processing" && (
              <div>
                <div className="bg-gray-300 rounded-full h-2 w-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress[video.id] || 0}%` }}
                  />
                </div>
                <span className="text-gray-600 text-sm">
                  Encodage... ({progress[video.id] || 0}%)
                </span>
              </div>
            )}

            <div className="text-gray-600">Statut: {video.status}</div>

            <button
              className="bg-red-600 text-white rounded p-1 text-sm"
              onClick={() => handleDelete(video.id)}
            >
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <p>Aucune vidéo trouvée</p>
      )}
    </div>
  );
}
