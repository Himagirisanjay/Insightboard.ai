// app/api/generate/route.ts
import { NextResponse } from "next/server";

function heuristicsExtract(transcript: string): string[] {
  if (!transcript) return [];

  const lines = transcript
    .replace(/\r/g, "")
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const sentences = lines.flatMap((l) => l.split(/(?<=[.!?])\s+/));

  const candidates = Array.from(new Set([...lines, ...sentences])).map((s) =>
    s.replace(/\s+/g, " ").trim()
  );

  const actionKeywords = [
    "action","action item","todo","follow up","assign","deadline","due","will",
    "please","need to","should","plan to","let's","we will","owner","responsible",
    "deliver","send","share","schedule","setup","email","update","review","prepare","create"
  ];

  const scored = candidates
    .map((text) => {
      const low = text.toLowerCase();
      let score = 0;
      for (const k of actionKeywords) {
        if (low.includes(k)) score += 3;
      }
      if (/^(please |send |schedule |create |prepare |share |review |update )/i.test(text)) {
        score += 2;
      }
      if (text.length < 140) score += 1;
      if (text.trim().endsWith("?")) score -= 2;
      return { text, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  let top = scored.map((s) => s.text);
  if (top.length === 0) {
    top = candidates.filter((t) => t.length > 10 && t.length < 200).slice(0, 6);
  }

  const cleaned = top
    .map((t) =>
      t
        .replace(/^[A-Z][a-z]+:\s*/g, "")
        .replace(/^(–|\-|\*|\d+\.)\s*/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .map((t) => (t.length > 160 ? t.slice(0, 157) + "..." : t));

  return Array.from(new Set(cleaned)).slice(0, 10);
}

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();
    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    const tasksText = heuristicsExtract(transcript);
    const tasks = tasksText.map((t, i) => ({
      id: i,
      task: t,
      completed: false,
    }));

    return NextResponse.json({ tasks });
  } catch (err: any) {
    console.error("Local extractor error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
