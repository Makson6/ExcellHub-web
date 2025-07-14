import api from "../../api/Axios";

export const uploadVideoToMux = async (videoFile) => {
  try {
    if (!videoFile) throw new Error("Aucun fichier vidéo fourni");

    const { data } = await api.post("/api/mux/create-upload", {
      title: videoFile.name || `video-${Date.now()}`,
    });

    const { uploadUrl, videoId } = data;

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": videoFile.type || "video/mp4",
      },
      body: videoFile,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erreur Mux (status: ${response.status}) → ${text}`);
    }

    const complete = await api.post("/api/mux/complete-upload", {
      videoId,
    });

    const { muxPlaybackId: playbackId, muxUploadId } = complete.data.video;

    return {
      videoId,
      muxUploadId,
      playbackId,
    };
  } catch (err) {
    console.error("❌ Erreur upload Mux:", err);
    throw err;
  }
};
