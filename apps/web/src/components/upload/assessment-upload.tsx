"use client";

import { useState } from "react";
import { FileDropzone } from "./file-dropzone";
import Image from "next/image";
import { processDocument } from "@/lib/document";
import type { Question, Answer, AnswerMapping } from "@repo/ai";
import type { DocumentPage } from "@repo/types/types";
import { AssessmentViewer } from "@/components/viewer/assessment-viewer";
import { TopNav } from "@/components/layout/top-nav";


// idle → processing → viewer
//          ↑____________↓  (back button resets to idle)

type Phase = "idle" | "processing" | "viewer";

interface ExtractionResult {
  questions: Question[];
  answers: Answer[];
  mappings: AnswerMapping[];
  answerPages: DocumentPage[];
}



export function AssessmentUpload() {
  const [phase, setPhase] = useState<Phase>("idle");

  const [questionPaper, setQuestionPaper] = useState<File | null>(null);
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);

  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canAnalyze = questionPaper !== null && answerSheet !== null;

  async function handleAnalyze() {
    if (!questionPaper || !answerSheet) return;

    setErrorMsg(null);
    setPhase("processing");

    try {
      // Render both documents to page images in the browser
      const [questionPages, answerPages] = await Promise.all([
        processDocument(questionPaper),
        processDocument(answerSheet),
      ]);

      // Send base64-encoded page images to the API
      const response = await fetch("/api/assessment/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionPages: questionPages.map((page) => ({
            page: page.pageNumber,
            mimeType: "image/png",
            data: page.dataUrl.split(",")[1],
          })),
          answerPages: answerPages.map((page) => ({
            page: page.pageNumber,
            mimeType: "image/png",
            data: page.dataUrl.split(",")[1],
          })),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to extract assessment");
      }

      const data = await response.json();

      setResult({
        questions: data.questions,
        answers: data.answers,
        mappings: data.mappings,
        answerPages, // reuse already-rendered images, no second PDF decode
      });

      setPhase("viewer");
    } catch (error) {
      console.error("Assessment processing failed:", error);
      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong.",
      );
      setPhase("idle");
    }
  }

  function handleBack() {
    setPhase("idle");
    setResult(null);
    setErrorMsg(null);
  }

  // viewer phase
  if (phase === "viewer" && result) {
    return (
      <AssessmentViewer
        questions={result.questions}
        answers={result.answers}
        mappings={result.mappings}
        answerPages={result.answerPages}
        onBack={handleBack}
      />
    );
  }

  //Upload / processing phase 
  return (
    <main className="min-h-screen bg-background">
      <TopNav />

      <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-4xl flex-col items-center justify-center px-6 py-12">
        <div className="mb-8 max-w-2xl text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Upload{" "}
            <span
              style={{
                color: "#e8521a",
                backgroundColor: "#fff0eb",
                padding: "0 8px 3px",
                borderRadius: "6px",
              }}
            >
              Question Paper &amp; Answer Sheets
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload both files to get started
          </p>
        </div>

        <div className="w-full max-w-3xl">
          {/* Mascot */}
          <div className="mb-8 flex justify-center">
            <div
              style={{
                position: "relative",
                width: 96,
                height: 96,
              }}
            >
              {/* Outer glow rings */}
              <div
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(232, 82, 26, 0.15)",
                  animation: "ping-slow 3s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(232, 82, 26, 0.25)",
                }}
              />
              {/* Dot accents */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#e8521a",
                    opacity: 0.6,
                    transform: `rotate(${deg}deg) translateX(54px) translateY(-50%)`,
                  }}
                />
              ))}
              {/* Avatar circle */}
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #fde4d5 0%, #ffc4a0 100%)",
                  border: "3px solid #fff",
                  boxShadow: "0 4px 24px rgba(232, 82, 26, 0.2)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Image
                  src="/ved.jpeg"
                  alt="Teacher mascot"
                  width={96}
                  height={96}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* Upload cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <FileDropzone
              label="Question Paper"
              file={questionPaper}
              onFileChange={setQuestionPaper}
            />
            <FileDropzone
              label="Answer Sheet"
              file={answerSheet}
              onFileChange={setAnswerSheet}
            />
          </div>

          {/* Error message */}
          {errorMsg && (
            <div
              style={{
                marginBottom: 16,
                padding: "10px 14px",
                borderRadius: 10,
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: 13,
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Processing overlay card */}
          {phase === "processing" && (
            <div
              style={{
                marginBottom: 20,
                padding: "14px 18px",
                borderRadius: 12,
                background: "#fff8f5",
                border: "1.5px solid rgba(232, 82, 26, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <SpinnerIcon />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#2a2520" }}>
                  Analyzing your documents…
                </p>
                <p style={{ fontSize: 12, color: "#8a8480", marginTop: 2 }}>
                  Extracting questions, answers, and mapping relationships
                </p>
              </div>
            </div>
          )}

          {/* Start Mapping button */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              id="start-mapping-btn"
              disabled={!canAnalyze || phase === "processing"}
              onClick={handleAnalyze}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                borderRadius: 999,
                border: "none",
                background:
                  canAnalyze && phase === "idle"
                    ? "linear-gradient(135deg, #e8521a, #ff7a45)"
                    : "#d4cfc9",
                color: canAnalyze && phase === "idle" ? "#fff" : "#8a8480",
                fontSize: 14,
                fontWeight: 600,
                cursor: canAnalyze && phase === "idle" ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                boxShadow:
                  canAnalyze && phase === "idle"
                    ? "0 4px 16px rgba(232, 82, 26, 0.35)"
                    : "none",
                letterSpacing: "-0.01em",
              }}
            >
              {phase === "processing" ? "Analyzing…" : "Start Mapping"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p
              style={{
                fontSize: 12,
                color: "#a09a94",
                textAlign: "center",
              }}
            >
              Once both files are uploaded, you&apos;ll be able to map answers
              with questions
            </p>
          </div>

          <style>{`
            @keyframes ping-slow {
              0%   { transform: scale(1);    opacity: 0.8; }
              50%  { transform: scale(1.15); opacity: 0.4; }
              100% { transform: scale(1);    opacity: 0.8; }
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </section>
    </main>
  );
}

// inline spinner icon 

function SpinnerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: "spin 0.8s linear infinite",
        flexShrink: 0,
        color: "#e8521a",
      }}
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M10 2a8 8 0 0 1 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
