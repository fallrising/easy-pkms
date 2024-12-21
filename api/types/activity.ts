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