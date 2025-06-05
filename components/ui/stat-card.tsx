"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  icon: LucideIcon
  gradient: string
  description?: string
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  gradient,
  description,
  className,
}: StatCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-emerald-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-gray-800/50 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 min-h-[120px] flex flex-col",
        className,
      )}
    >
      <div className={cn("absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500", gradient)} />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-2000 animate-pulse" />

      <CardContent className="relative p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide truncate">{title}</p>
            {change && (
              <span className={cn("text-[11px] font-bold flex items-center gap-1 mt-0.5", getTrendColor())}>
                <span className="text-sm">{getTrendIcon()}</span>
                {change}
              </span>
            )}
          </div>
          <div className="relative flex-shrink-0 ml-2">
            <div className={cn("p-2 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", gradient)}>
              <Icon className="h-4 w-4 text-white drop-shadow-lg" />
            </div>
            <div className={cn("absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 group-hover:animate-ping", gradient)} />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-lg sm:text-xl font-bold text-white tracking-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-500">
            {value}
          </p>
          {description && (
            <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 truncate">
              {description}
            </p>
          )}
        </div>

        <div className={cn("absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 ease-out", gradient)} />
      </CardContent>
    </Card>
  )
}
