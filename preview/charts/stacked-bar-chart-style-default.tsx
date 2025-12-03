import { StackedBarChart } from "@/components/retroui/charts/StackedBarChart";

const data = [
  { name: 'Jan', sales: 12, marketing: 9, support: 5 },
  { name: 'Feb', sales: 32, marketing: 19, support: 8 },
  { name: 'Mar', sales: 19, marketing: 8, support: 12 },
  { name: 'Apr', sales: 35, marketing: 14, support: 6 },
  { name: 'May', sales: 40, marketing: 12, support: 9 },
  { name: 'Jun', sales: 25, marketing: 5, support: 15 }
];

export default function StackedBarChartStyleDefault() {
  return (
    <StackedBarChart
      data={data}
      index="name"
      categories={["sales", "marketing", "support"]}
      fillColors={["var(--primary)", "var(--secondary)", "var(--accent)"]}
    />
  )
}
