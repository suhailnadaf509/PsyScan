"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Speech Analysis", value: 45 },
  { name: "Text Analysis", value: 35 },
  { name: "Facial Analysis", value: 20 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export function AnalysisTypeDistribution() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "6px",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value}%`, "Percentage"]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

