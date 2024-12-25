// File Path: personal-info-manager/hooks/useInfiniteCards.ts
// src/hooks/useInfiniteCards.ts
import { useState, useEffect, useCallback } from 'react'
import { Card, GetCardsOptions } from '@/api/types/cards'
import { CardService } from '@/api/services/card.service'

export function useInfiniteCards(options: GetCardsOptions = {}) {
    const [cards, setCards] = useState<Card[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const loadMore = useCallback(async (reset = false) => {
        if (isLoading || (!hasMore && !reset)) return

        setIsLoading(true)
        try {
            const currentPage = reset ? 1 : page
            const newCards = await CardService.getCards(currentPage, options)

            setHasMore(newCards.length === 10)
            setCards(prevCards => reset ? newCards : [...prevCards, ...newCards])
            setPage(prev => prev + 1)
        } catch (error) {
            console.error('Failed to load cards:', error)
        } finally {
            setIsLoading(false)
        }
    }, [page, options, hasMore, isLoading])

    const createCard = useCallback(async (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const newCard = await CardService.createCard(card)  // Get the complete card with all fields
            // random id generation for mock only, set it to new card id
            newCard.id = Date.now().toString()
            newCard.createdAt = new Date().toISOString()
            newCard.updatedAt = new Date().toISOString()
            // Now we can safely add it to the state since it has all required fields
            setCards(prevCards => [newCard, ...prevCards])
        } catch (error) {
            console.error('Failed to create card:', error)  // Also fixed the error message
            throw error
        }
    }, [])

    const deleteCard = useCallback(async (id: string) => {
        try {
            await CardService.deleteCard(id)
            setCards(prevCards => prevCards.filter(card => card.id !== id))
        } catch (error) {
            console.error('Failed to delete card:', error)
            throw error
        }
    }, [])

    const updateCard = useCallback(async (id: string, card: Partial<Card>) => {
        try {
            await CardService.updateCard(id, card)
            setCards(prevCards => prevCards.map(existingCard =>
                existingCard.id === id
                    ? { ...existingCard, ...card }
                    : existingCard
            ))
        } catch (error) {
            console.error('Failed to update card:', error)
            throw error
        }
    }, [])

    const reset = useCallback(() => {
        setCards([])
        setPage(1)
        setHasMore(true)
        loadMore(true)
    }, [loadMore])

    return {
        cards,
        isLoading,
        hasMore,
        loadMore,
        createCard,
        updateCard,
        deleteCard,
        reset
    }
}