import { Activity } from '@/api'

export const mockActivities: Activity[] = [
    {
        id: '1',
        type: 'create',
        description: 'Created a new bookmark for "React Documentation"',
        timestamp: '2024-03-21T10:30:00.000Z',
        user: {
            name: 'John Doe',
            avatar: '/api/placeholder/32/32'
        }
    },
    {
        id: '2',
        type: 'update',
        description: 'Updated bookmark title for "TypeScript Handbook"',
        timestamp: '2024-03-21T09:15:00.000Z',
        user: {
            name: 'Jane Smith',
            avatar: '/api/placeholder/32/32'
        }
    },
    {
        id: '3',
        type: 'delete',
        description: 'Removed bookmark "Old Tutorial"',
        timestamp: '2024-03-20T16:45:00.000Z',
        user: {
            name: 'Mike Johnson',
            avatar: '/api/placeholder/32/32'
        }
    }
]