"use client";

import { PieChart } from "@/components/retroui/charts/PieChart";

const data = [
  { browser: 'Chrome', users: 65 },
  { browser: 'Firefox', users: 25 },
  { browser: 'Safari', users: 8 },
  { browser: 'Edge', users: 2 }
];

export default function PieChartStyleSmall() {
    return (
        <PieChart
            data={data}
            dataKey="users"
            nameKey="browser"
            outerRadius={60}
            colors={["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]}
            valueFormatter={(value) => `${value}%`}
            className="h-60"
        />
    )
}