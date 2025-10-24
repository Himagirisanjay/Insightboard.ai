"use client";
import React from "react";

type Task = { id: number; task: string; completed: boolean; };

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  if (!tasks || tasks.length === 0) {
    return <div className="p-6 text-center text-gray-500">No tasks yet — generate from a transcript.</div>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((t) => (
        <li
          key={t.id}
          className="flex items-start gap-4 p-3 border rounded-md shadow-sm"
        >
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => onToggle(t.id)}
            className="mt-1 h-4 w-4"
          />
          <div className="flex-1">
            <div className={`text-sm leading-relaxed ${t.completed ? "line-through text-gray-400" : ""}`}>
              {t.task}
            </div>
          </div>

          <div className="pl-4">
            <button
              onClick={() => onDelete(t.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
