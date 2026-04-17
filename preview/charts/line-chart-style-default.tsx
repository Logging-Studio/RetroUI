"use client";

import { LineChart } from "@/components/retroui/charts/LineChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function LineChartStyleDefault() {
    return (
        <LineChart
            data={data}
            index="name"
            categories={["orders"]}
        />
    )
}