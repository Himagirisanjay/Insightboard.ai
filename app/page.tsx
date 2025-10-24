"use client";
import { useEffect, useState } from "react";
import ProgressChart from "./components/ProgressChart";
import TaskList from "./components/TaskList";
import TranscriptForm from "./components/TranscriptForm";

type Task = { id: number; task: string; completed: boolean; };

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // load saved tasks
  useEffect(() => {
    try {
      const raw = localStorage.getItem("insightboard_tasks");
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
  }, []);

  // save tasks
  useEffect(() => {
    try {
      localStorage.setItem("insightboard_tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // toggle done and reorder (completed to bottom)
  const toggleDone = (id: number) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    // sort: incomplete first
    updated.sort((a, b) => Number(a.completed) - Number(b.completed));
    setTasks(updated);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Called by TranscriptForm with tasks array (from API)
  const onGenerate = (incoming: any[]) => {
    // normalize incoming to our Task[]
    const normalized = incoming.map((t: any, i: number) => ({
      id: Date.now() + i, // unique-ish
      task: typeof t === "string" ? t : t.task || String(t),
      completed: !!t.completed,
    }));
    // place new tasks on top (incomplete first)
    const merged = [...normalized, ...tasks].slice(0, 200);
    merged.sort((a, b) => Number(a.completed) - Number(b.completed));
    setTasks(merged);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6">InsightBoard AI</h1>

        {/* Transcript form */}
        <div className="mb-6 border rounded-lg p-4 shadow-sm">
          <TranscriptForm onTasks={onGenerate} />
        </div>

        {/* Divider + generate header (visual highlight) */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="px-4 text-sm text-gray-500">Generated Action Items</div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Tasks + chart */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg p-2">
            <TaskList tasks={tasks} onToggle={toggleDone} onDelete={deleteTask} />
          </div>

          <div className="flex justify-center">
            <div className="w-56 h-56">
              <ProgressChart completed={completedCount} pending={pendingCount} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
