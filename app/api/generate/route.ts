import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an AI that extracts action items from meeting transcripts.
      Return only a JSON array of short actionable tasks. No explanations.
      
      Transcript:
      ${transcript}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    let tasks = [];
    try {
      tasks = JSON.parse(response);
    } catch {
      // If LLM returns non-JSON, fallback to simple bullet parsing
      tasks = response
        .split("\n")
        .map((line) => line.replace(/^[-*]\s*/, ""))
        .filter((line) => line.trim() !== "");
    }

    return NextResponse.json({ tasks });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
