'use client'

import { useState, useEffect } from 'react'
import { BookmarkItem } from '@/components/bookmark-item'
import { Input } from '@/components/input'
import { getBookmarks } from '@/lib/api'

export function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchedBookmarks = await getBookmarks()
      setBookmarks(fetchedBookmarks)
    }
    fetchBookmarks()
  }, [])

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
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  )
}

