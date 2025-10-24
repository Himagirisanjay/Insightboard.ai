"use client";
import { useState } from "react";

export default function TranscriptForm({ onTasks }: { onTasks: (t: any[]) => void }) {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!transcript.trim()) {
      setError("Please paste a transcript.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "API Error");
      }
      const data = await res.json();
      onTasks(data.tasks || []);
    } catch (err: any) {
      setError(err?.message || "Failed to generate tasks");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Paste meeting transcript</label>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={8}
        className="w-full rounded-md border p-3 text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Paste meeting transcript here..."
      />

      <div className="flex items-center justify-between">
        <div>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white font-medium shadow-sm ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Action Items"}
        </button>
      </div>
    </form>
  );
}
