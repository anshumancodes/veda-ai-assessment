import {
  answerMappingSchema,
  type Answer,
  type Question,
  type AnswerMapping,
} from "./schemas/schemas";
import { gemini, GEMINI_MODEL } from "./client";

export async function mapAnswers(
  questions: Question[],
  answers: Answer[],
): Promise<AnswerMapping[]> {
  const prompt = `
You are mapping student answers to questions.

QUESTION PAPER:

${questions.map((q) => `[${q.id}] ${q.number}: ${q.text}`).join("\n")}

STUDENT ANSWERS:

${answers
  .map(
    (a) =>
      `[${a.id}] Detected question: ${
        a.detectedQuestionNumber ?? "UNKNOWN"
      }\nAnswer: ${a.text}`,
  )
  .join("\n\n")}

Rules:

1. Match each answer to the most likely question.
2. Prefer the student's explicitly written question number.
3. Use answer content as a secondary signal.
4. Never force a match when there is insufficient evidence.
5. An answer can only map to one question.
6. A question can have at most one primary answer.
7. Return questionId null for unmatched answers.
8. Confidence must be between 0 and 1.
`;

  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          mappings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                answerId: { type: "string" },
                questionId: {
                  type: ["string", "null"],
                },
                confidence: { type: "number" },
                reason: { type: "string" },
              },
              required: ["answerId", "questionId", "confidence", "reason"],
            },
          },
        },
        required: ["mappings"],
      },
    },
  });

  return answerMappingSchema.parse(JSON.parse(response.text ?? "{}")).mappings;
}
