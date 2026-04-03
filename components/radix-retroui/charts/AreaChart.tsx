"use client"

import { cn } from "@/lib/utils"
import React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  fill?: "gradient" | "solid"
  className?: string
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      data = [],
      index,
      categories = [],
      strokeColors = ["var(--foreground)"],
      fillColors = ["var(--primary)"],
      tooltipBgColor = "var(--background)",
      tooltipBorderColor = "var(--border)",
      gridColor = "var(--muted)",
      valueFormatter = (value: number) => value.toString(),
      showGrid = true,
      showTooltip = true,
      fill = "gradient",
      className,
      ...props
    },
    ref
  ) => {
    const chartId = React.useId()

    return (
      <div ref={ref} className={cn("h-80 w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {categories.map((category, index) => {
                const fillColor = fillColors[index] || fillColors[0]
                const gradientId = `gradient-${chartId}-${category}`
                return (
                  <linearGradient key={category} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    {fill === "gradient" ? (
                      <>
                        <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
                      </>
                    ) : (
                      <stop stopColor={fillColor} stopOpacity={0.6} />
                    )}
                  </linearGradient>
                )
              })}
            </defs>
            
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            )}
            
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
              const strokeColor = strokeColors[index] || strokeColors[0]
              const gradientId = `gradient-${chartId}-${category}`
              
              return (
                <Area
                  key={category}
                  dataKey={category}
                  stroke={strokeColor}
                  fill={`url(#${gradientId})`}
                  strokeWidth={2}
                />
              )
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

AreaChart.displayName = "AreaChart"

export { AreaChart, type AreaChartProps }