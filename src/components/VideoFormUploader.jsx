// components/VideoFormUploader.jsx
import React from "react";
import { useDropzone } from "react-dropzone";

export default function VideoFormUploader({
  selectedFile,
  setSelectedFile,
  title,
  setTitle,
  uploadProgress,
  handleUpload,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
    accept: "video/*",
  });

  return (
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
          <p>Glissez-déposez une vidéo ici ou cliquez pour sélectionner</p>
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
            Upload... ({uploadProgress}%)
          </span>
        </div>
      )}
      <button type="submit" className="bg-blue-600 text-white rounded p-2">
        Envoyer à Mux
      </button>
    </form>
  );
}
