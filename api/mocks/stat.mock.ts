// File Path: personal-info-manager/api/mocks/stat.mock.ts
import { Stat } from '@/api'

export const mockStats: Stat[] = [
    {
        id: '1',
        label: "Total Documents",
        value: "34",
        iconName: "file-text",
        description: "Documents stored",
    },
    {
        id: '2',
        label: "Quick Links",
        value: "6",
        iconName: "link",
        description: "Saved shortcuts",
    },
    {
        id: '3',
        label: "Categories",
        value: "12",
        iconName: "folder",
        description: "Organization system",
    },
    {
        id: '4',
        label: "Favorites",
        value: "8",
        iconName: "star",
        description: "Starred items",
    }
]