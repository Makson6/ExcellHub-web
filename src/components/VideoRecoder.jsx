// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";

const VideoRecorder = ({ onRecordingComplete }) => {
  const [isPrepared, setIsPrepared] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [liveStream, setLiveStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorderRef = useRef(null);
  const previewRef = useRef(null);

  // 1️⃣ PRÉPARATION DE LA VIDÉO
  const prepareRecording = async (screenShare = false) => {
    try {
      const stream = screenShare
        ? await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          })
        : await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
      setLiveStream(stream);
      setIsScreenSharing(screenShare);
      setIsPrepared(true);

      if (previewRef.current) {
        previewRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Impossible de préparer l'enregistrement.");
      console.error(error);
    }
  };

  // 2️⃣ DÉMARRAGE DE L’ENREGISTREMENT
  const handleStartRecording = () => {
    if (!liveStream) {
      alert("Préparez d'abord le flux !");
      return;
    }

    setRecordedChunks([]);

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    mediaRecorderRef.current = new MediaRecorder(liveStream, {
      mimeType,
      videoBitsPerSecond: 2_500_000,
    });
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  // 3️⃣ ARRÊT DE L’ENREGISTREMENT
  const handleStopRecording = async () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    mediaRecorderRef.current.onstop = async () => {
      if (recordedChunks.length === 0) {
        alert("Aucun contenu enregistré.");
        return;
      }
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);

      if (onRecordingComplete) {
        onRecordingComplete(blob, url);
      }

      captureThumbnail(blob);
    };
    if (liveStream) {
      liveStream.getTracks().forEach((track) => track.stop());
      setLiveStream(null);
    }
  };

  // 4️⃣ GÉNÉRATION DE LA VIGNETTE
  const captureThumbnail = async (videoBlob) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoBlob);
    video.currentTime = 1;

    video.addEventListener("loadeddata", async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 360;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailData = canvas.toDataURL("image/png");
      setThumbnailUrl(thumbnailData);
    });
  };

  // 5️⃣ DOWNLOAD DE LA VIDÉO
  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "enregistrement.webm";
    a.click();
  };

  useEffect(() => {
    return () => {
      if (liveStream) {
        liveStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [liveStream]);

  return (
    <div className="bg-gray-100 rounded p-4 space-y-4">
      <h2 className="text-xl font-semibold">🎤 Enregistrement de la leçon</h2>

      <div className="flex flex-wrap gap-3">
        {!isPrepared && (
          <>
            <button
              onClick={() => prepareRecording(false)}
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              ⚡️Préparer la caméra
            </button>
            <button
              onClick={() => prepareRecording(true)}
              className="bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700"
            >
              💻Préparer le partage d'écran
            </button>
          </>
        )}
        {isPrepared && !isRecording && (
          <button
            onClick={handleStartRecording}
            className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
          >
            🎥 Démarrer l'enregistrement
          </button>
        )}
        {isRecording && (
          <button
            onClick={handleStopRecording}
            className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700"
          >
            🛑 Arrêter l'enregistrement
          </button>
        )}
      </div>

      {(isPrepared || isRecording) && (
        <div>
          <h3 className="font-bold mt-3">Prévisualisation en direct :</h3>
          <video
            ref={previewRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded mt-2"
          />
        </div>
      )}

      {videoUrl && (
        <div>
          <h3 className="font-bold mt-3">Prévisualisation de la vidéo :</h3>
          <video src={videoUrl} controls className="w-full rounded mt-2" />

          <div className="mt-3 flex gap-3">
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white rounded px-3 py-2 hover:bg-green-700"
            >
              📥 Télécharger la vidéo
            </button>
          </div>
        </div>
      )}

      {thumbnailUrl && (
        <div>
          <h3 className="font-bold mt-3">Vignette générée :</h3>
          <img
            src={thumbnailUrl}
            alt="vignette de la vidéo"
            className="rounded mt-2 w-64"
          />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
