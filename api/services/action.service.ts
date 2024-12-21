import { Action } from '@/api'
import { mockActions } from '../mocks/action.mock'

export class ActionService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getActions(): Promise<Action[]> {
        await this.delay()
        return [...mockActions]
    }

    static async createAction(action: Omit<Action, 'id' | 'createdAt' | 'updatedAt'>): Promise<Action> {
        await this.delay()
        const newAction = {
            ...action,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        mockActions.unshift(newAction)
        return newAction
    }

    static async updateAction(id: string, data: Partial<Action>): Promise<Action> {
        await this.delay()
        const index = mockActions.findIndex(a => a.id === id)
        if (index === -1) throw new Error('Action not found')

        mockActions[index] = {
            ...mockActions[index],
            ...data,
            updatedAt: new Date().toISOString()
        }
        return mockActions[index]
    }
}