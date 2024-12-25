// File Path: personal-info-manager/components/features/dashboard/activity-icon.tsx
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import type { Activity } from '@/api/types/activity'

interface ActivityIconProps {
    type: Activity['type']
}

export function ActivityIcon({ type }: ActivityIconProps) {
    switch (type) {
        case 'create':
            return <PlusCircle className="h-4 w-4 text-green-500" />
        case 'update':
            return <Pencil className="h-4 w-4 text-blue-500" />
        case 'delete':
            return <Trash2 className="h-4 w-4 text-red-500" />
    }
}