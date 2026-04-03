"use client"

import { cn } from "@/lib/utils"
import React from "react"
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[]
  dataKey: string
  nameKey: string
  colors?: string[]
  tooltipBgColor?: string
  tooltipBorderColor?: string
  valueFormatter?: (value: number) => string
  showTooltip?: boolean
  innerRadius?: number
  outerRadius?: number
  className?: string
}

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data = [],
      dataKey,
      nameKey,
      colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"],
      tooltipBgColor = "var(--background)",
      tooltipBorderColor = "var(--border)",
      valueFormatter = (value: number) => value.toString(),
      showTooltip = true,
      innerRadius = 0,
      outerRadius = 100,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("h-80 w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              isAnimationActive={false}
              className="w-full h-full"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                />
              ))}
            </Pie>
            
            {showTooltip && (
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  
                  const data = payload[0]
                  
                  return (
                    <div 
                      className="border p-2 shadow"
                      style={{ 
                        backgroundColor: tooltipBgColor,
                        borderColor: tooltipBorderColor 
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {data.name}
                        </span>
                        <span className="font-bold text-foreground">
                          {valueFormatter(data.value as number)}
                        </span>
                      </div>
                    </div>
                  )
                }}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

PieChart.displayName = "PieChart"

export { PieChart, type PieChartProps }