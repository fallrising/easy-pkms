// File Path: personal-info-manager/api/mocks/bookmark.mock.ts
import { Bookmark } from '@/api'

export const mockBookmarks: Bookmark[] = [
    {
        id: '1',
        title: 'Google',
        url: 'https://www.google.com',
        createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
        id: '2',
        title: 'GitHub',
        url: 'https://github.com',
        createdAt: '2023-01-02T00:00:00.000Z',
    }
]