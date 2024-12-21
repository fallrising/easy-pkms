// src/hooks/useActivities.ts
import { useState, useEffect, useCallback } from 'react'
import { Activity } from '@/api/types/activity'
import { ActivityService } from '@/api/services/activity.service'

export function useActivities() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchActivities = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await ActivityService.getActivities()
            setActivities(data)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch activities'))
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchActivities()
    }, [fetchActivities])

    const createActivity = async (activity: Omit<Activity, 'id' | 'timestamp'>) => {
        try {
            const newActivity = await ActivityService.createActivity(activity)
            setActivities(prev => [newActivity, ...prev])
            return newActivity
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to create activity')
        }
    }

    const deleteActivity = async (id: string) => {
        try {
            await ActivityService.deleteActivity(id)
            setActivities(prev => prev.filter(activity => activity.id !== id))
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to delete activity')
        }
    }

    return {
        activities,
        isLoading,
        error,
        createActivity,
        deleteActivity,
        refresh: fetchActivities
    }
}