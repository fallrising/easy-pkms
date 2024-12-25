// File Path: personal-info-manager/components/layout/sidebar.tsx
"use client"

import { cn } from "@/api/utils"
import { LayoutDashboard, FileText, Calendar, Settings, Plus, Grid, Bookmark, StickyNote } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/common/button"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    label: "Cards",
    icon: FileText,
    href: "/cards",
  },
  {
    label: "Custom Dashboard",
    icon: Grid,
    href: "/custom-dashboard",
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    href: "/bookmarks",
  },
  {
    label: "Notes",
    icon: StickyNote,
    href: "/notes",
  },
  {
    label: "Editor",
    icon: StickyNote,
    href: "/editor",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-screen bg-muted/50 w-[200px]">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">PIM System</h2>
        <Button className="w-full justify-start" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-x-2 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === route.href ? "bg-accent text-accent-foreground" : ""
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

