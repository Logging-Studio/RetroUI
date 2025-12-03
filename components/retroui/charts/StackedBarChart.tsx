"use client"

import { cn } from "@/lib/utils"
import React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

interface StackedBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[]
  index: string
  categories: string[]
  strokeColors?: string[]
  fillColors?: string[]
  tooltipBgColor?: string
  tooltipBorderColor?: string
  gridColor?: string
  valueFormatter?: (value: number) => string
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  alignment?: "vertical" | "horizontal"
  className?: string
}

const StackedBarChart = React.forwardRef<HTMLDivElement, StackedBarChartProps>(
  (
    {
      data = [],
      index,
      categories = [],
      strokeColors = ["var(--foreground)"],
      fillColors = ["var(--primary)", "var(--secondary)", "var(--accent)"],
      tooltipBgColor = "var(--background)",
      tooltipBorderColor = "var(--border)",
      gridColor = "var(--muted)",
      valueFormatter = (value: number) => value.toString(),
      showGrid = true,
      showTooltip = true,
      showLegend = true,
      alignment = "vertical",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("h-80 w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            layout={alignment === "horizontal" ? "vertical" : undefined}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            )}

            {alignment === "horizontal" ? (
              <>
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                  tickFormatter={valueFormatter}
                />

                <YAxis
                  type="category"
                  dataKey={index}
                  axisLine={false}
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                  width={80}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={index}
                  axisLine={false}
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text-xs fill-muted-foreground"
                  tickFormatter={valueFormatter}
                />
              </>
            )}

            {showTooltip && (
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null

                  return (
                    <div
                      className="border p-2 shadow"
                      style={{
                        backgroundColor: tooltipBgColor,
                        borderColor: tooltipBorderColor
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {index}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {label}
                          </span>
                        </div>
                        <div className="grid gap-1">
                          {payload.map((entry, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: entry.fill }}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {entry.dataKey}
                                </span>
                              </div>
                              <span className="text-xs font-bold">
                                {valueFormatter(entry.value as number)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
            )}

            {showLegend && (
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                iconSize={8}
              />
            )}

            {categories.map((category, index) => {
              const fillColor = fillColors[index % fillColors.length]
              const strokeColor = strokeColors[index % strokeColors.length] || strokeColors[0]

              return (
                <Bar
                  key={category}
                  dataKey={category}
                  stackId="stack"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={1}
                />
              )
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

StackedBarChart.displayName = "StackedBarChart"

export { StackedBarChart, type StackedBarChartProps }
