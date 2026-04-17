"use client";

import { LineChart } from "@/components/retroui/charts/LineChart";

const data = [
  { week: 'W1', engagement: 85 },
  { week: 'W2', engagement: 92 },
  { week: 'W3', engagement: 78 },
  { week: 'W4', engagement: 96 },
  { week: 'W5', engagement: 88 },
  { week: 'W6', engagement: 94 }
];

export default function LineChartStyleDots() {
    return (
        <LineChart
            data={data}
            index="week"
            categories={["engagement"]}
            strokeColors={["var(--primary)"]}
            strokeWidth={1}
            dotSize={8}
            showGrid={false}
            valueFormatter={(value) => `${value}%`}
        />
    )
}