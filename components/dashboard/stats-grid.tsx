'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card"
import {useEffect, useState} from "react";
import {getStats, Stat} from "@/lib/api";
import {Skeleton} from "@/components/common/skeleton";
import {getIconByName} from "@/utils/icon-map";

export function StatsGrid() {
  const [stats, setStats] = useState<Stat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchedStats = await getStats()
        setStats(fetchedStats)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[60px]" />
                  <Skeleton className="h-4 w-[120px] mt-2" />
                </CardContent>
              </Card>
          ))}
        </div>
    )
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

