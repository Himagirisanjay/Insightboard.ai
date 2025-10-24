"use client";
import { useState } from "react";
import TranscriptForm from "./components/TranscriptForm";
import TaskList from "./components/TaskList";
import ProgressChart from "./components/ProgressChart";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">InsightBoard AI</h1>
      <TranscriptForm onTasks={setTasks} />
      {tasks.length > 0 && (
        <>
          <ProgressChart tasks={tasks} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </>
      )}
    </main>
  );
}
