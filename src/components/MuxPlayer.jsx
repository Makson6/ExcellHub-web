import React from "react";
import MuxPlayer from "@mux/mux-player-react";

/**
 * Composant de lecture de vidéo Mux
 * @param {string} videoMuxId - L'ID de la vidéo Mux (ex: 615zdE7bCOSh014X2RYIvpF02lLIbRNPRi5AnglqOXwt8)
 */
const MuxVideoPlayer = ({ videoMuxId }) => {
  if (!videoMuxId) {
    return (
      <div className="p-4 rounded bg-gray-100 text-gray-600 text-center">
        ⚠️ Aucune vidéo disponible.
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg my-4">
      <MuxPlayer
        playbackId={plabaI}
        streamType="on-demand"
        controls
        autoPlay={false}
        muted={false}
        primaryColor="#3b82f6"
        style={{
          aspectRatio: "16/9",
          width: "100%",
        }}
      />
    </div>
  );
};

export default MuxVideoPlayer;
