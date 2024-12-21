import { Stat } from '@/api'
import { mockStats } from '../mocks/stat.mock'

export class StatService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getStats(): Promise<Stat[]> {
        await this.delay()
        return [...mockStats]
    }

    static async updateStat(id: string, newValue: string): Promise<Stat> {
        await this.delay()
        const index = mockStats.findIndex(stat => stat.id === id)
        if (index === -1) throw new Error('Stat not found')

        mockStats[index] = {
            ...mockStats[index],
            value: newValue
        }
        return mockStats[index]
    }

    static async incrementStat(id: string): Promise<Stat> {
        await this.delay()
        const index = mockStats.findIndex(stat => stat.id === id)
        if (index === -1) throw new Error('Stat not found')

        const currentValue = parseInt(mockStats[index].value)
        mockStats[index] = {
            ...mockStats[index],
            value: (currentValue + 1).toString()
        }
        return mockStats[index]
    }
}