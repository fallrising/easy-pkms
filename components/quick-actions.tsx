'use client'

import { Button } from "@/components/button"
import { FilePlus, FolderPlus, LinkIcon, Tags } from 'lucide-react'

const actions = [
  {
    label: "New Document",
    icon: FilePlus,
    onClick: () => console.log("New document"),
  },
  {
    label: "Add Category",
    icon: FolderPlus,
    onClick: () => console.log("Add category"),
  },
  {
    label: "Add Link",
    icon: LinkIcon,
    onClick: () => console.log("Add link"),
  },
  {
    label: "Manage Tags",
    icon: Tags,
    onClick: () => console.log("Manage tags"),
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={action.onClick}
        >
          <action.icon className="h-6 w-6" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}

