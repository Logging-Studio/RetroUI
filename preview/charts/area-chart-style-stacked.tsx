"use client";

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [
  { name: 'Jan', mobile: 20, desktop: 30, tablet: 10 },
  { name: 'Feb', mobile: 25, desktop: 35, tablet: 15 },
  { name: 'Mar', mobile: 22, desktop: 28, tablet: 12 },
  { name: 'Apr', mobile: 30, desktop: 40, tablet: 18 },
  { name: 'May', mobile: 28, desktop: 38, tablet: 16 },
  { name: 'Jun', mobile: 32, desktop: 42, tablet: 20 }
];

export default function AreaChartStyleStacked() {
    return (
        <AreaChart
            data={data}
            index="name"
            showGrid={false}
            categories={["mobile", "desktop", "tablet"]}
            strokeColors={["var(--primary)", "var(--secondary)", "var(--accent)"]}
            fillColors={["var(--primary)", "var(--secondary)", "var(--accent)"]}
            fill="solid"
        />
    )
}