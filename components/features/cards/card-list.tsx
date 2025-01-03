// File Path: personal-info-manager/components/common/card-list.tsx
'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteCards } from '@/hooks/useInfiniteCards'
import { ContentCard } from "@/components/features/cards/content-card"
import { EditCardDialog } from "@/components/features/cards/edit-card-dialog"
import { Card } from "@/api"

interface CardListProps {
    searchQuery?: string | null
    filterType?: string | null
    filterId?: string | null
}

export function CardList({ searchQuery, filterType, filterId }: CardListProps) {
    const { cards, isLoading, hasMore, loadMore, createCard, updateCard, deleteCard, reset } = useInfiniteCards({
        search: searchQuery,
        type: filterType,
        id: filterId
    })

    const [ref, inView] = useInView()
    const [editingCard, setEditingCard] = useState<Card | null>(null)

    // Reset when search params change
    useEffect(() => {
        reset()
    }, [searchQuery, filterType, filterId])

    // Load more when scrolling to bottom
    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMore()
        }
    }, [inView])

    const handleEdit = async (id: string, card: Partial<Card>) => {
        try {
            await updateCard(id, card)
            setEditingCard(null) // Close the dialog after successful update
        } catch (error) {
            console.error('Failed to update card:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            try {
                await deleteCard(id)
            } catch (error) {
                console.error('Failed to delete card:', error)
            }
        }
    }

    const handleEditClick = (card: Card) => {
        setEditingCard(card)
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
                    onEdit={() => handleEditClick(card)}
                    onDelete={handleDelete}
                />
            ))}
            {isLoading && (
                <div className="col-span-full text-center py-4">
                    Loading...
                </div>
            )}
            <div ref={ref} className="h-10" />
            {editingCard && (
                <EditCardDialog
                    card={editingCard}
                    onClose={() => setEditingCard(null)}
                    onUpdate={handleEdit}
                />
            )}
        </div>
    )
}