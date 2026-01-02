import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [{ name: 'Jan', orders: 12, cancel: 2 }, { name: 'Feb', orders: 32, cancel: 9 }, { name: 'Mar', orders: 19, cancel: 5 }, { name: 'Apr', orders: 35, cancel: 8 }, { name: 'May', orders: 40, cancel: 17 }, { name: 'Jun', orders: 15, cancel: 12 }];

export default function BarChartStyleStacked() {
    return (
        <BarChart
            data={data}
            index="name"
            stacked
            categories={["orders", "cancel"]}
            fillColors={["var(--primary)", "var(--destructive)"]}
        />
    )
}