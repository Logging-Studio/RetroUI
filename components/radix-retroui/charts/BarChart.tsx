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
} from "recharts"

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  stacked?: boolean
  alignment?: "vertical" | "horizontal"
  className?: string
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data = [],
      index,
      categories = [],
      strokeColors = ["var(--foreground)"],
      fillColors = ["var(--primary)", "var(--secondary)"],
      tooltipBgColor = "var(--background)",
      tooltipBorderColor = "var(--border)",
      gridColor = "var(--muted)",
      valueFormatter = (value: number) => value.toString(),
      showGrid = true,
      showTooltip = true,
      stacked = false,
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
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {index}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {label}
                          </span>
                        </div>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {entry.dataKey}
                            </span>
                            <span className="font-bold" style={{ color: strokeColors[0] }}>
                              {valueFormatter(entry.value as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }}
              />
            )}

            {categories.map((category, index) => {
              const fillColor = fillColors[index] || fillColors[0]
              const strokeColor = strokeColors[index] || strokeColors[0]

              return (
                <Bar
                  key={category}
                  dataKey={category}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={1}
                  stackId={stacked ? "strokeId" : undefined} />
              )
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

BarChart.displayName = "BarChart"

export { BarChart, type BarChartProps }