'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { updateBookmark, deleteBookmark } from '@/lib/api'

interface BookmarkItemProps {
  bookmark: {
    id: string
    title: string
    url: string
    createdAt: string
  }
}

export function BookmarkItem({ bookmark }: BookmarkItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(bookmark.title)
  const [editedUrl, setEditedUrl] = useState(bookmark.url)

  const handleUpdate = async () => {
    await updateBookmark(bookmark.id, { title: editedTitle, url: editedUrl })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      await deleteBookmark(bookmark.id)
      // You might want to update the bookmark list here
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mr-2"
            />
          ) : (
            <span>{bookmark.title}</span>
          )}
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleUpdate}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Input
            value={editedUrl}
            onChange={(e) => setEditedUrl(e.target.value)}
          />
        ) : (
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {bookmark.url}
          </a>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Created: {new Date(bookmark.createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  )
}

