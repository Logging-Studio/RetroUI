"use client";

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [{ name: 'Jan', orders: 12, cancel: 9 }, { name: 'Feb', orders: 32, cancel: 19 }, { name: 'Mar', orders: 19, cancel: 8 }, { name: 'Apr', orders: 35, cancel: 14 }, { name: 'May', orders: 40, cancel: 12 }, { name: 'Jun', orders: 25, cancel: 5 }];

export default function ChartStyleMultiple() {
    return (
        <AreaChart
            data={data}
            index="name"
            categories={["orders", "cancel"]}
            strokeColors={["var(--foreground)", "var(--destructive)"]}
            fillColors={["var(--primary)", "var(--destructive)"]}
        />
    )
}