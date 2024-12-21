import { useState, useEffect, useCallback } from 'react'
import { Action } from '@/api/types/action'
import { ActionService } from '@/api/services/action.service'

export function useQuickActions() {
    const [actions, setActions] = useState<Action[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchActions = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await ActionService.getActions()
            setActions(data)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch actions'))
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchActions()
    }, [fetchActions])

    const handleAction = async (actionId: string) => {
        const action = actions.find(a => a.id === actionId)
        if (action) {
            console.log(`${action.label} clicked`)
            // Add any additional action handling logic here
        }
    }

    return {
        actions,
        isLoading,
        error,
        handleAction,
        refresh: fetchActions
    }
}