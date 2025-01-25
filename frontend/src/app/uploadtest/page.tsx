"use client";
import { useState } from "react";

interface UploadResponse {
  message: string;
  urls?: string[]; // We'll store all uploaded files' URLs here
  error?: string;
}

export default function Upload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;

    setUploading(true);

    try {
      const formData = new FormData();

      // Append each file to the form data. The 3rd param sets the filename (including any subfolders).
      // "files" will be the field name we use in `upload.array("files")` on the server
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Use file.webkitRelativePath if you want to preserve folder structure in S3
        formData.append("files", file, file.webkitRelativePath);
      }

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();
      if (data.urls && data.urls.length > 0) {
        setUploadedUrls(data.urls);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <form
        onSubmit={handleUpload}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        {/**
         * key attributes:
         *   multiple
         *   webkitdirectory
         */}
        <input
          type="file"
          multiple
          // @ts-ignore - TS doesn't know about the webkitdirectory attribute,
          // but it's widely supported in modern browsers (Chrome, Edge, Safari).
          webkitdirectory="true"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={!files || uploading}
          className="px-4 py-2 bg-blue-500 text-black rounded disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Folder"}
        </button>
      </form>

      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-black">Uploaded successfully!</p>
          <ul>
            {uploadedUrls.map((url, idx) => (
              <li key={idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
