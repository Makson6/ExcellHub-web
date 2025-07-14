// pages/VideoUploader.jsx
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import api from "../api/Axios";
import VideoFormUploader from "../components/VideoFormUploader";
import VideoList from "../components/VideoList";

export default function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [polling, setPolling] = useState(false);
  const [progress, setProgress] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

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
            if (prev[id] < 95) updated[id] = prev[id] + 5;
            else updated[id] = prev[id];
          }
          return updated;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [polling]);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/api/videos");
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

      if (!hasProcessing) setProgress({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !title) {
      toast.error("Sélectionne une vidéo + titre !");
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

      toast.success("Vidéo envoyée !");
      setSelectedFile(null);
      setTitle("");
      setUploadProgress(0);
      fetchVideos();
    } catch (error) {
      toast.error("Échec de l’upload");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer définitivement ?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/videos/${id}`);
      toast.success("Supprimée !");
      fetchVideos();
    } catch (error) {
      toast.error("Échec de suppression");
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-bermuda max-w-2xl mx-auto space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold">Uploader une vidéo</h1>

      <VideoFormUploader
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        title={title}
        setTitle={setTitle}
        uploadProgress={uploadProgress}
        handleUpload={handleUpload}
      />

      <h2 className="text-xl font-bold mt-6">Vidéos</h2>

      <VideoList
        videos={videos}
        progress={progress}
        handleDelete={handleDelete}
      />
    </div>
  );
}
