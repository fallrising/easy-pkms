'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { deleteCard, getCards, Card } from '@/lib/api'
import { ContentCard } from "@/components/common/content-card"
import { useSearchParams } from 'next/navigation'

interface CardListProps {
    searchQuery?: string | null;
    filterType?: string | null;
    filterId?: string | null;
}

export function CardList({ searchQuery, filterType, filterId }: CardListProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [ref, inView] = useInView()
    const searchParams = useSearchParams()

    // Reset when search params change
    useEffect(() => {
        setCards([])
        setPage(1)
        setHasMore(true)
        loadMore(true)
    }, [searchQuery, filterType, filterId])

    // Load more when scrolling to bottom
    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMore()
        }
    }, [inView])

    const loadMore = async (reset = false) => {
        if (isLoading || (!hasMore && !reset)) return

        setIsLoading(true)
        try {
            const currentPage = reset ? 1 : page
            const newCards = await getCards(currentPage, {
                search: searchQuery,
                type: filterType,
                id: filterId
            })

            setHasMore(newCards.length === 10) // Assuming 10 is the page size
            setCards(prevCards => reset ? newCards : [...prevCards, ...newCards])
            setPage(prev => prev + 1)
        } catch (error) {
            console.error('Failed to load cards:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (id: string) => {
        // Implement edit functionality
        console.log('Edit card:', id)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteCard(id)
            setCards(prevCards => prevCards.filter(card => card.id !== id))
        } catch (error) {
            console.error('Failed to delete card:', error)
        }
    }

    if (cards.length === 0 && !isLoading) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No cards found
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
                <ContentCard
                    key={card.id}
                    {...card}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
            {isLoading && (
                <div className="col-span-full text-center py-4">
                    Loading...
                </div>
            )}
            <div ref={ref} className="h-10" />
        </div>
    )
}