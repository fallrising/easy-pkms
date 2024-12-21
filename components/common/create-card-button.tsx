'use client'

import { useState } from 'react'
import { Button } from '@/components/common/button'
import { Plus } from 'lucide-react'
import { EditCardDialog } from '@/components/common/edit-card-dialog'
import { useInfiniteCards } from '@/hooks/useInfiniteCards'
import {Card} from "@/api";

export function CreateCardButton() {
    const [isCreating, setIsCreating] = useState(false)
    const { createCard, updateCard } = useInfiniteCards()

    // Create a wrapper function that matches the expected type
    const handleCreate = async (cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => {
        await createCard(cardData)
    }

    return (
        <>
            <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Card
            </Button>
            {isCreating && (
                <EditCardDialog
                    card={null}
                    onClose={() => setIsCreating(false)}
                    onCreate={handleCreate}
                    onUpdate={updateCard}
                />
            )}
        </>
    )
}

