// File Path: personal-info-manager/components/features/dashboard/stats-grid.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card"
import { useStats } from "@/hooks/useStats"
import { StatSkeleton } from "./stat-skeleton"
import { getIconByName } from "@/utils/icon-map"

export function StatsGrid() {
  const { stats, isLoading, error } = useStats()

  if (error) {
    return (
        <div className="text-red-600">
          Error: {error.message}
        </div>
    )
  }

  if (isLoading) {
    return <StatSkeleton />
  }

  return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = getIconByName(stat.iconName)
          return (
              <Card key={stat.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
          )
        })}
      </div>
  )
}