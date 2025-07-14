import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/Axios";

export default function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [polling, setPolling] = useState(false);
  const [progress, setProgress] = useState({}); // Encodage
  const [uploadProgress, setUploadProgress] = useState(0); // Upload côté Client

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (polling) {
      const interval = setInterval(() => {
        fetchVideos();
        setProgress((prev) => {
          const updated = {};
          for (const id in prev) {
            if (prev[id] < 95) {
              updated[id] = prev[id] + 5;
            } else {
              updated[id] = prev[id];
            }
          }
          return updated;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [polling]);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/api/videoss");
      console.log("api pour les videos", res);

      const videoList = Array.isArray(res.data) ? res.data : [];
      setVideos(videoList);

      const hasProcessing = videoList.some((v) => v.status === "processing");
      setPolling(hasProcessing);

      const newProgress = {};
      videoList.forEach((v) => {
        if (v.status === "processing") {
          newProgress[v.id] = newProgress[v.id] ?? 0;
        }
      });
      setProgress((prev) => ({ ...prev, ...newProgress }));

      if (!hasProcessing) {
        setProgress({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !title) {
      toast.error("Sélectionne une vidéo et mets un titre !");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total) {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });
      toast.success("Vidéo en cours de traitement !");
      setSelectedFile(null);
      setTitle("");
      setUploadProgress(0);
      fetchVideos();
    } catch (error) {
      toast.error("Échec de l'upload");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer définitivement cette vidéo ?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/videos/${id}`);
      toast.success("Vidéo supprimée !");
      fetchVideos();
    } catch (error) {
      toast.error("Échec de la suppression");
      console.error(error);
    }
  };

  // ------------------------------------------------------
  // Drag & Drop Logic
  // ------------------------------------------------------
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/*",
  });
  //fonction pour bin afficher la duration
  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}min ${secs}s`;
  }

  return (
    <div className="p-4 bg-bermuda max-w-2xl mx-auto space-y-6">
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold">Uploader une vidéo</h1>

      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="Titre de la vidéo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <div
          {...getRootProps()}
          className={`border-2 rounded p-4 text-center cursor-pointer ${
            isDragActive ? "bg-gray-100" : ""
          }`}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <p>{selectedFile.name}</p>
          ) : isDragActive ? (
            <p>Déposez le fichier ici...</p>
          ) : (
            <p>Glissez & Déposez une vidéo ici, ou cliquez pour sélectionner</p>
          )}
        </div>
        {uploadProgress > 0 && (
          <div>
            <div className="bg-gray-300 rounded-full h-2 w-full">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-gray-600 text-sm">
              Upload en cours... ({uploadProgress}%)
            </span>
          </div>
        )}
        <button type="submit" className="bg-blue-600 text-white rounded p-2">
          Envoyer à Mux
        </button>
      </form>

      <h2 className="text-xl font-bold">Vidéos</h2>
      <div className="space-y-4">
        {Array.isArray(videos) && videos.length > 0 ? (
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
                  {/* espace de lecture de la video */}
                  {/* <video
                    controls
                    style={{ width: "100%" }}
                    src={`https://stream.mux.com/${video.muxPlaybackId}.m3u8`}
                  /> */}
                  {/* <video
                    controls
                    className="w-full aspect-video rounded"
                    src={`https://stream.mux.com/${video.muxPlaybackId}.m3u8`}
                  /> */}
                  <MuxPlayer
                    playbackId={video.muxPlaybackId}
                    streamType="on-demand"
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
                    Encodage en cours... ({progress[video.id] || 0}%)
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
      {/* <AtreLecteurMux /> */}
    </div>
  );
}
