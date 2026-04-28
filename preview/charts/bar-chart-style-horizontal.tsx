"use client";

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [
  { category: 'Sales', value: 400 },
  { category: 'Marketing', value: 300 },
  { category: 'Support', value: 200 },
  { category: 'Development', value: 500 },
  { category: 'HR', value: 100 }
];

export default function BarChartStyleHorizontal() {
    return (
        <BarChart
            data={data}
            index="category"
            categories={["value"]}
            alignment="horizontal"
            fillColors={["var(--primary)"]}
            className="h-96"
        />
    )
}