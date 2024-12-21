import { useState, useEffect, useCallback } from 'react'
import { Stat } from '@/api/types/stat'
import { StatService } from '@/api/services/stat.service'

export function useStats() {
    const [stats, setStats] = useState<Stat[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchStats = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await StatService.getStats()
            setStats(data)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch stats'))
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    const updateStat = async (id: string, newValue: string) => {
        try {
            const updatedStat = await StatService.updateStat(id, newValue)
            setStats(prev => prev.map(stat =>
                stat.id === id ? updatedStat : stat
            ))
            return updatedStat
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to update stat')
        }
    }

    const incrementStat = async (id: string) => {
        try {
            const updatedStat = await StatService.incrementStat(id)
            setStats(prev => prev.map(stat =>
                stat.id === id ? updatedStat : stat
            ))
            return updatedStat
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to increment stat')
        }
    }

    return {
        stats,
        isLoading,
        error,
        updateStat,
        incrementStat,
        refresh: fetchStats
    }
}