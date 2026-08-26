import { NextResponse } from "next/server";

import {
  extractQuestions,
  extractAnswers,
} from "@repo/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const questionPages = body.questionPages;
    const answerPages = body.answerPages;

    if (
      !Array.isArray(questionPages) ||
      questionPages.length === 0
    ) {
      return NextResponse.json(
        {
          error: "No question paper pages provided",
        },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(answerPages) ||
      answerPages.length === 0
    ) {
      return NextResponse.json(
        {
          error: "No answer sheet pages provided",
        },
        { status: 400 },
      );
    }

    const [questions, answers] =
      await Promise.all([
        extractQuestions(questionPages),
        extractAnswers(answerPages),
      ]);

    return NextResponse.json({
      questions,
      answers,
    });
  } catch (error) {
    console.error(
      "Assessment extraction failed:",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to extract assessment",
      },
      { status: 500 },
    );
  }
}