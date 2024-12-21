'use client'

import { Button } from "@/components/common/button"
import { getIconByName } from "@/utils/icon-map"
import { useQuickActions } from "@/hooks/useQuickActions"

export function QuickActions() {
  const { actions, isLoading, error, handleAction } = useQuickActions()

  if (error) {
    return (
        <div className="text-red-600">
          Error: {error.message}
        </div>
    )
  }

  if (isLoading) {
    return (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
              <div
                  key={i}
                  className="h-24 animate-pulse bg-gray-200 rounded-md"
              />
          ))}
        </div>
    )
  }

  return (
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const IconComponent = getIconByName(action.iconName)
          return (
              <Button
                  key={action.id}
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => handleAction(action.id)}
              >
                {IconComponent && <IconComponent className="h-6 w-6" />}
                {action.label}
              </Button>
          )
        })}
      </div>
  )
}