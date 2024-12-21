// src/components/features/activities/activity-feed.tsx
'use client'

import { formatDistanceToNow } from 'date-fns'
import { useActivities } from '@/hooks/useActivities'
import { ActivityIcon } from './activity-icon'

export function ActivityFeed() {
    const {
        activities,
        isLoading,
        error
    } = useActivities()

    if (error) {
        return (
            <div className="text-red-600">
                Error: {error.message}
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="text-center py-4">
                Loading activities...
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                    <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">{activity.user.name}</span>
                            <ActivityIcon type={activity.type} />
                        </div>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </span>
                    </div>
                </div>
            ))}
        </div>
    )
}