// File Path: personal-info-manager/api/types/activity.ts
export interface Activity {
    id: string
    type: 'create' | 'update' | 'delete'
    description: string
    timestamp: string
    user: {
        name: string
        avatar: string
    }
}