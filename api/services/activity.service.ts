// File Path: personal-info-manager/api/services/activity.service.ts
import { Activity } from '@/api'
import { mockActivities } from '../mocks/activity.mock'

export class ActivityService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getActivities(): Promise<Activity[]> {
        await this.delay()
        return [...mockActivities]
    }

    static async createActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
        await this.delay()
        const newActivity = {
            ...activity,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        }
        mockActivities.unshift(newActivity)
        return newActivity
    }

    static async deleteActivity(id: string): Promise<void> {
        await this.delay()
        const index = mockActivities.findIndex(activity => activity.id === id)
        if (index === -1) throw new Error('Activity not found')
        mockActivities.splice(index, 1)
    }
}