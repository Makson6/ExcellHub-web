import React, { useEffect, useState } from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const POLL_INTERVAL = 5000;

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get("http://localhost:3000/api/videos");
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      videos
        .filter((v) =>
          ["processing", "waiting", "preparing"].includes(v.status)
        )
        .forEach((video) => {
          axios
            .get(`http://localhost:3000/api/videos/${video.id}/status`)
            .then((res) => {
              setVideos((prev) =>
                prev.map((v) => (v.id === video.id ? res.data.video : v))
              );
            });
        });
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [videos]);

  return (
    <div className="p-4">
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          {video.status === "ready" && (
            <MuxPlayer
              playbackId={video.muxPlaybackId}
              streamType="on-demand"
              controls
              style={{ height: "300px", width: "100%" }}
            />
          )}
          {video.status === "failed" && (
            <p className="text-red-500">Échec de l'encodage</p>
          )}
          {video.status === "errored" && (
            <p className="text-red-500">Une erreur est survenue</p>
          )}
          {["processing", "waiting", "preparing"].includes(video.status) && (
            <p>Encodage en cours... ({video.status})</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default VideoList;
