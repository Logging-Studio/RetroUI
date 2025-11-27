"use client"

import { Calendar } from "@/components/retroui/Calendar"

const start = new Date()

export default function CalendarStyleDefault() {
  return (
    <div className="max-w-[350px] w-full">
        <Calendar
          numberOfMonths={1}
          mode="single"
          defaultMonth={start}
          selected={start}
        />
    </div>
  )
}