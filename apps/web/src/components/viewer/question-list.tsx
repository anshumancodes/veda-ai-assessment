"use client";

import type { Question, Answer, AnswerMapping } from "@repo/ai";

interface QuestionListProps {
  questions: Question[];
  mappings: AnswerMapping[];
  answers: Answer[];
  activeQuestionId: string | null;
  onSelect: (questionId: string) => void;
}

function confidenceColor(confidence: number): string {
  if (confidence >= 0.9) return "#16a34a"; // green
  if (confidence >= 0.75) return "#ca8a04"; // yellow
  if (confidence >= 0.5) return "#ea580c"; // orange
  return "#dc2626"; // red
}

function confidenceLabel(confidence: number): string {
  if (confidence >= 0.9) return "High";
  if (confidence >= 0.75) return "Good";
  if (confidence >= 0.5) return "Low";
  return "Weak";
}

export function QuestionList({
  questions,
  mappings,
  answers: _answers,
  activeQuestionId,
  onSelect,
}: QuestionListProps) {
  // Build a fast lookup: questionId → mapping
  const mappingByQuestion = new Map<string, AnswerMapping>();
  for (const m of mappings) {
    if (m.questionId !== null) {
      mappingByQuestion.set(m.questionId, m);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 16px 12px",
          borderBottom: "1px solid #e8e4df",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "#8a8480",
            textTransform: "uppercase",
          }}
        >
          Questions
        </p>
        <p style={{ fontSize: 13, color: "#4a4540", marginTop: 2 }}>
          {questions.length} total
        </p>
      </div>

      {/* Scrollable list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 8px",
        }}
      >
        {questions.map((question) => {
          const mapping = mappingByQuestion.get(question.id);
          const isActive = activeQuestionId === question.id;
          const hasAnswer = Boolean(mapping);

          return (
            <button
              key={question.id}
              type="button"
              id={`question-item-${question.id}`}
              onClick={() => onSelect(question.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 10,
                border: isActive
                  ? "1.5px solid rgba(232, 82, 26, 0.4)"
                  : "1.5px solid transparent",
                background: isActive ? "#fff8f5" : "transparent",
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
                marginBottom: 2,
                position: "relative",
              }}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: "60%",
                    borderRadius: "0 2px 2px 0",
                    background: "#e8521a",
                  }}
                />
              )}

              {/* Question number row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? "#e8521a" : "#2a2520",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Q{question.number}
                </span>

                {/* Status badge */}
                {hasAnswer && mapping ? (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: confidenceColor(mapping.confidence),
                      background: `${confidenceColor(mapping.confidence)}18`,
                      padding: "2px 6px",
                      borderRadius: 99,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {confidenceLabel(mapping.confidence)}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#a09a94",
                      background: "#f4f1ee",
                      padding: "2px 6px",
                      borderRadius: 99,
                    }}
                  >
                    No answer
                  </span>
                )}
              </div>

              {/* Question text */}
              <p
                style={{
                  fontSize: 12,
                  color: "#6b6560",
                  lineHeight: 1.45,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  margin: 0,
                }}
              >
                {question.text}
              </p>

              {/* Page info */}
              <p
                style={{
                  fontSize: 10,
                  color: "#a09a94",
                  marginTop: 4,
                  margin: "4px 0 0",
                }}
              >
                Page {question.page}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
