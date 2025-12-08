import { StackedBarChart } from "@/components/retroui/charts/StackedBarChart";

const data = [
  { month: 'Jan', product_a: 45, product_b: 32, product_c: 23 },
  { month: 'Feb', product_a: 52, product_b: 41, product_c: 18 },
  { month: 'Mar', product_a: 38, product_b: 29, product_c: 31 },
  { month: 'Apr', product_a: 61, product_b: 38, product_c: 25 },
  { month: 'May', product_a: 55, product_b: 45, product_c: 20 },
  { month: 'Jun', product_a: 48, product_b: 36, product_c: 28 }
];

export default function StackedBarChartStyleNoLegend() {
    return (
        <StackedBarChart
            data={data}
            index="month"
            categories={["product_a", "product_b", "product_c"]}
            fillColors={["var(--primary)", "var(--secondary)", "var(--accent)"]}
            showLegend={false}
        />
    )
}
