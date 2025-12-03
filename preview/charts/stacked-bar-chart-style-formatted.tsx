import { StackedBarChart } from "@/components/retroui/charts/StackedBarChart";

const data = [
  { name: 'Mon', active: 4000, inactive: 2400, pending: 1400 },
  { name: 'Tue', active: 3000, inactive: 1398, pending: 2210 },
  { name: 'Wed', active: 2000, inactive: 9800, pending: 2290 },
  { name: 'Thu', active: 2780, inactive: 3908, pending: 2000 },
  { name: 'Fri', active: 1890, inactive: 4800, pending: 2181 },
  { name: 'Sat', active: 2390, inactive: 3800, pending: 2500 },
  { name: 'Sun', active: 3490, inactive: 4300, pending: 2100 }
];

export default function StackedBarChartStyleFormatted() {
    return (
        <StackedBarChart
            data={data}
            index="name"
            categories={["active", "inactive", "pending"]}
            fillColors={["var(--primary)", "var(--destructive)", "var(--muted)"]}
            valueFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
        />
    )
}
