'use client'

import { useState, useEffect } from 'react'
import { BookmarkItem } from '@/components/features/bookmarks/bookmark-item'
import { Input } from '@/components/common/input'
import { getBookmarks, Bookmark } from '@/lib/api'

export function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchedBookmarks = await getBookmarks()
      setBookmarks(fetchedBookmarks)
    }
    fetchBookmarks()
  }, [])


    const handleDelete = (deletedId: string) => {
        setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.id !== deletedId))
    }

    const handleUpdate = (id: string, updatedData: { title: string; url: string }) => {
        setBookmarks(prevBookmarks => prevBookmarks.map(bookmark =>
            bookmark.id === id ? { ...bookmark, ...updatedData } : bookmark
        ))
    }

    const filteredBookmarks = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search bookmarks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookmarks.map(bookmark => (
          <BookmarkItem key={bookmark.id}
                        bookmark={bookmark}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  )
}

