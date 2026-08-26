"use client";

import { useRef, useState } from "react";
import { isAcceptedFile, MAX_FILE_SIZE } from "@/lib/file";

interface FileDropzoneProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileDropzone({ label, file, onFileChange }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(selectedFile: File) {
    setError(null);
    if (!isAcceptedFile(selectedFile)) {
      setError("Please upload a PDF, PNG, JPEG, or WebP file.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 20 MB.");
      return;
    }
    onFileChange(selectedFile);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          background: isDragging ? "#fff8f5" : "#ffffff",
          border: `2px dashed ${isDragging ? "#e8521a" : file ? "#e8521a" : "#d9d4ce"}`,
          borderRadius: 16,
          padding: "36px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          cursor: "pointer",
          transition: "border-color 0.2s ease, background 0.2s ease",
          minHeight: 160,
          boxShadow: file
            ? "0 0 0 1px rgba(232, 82, 26, 0.15), 0 4px 20px rgba(0,0,0,0.05)"
            : "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleInputChange}
        />

        {/* Upload icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: file ? "#fff0eb" : "#f4f1ee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          {file ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10L8.5 14.5L16 6" stroke="#e8521a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13V4M10 4L7 7M10 4L13 7" stroke="#8a8480" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 14V16C4 16.6 4.4 17 5 17H15C15.6 17 16 16.6 16 16V14" stroke="#8a8480" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Label */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#2a2520", lineHeight: 1.4 }}>
            {file ? (
              <span style={{ color: "#2a2520" }}>{file.name}</span>
            ) : (
              <>
                Upload{" "}
                <span style={{ color: "#e8521a", fontWeight: 600 }}>{label}</span>
              </>
            )}
          </p>
          <p style={{ fontSize: 12, color: "#a09a94", marginTop: 2 }}>
            {file ? "Click to replace" : "Max 10MB"}
          </p>
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6 }}>{error}</p>
      )}
    </div>
  );
}