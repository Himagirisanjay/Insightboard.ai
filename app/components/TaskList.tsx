"use client";
import { useState } from "react";

export default function TaskList({ tasks, setTasks }: { tasks: any[], setTasks: (t: any[]) => void }) {
  function toggleStatus(index: number) {
    const updated = tasks.map((t, i) => i === index ? { ...t, status: t.status === "pending" ? "done" : "pending" } : t);
    setTasks(updated);
  }

  function deleteTask(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      {tasks.map((t, i) => (
        <div key={i} className="flex justify-between items-center border-b py-2">
          <span className={t.status === "done" ? "line-through text-gray-400" : ""}>{t.task}</span>
          <div>
            <button onClick={() => toggleStatus(i)} className="text-green-600 text-sm mr-2">
              {t.status === "done" ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTask(i)} className="text-red-500 text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
