"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Mar 1", depression: 40, anxiety: 35 },
  { name: "Mar 5", depression: 38, anxiety: 32 },
  { name: "Mar 10", depression: 42, anxiety: 36 },
  { name: "Mar 15", depression: 35, anxiety: 30 },
  { name: "Mar 20", depression: 32, anxiety: 28 },
  { name: "Mar 25", depression: 34, anxiety: 32 },
  { name: "Mar 30", depression: 30, anxiety: 27 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
        <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="depression" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="anxiety" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

