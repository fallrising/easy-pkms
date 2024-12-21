import { formatDistanceToNow } from 'date-fns'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getActivities, Activity } from '@/lib/api'

export function ActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const fetchedActivities = await getActivities()
                setActivities(fetchedActivities)
            } catch (error) {
                console.error('Failed to fetch activities:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchActivities()
    }, [])

    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'create':
                return <PlusCircle className="h-4 w-4 text-green-500" />
            case 'update':
                return <Pencil className="h-4 w-4 text-blue-500" />
            case 'delete':
                return <Trash2 className="h-4 w-4 text-red-500" />
        }
    }

    if (isLoading) {
        return <div className="text-center py-4">Loading activities...</div>
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
                            {getActivityIcon(activity.type)}
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