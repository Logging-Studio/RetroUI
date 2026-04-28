"use client";

import { LineChart } from "@/components/retroui/charts/LineChart";

const data = [
  { time: '00:00', cpu: 20, memory: 40 },
  { time: '04:00', cpu: 35, memory: 50 },
  { time: '08:00', cpu: 60, memory: 75 },
  { time: '12:00', cpu: 80, memory: 85 },
  { time: '16:00', cpu: 65, memory: 70 },
  { time: '20:00', cpu: 40, memory: 55 },
  { time: '24:00', cpu: 25, memory: 45 }
];

export default function LineChartStyleCurved() {
    return (
        <LineChart
            data={data}
            index="time"
            categories={["cpu", "memory"]}
            strokeColors={["var(--destructive)", "var(--warning)"]}
            strokeWidth={3}
            dotSize={6}
            valueFormatter={(value) => `${value}%`}
        />
    )
}