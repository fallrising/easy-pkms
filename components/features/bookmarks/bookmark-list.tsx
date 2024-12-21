'use client'

import { BookmarkItem } from '@/components/features/bookmarks/bookmark-item'
import { Input } from '@/components/common/input'
import { useBookmarks } from '@/hooks/useBookmarks'

export function BookmarkList() {
    const {
        bookmarks,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        updateBookmark,
        deleteBookmark
    } = useBookmarks()

    const handleDelete = async (id: string) => {
        try {
            await deleteBookmark(id)
        } catch (error) {
            console.error('Failed to delete bookmark:', error)
        }
    }

    const handleUpdate = async (id: string, updatedData: { title: string; url: string }) => {
        try {
            await updateBookmark(id, updatedData)
        } catch (error) {
            console.error('Failed to update bookmark:', error)
        }
    }

    if (error) {
        return (
            <div className="text-red-600">
                Error: {error.message}
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="text-center py-4">
                Loading...
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <Input
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bookmarks.map(bookmark => (
                    <BookmarkItem
                        key={bookmark.id}
                        bookmark={bookmark}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>
        </div>
    )
}