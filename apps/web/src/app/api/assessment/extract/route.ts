import { NextResponse } from "next/server";
import { extractQuestions } from "@repo/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const pages = body.pages;

    if (!Array.isArray(pages) || pages.length === 0) {
      return NextResponse.json(
        {
          error: "No document pages provided",
        },
        { status: 400 },
      );
    }

    const questions = await extractQuestions(pages);

    return NextResponse.json({
      questions,
    });
  } catch (error) {
    console.error("Question extraction failed:", error);

    return NextResponse.json(
      {
        error: "Failed to extract questions",
      },
      { status: 500 },
    );
  }
}
