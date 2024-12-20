'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card"
import { FileText, LinkIcon, FolderOpen, Star } from 'lucide-react'

const stats = [
  {
    label: "Total Documents",
    value: "34",
    icon: FileText,
    description: "Documents stored",
  },
  {
    label: "Quick Links",
    value: "6",
    icon: LinkIcon,
    description: "Saved shortcuts",
  },
  {
    label: "Categories",
    value: "12",
    icon: FolderOpen,
    description: "Organization system",
  },
  {
    label: "Favorites",
    value: "8",
    icon: Star,
    description: "Starred items",
  },
]

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

