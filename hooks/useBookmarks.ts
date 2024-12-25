// File Path: personal-info-manager/hooks/useBookmarks.ts
import { useState, useEffect, useCallback } from 'react'
import { Bookmark, UpdateBookmarkData } from '@/api/types/bookmark'
import { BookmarkService } from '@/api/services/bookmark.service'

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchBookmarks = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await BookmarkService.getBookmarks()
            setBookmarks(data)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch bookmarks'))
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBookmarks()
    }, [fetchBookmarks])

    const createBookmark = async (
        bookmarkInput: Omit<Bookmark, 'id' | 'createdAt'> | Omit<Bookmark, 'id' | 'createdAt'>[]
    ) => {
        try {
            const bookmarksToCreate = Array.isArray(bookmarkInput) ? bookmarkInput : [bookmarkInput]
            const newBookmarks = await BookmarkService.createBookmarks(bookmarksToCreate)
            setBookmarks(prev => [...newBookmarks, ...prev])
            return newBookmarks
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to create bookmarks')
        }
    }

    const updateBookmark = async (id: string, data: UpdateBookmarkData) => {
        try {
            const updatedBookmark = await BookmarkService.updateBookmark(id, data)
            setBookmarks(prev => prev.map(bookmark =>
                bookmark.id === id ? updatedBookmark : bookmark
            ))
            return updatedBookmark
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to update bookmark')
        }
    }

    const deleteBookmark = async (id: string) => {
        try {
            await BookmarkService.deleteBookmark(id)
            setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to delete bookmark')
        }
    }

    const filteredBookmarks = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return {
        bookmarks: filteredBookmarks,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        createBookmark,
        updateBookmark,
        deleteBookmark,
        refresh: fetchBookmarks
    }
}