import { Card, GetCardsOptions } from '@/api'
import { mockCards } from '../mocks/card.mock'

export class CardService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getCards(page: number, options: GetCardsOptions = {}): Promise<Card[]> {
        const { search, type, id } = options
        await this.delay()

        let filteredCards = [...mockCards]

        if (id) {
            filteredCards = filteredCards.filter(card => card.id === id)
        }

        if (search) {
            const searchLower = search.toLowerCase()
            filteredCards = filteredCards.filter(card =>
                card.title.toLowerCase().includes(searchLower) ||
                card.content.toLowerCase().includes(searchLower)
            )
        }

        if (type) {
            // Add type filtering if needed in the future
        }

        return filteredCards.slice((page - 1) * 10, page * 10)
    }

    static async createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
        await this.delay()
        const newCard: Card = {
            ...card,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        mockCards.unshift(newCard)
        return newCard
    }

    static async updateCard(id: string, card: Partial<Card>): Promise<Card> {
        await this.delay()
        const index = mockCards.findIndex(c => c.id === id)
        if (index === -1) throw new Error('Card not found')
        mockCards[index] = {
            ...mockCards[index],
            ...card,
            updatedAt: new Date().toISOString()
        }
        return mockCards[index]
    }

    static async deleteCard(id: string): Promise<void> {
        await this.delay()
        const index = mockCards.findIndex(c => c.id === id)
        if (index === -1) throw new Error('Card not found')
        mockCards.splice(index, 1)
    }
}