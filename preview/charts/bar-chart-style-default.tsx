"use client";

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function BarChartStyleDefault() {
    return (
        <BarChart
            data={data}
            index="name"
            categories={["orders"]}
        />
    )
}