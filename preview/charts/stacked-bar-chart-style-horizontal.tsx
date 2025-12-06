import { StackedBarChart } from "@/components/retroui/charts/StackedBarChart";

const data = [
  { category: 'Q1', revenue: 400, expenses: 240, profit: 160 },
  { category: 'Q2', revenue: 300, expenses: 139, profit: 161 },
  { category: 'Q3', revenue: 200, expenses: 100, profit: 100 },
  { category: 'Q4', revenue: 500, expenses: 300, profit: 200 }
];

export default function StackedBarChartStyleHorizontal() {
    return (
        <StackedBarChart
            data={data}
            index="category"
            categories={["revenue", "expenses", "profit"]}
            alignment="horizontal"
            fillColors={["var(--primary)", "var(--destructive)", "var(--accent)"]}
            className="h-96"
        />
    )
}
