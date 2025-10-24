"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ProgressChart({ tasks }: { tasks: any[] }) {
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.length - completed;
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];
  const COLORS = ["#10b981", "#f43f5e"];

  return (
    <div className="flex justify-center">
      <PieChart width={200} height={200}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
