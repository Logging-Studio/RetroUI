"use client";

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [
  { date: '01', value: 120 },
  { date: '02', value: 190 },
  { date: '03', value: 300 },
  { date: '04', value: 500 },
  { date: '05', value: 280 },
  { date: '06', value: 400 }
];

export default function AreaChartStyleMinimal() {
    return (
        <AreaChart
            data={data}
            index="date"
            categories={["value"]}
            showGrid={false}
            fillColors={["var(--muted)"]}
            strokeColors={["var(--muted-foreground)"]}
            className="h-32"
        />
    )
}