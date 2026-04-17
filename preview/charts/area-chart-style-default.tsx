"use client";

// import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function ChartStyleDefault() {
    return (
        <AreaChart
            data={data}
            index="name"
            categories={["orders"]}
        />
    )
}