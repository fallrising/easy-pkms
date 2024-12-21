import { Bookmark, UpdateBookmarkData } from '@/api'
import { mockBookmarks } from '../mocks/bookmark.mock'

export class BookmarkService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getBookmarks(): Promise<Bookmark[]> {
        await this.delay()
        return [...mockBookmarks]
    }

    static async createBookmarks(bookmarks: Omit<Bookmark, 'id' | 'createdAt'>[]): Promise<Bookmark[]> {
        await this.delay()
        const newBookmarks = bookmarks.map(bookmark => ({
            ...bookmark,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        }))
        mockBookmarks.push(...newBookmarks)
        return newBookmarks
    }

    static async updateBookmark(id: string, data: UpdateBookmarkData): Promise<Bookmark> {
        await this.delay()
        const index = mockBookmarks.findIndex(b => b.id === id)
        if (index === -1) throw new Error('Bookmark not found')

        mockBookmarks[index] = {
            ...mockBookmarks[index],
            ...data
        }
        return mockBookmarks[index]
    }

    static async deleteBookmark(id: string): Promise<void> {
        await this.delay()
        const index = mockBookmarks.findIndex(b => b.id === id)
        if (index === -1) throw new Error('Bookmark not found')
        mockBookmarks.splice(index, 1)
    }
}