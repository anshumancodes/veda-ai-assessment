"use client";

import { useState } from "react";
import { FileDropzone } from "./file-dropzone";
import Image from "next/image";
import { processDocument } from "@/lib/document";
import { Question } from "@repo/ai";

export function AssessmentUpload() {
  const [questionPaper, setQuestionPaper] = useState<File | null>(null);
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const canMap = questionPaper !== null && answerSheet !== null;
  async function handleAnalyze() {
    if (!questionPaper || !answerSheet) {
      return;
    }

    try {
      setIsProcessing(true);

      const [questionPages, answerPages] = await Promise.all([
        processDocument(questionPaper),
        processDocument(answerSheet),
      ]);

      console.log(`Question paper: ${questionPages.length} pages`);

      console.log(`Answer sheet: ${answerPages.length} pages`);

      const response = await fetch("/api/assessment/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        throw new Error("Failed to extract questions");
      }

      const result = await response.json();

      setQuestions(result.questions);
      console.log("Extracted answers:", result.answers);

      console.log("Extracted questions:", result.questions);

      console.log("Answer pages:", answerPages);
    } catch (error) {
      console.error("Failed to process assessment:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
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
            {/* Fallback SVG teacher illustration */}
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
      {questions.length > 0 && (
        <div className="mt-10 rounded-2xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">Extracted Questions</h2>

          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="rounded-lg border p-4">
                <div className="font-medium">{question.number}</div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {question.text}
                </p>

                <div className="mt-2 text-xs text-muted-foreground">
                  Page {question.page}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start Mapping button */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={!canMap || isProcessing}
          onClick={handleAnalyze}
          id="start-mapping-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 24px",
            borderRadius: 999,
            border: "none",
            background: canMap
              ? "linear-gradient(135deg, #e8521a, #ff7a45)"
              : "#d4cfc9",
            color: canMap ? "#fff" : "#8a8480",
            fontSize: 14,
            fontWeight: 600,
            cursor: canMap ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            boxShadow: canMap ? "0 4px 16px rgba(232, 82, 26, 0.35)" : "none",
            letterSpacing: "-0.01em",
          }}
        >
          {isProcessing ? "Analyzing..." : "Start Mapping"}
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
          Once both files are uploaded, you&apos;ll be able to map answers with
          questions
        </p>
      </div>

      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
