"use client";

import { PieChart } from "@/components/retroui/charts/PieChart";

const data = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 }
];

export default function PieChartStyleDonut() {
    return (
        <PieChart
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            colors={["var(--primary)", "var(--secondary)", "var(--destructive)", "var(--muted)"]}
        />
    )
}