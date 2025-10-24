"use client";
import React from "react";

export default function ProgressChart({ completed, pending }: { completed: number; pending: number }) {
  const total = completed + pending || 1;
  const pct = Math.round((completed / total) * 100);

  const radius = 64;
  const stroke = 18;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const dash = (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#ff8a00" />
            <stop offset="100%" stopColor="#ff3d00" />
          </linearGradient>
        </defs>

        <circle
          stroke="#f1f1f1"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#g1)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      <div className="text-center mt-2">
        <div className="text-2xl font-semibold">{pct}%</div>
        <div className="text-xs text-gray-500">{completed} done — {pending} pending</div>
      </div>
    </div>
  );
}
