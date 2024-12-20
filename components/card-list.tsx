'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {deleteCard, getCards, Card} from '@/lib/api'
import {ContentCard} from "@/components/content-card";

export function CardList() {
    const [cards, setCards] = useState<Card[]>([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView])

    const loadMore = async () => {
        const newCards = await getCards(page)
        setCards((prevCards) => [...prevCards, ...newCards])
        setPage((prevPage) => prevPage + 1)
    }

    const handleEdit = (id: string) => {
        // Implement edit functionality
        console.log('Edit card:', id)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteCard(id)
            setCards((prevCards) => prevCards.filter(card => card.id !== id))
        } catch (error) {
            console.error('Failed to delete card:', error)
        }
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <ContentCard key={card.id}
                     {...card}
                     onEdit={handleEdit}
                     onDelete={handleDelete}
        />
      ))}
      <div ref={ref} className="h-10" />
    </div>
  )
}

