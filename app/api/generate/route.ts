import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { transcript } = await req.json();
  if (!transcript) {
    return NextResponse.json({ error: "Transcript missing" }, { status: 400 });
  }

  const prompt = `
Extract clear, actionable tasks from this meeting transcript. 
Return as JSON array of {"task": string, "status": "pending"}.

Transcript:
${transcript}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const result = completion.choices[0]?.message?.content || "[]";
  try {
    const tasks = JSON.parse(result);
    return NextResponse.json({ tasks });
  } catch {
    return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
  }
}
