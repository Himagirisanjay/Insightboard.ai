"use client";
import { useState } from "react";

export default function TranscriptForm({ onTasks }: { onTasks: (t: any[]) => void }) {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
    const data = await res.json();
    setLoading(false);
    onTasks(data.tasks || []);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        rows={6}
        className="w-full border rounded-md p-3"
        placeholder="Paste your meeting transcript..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Generating..." : "Generate Action Items"}
      </button>
    </form>
  );
}
