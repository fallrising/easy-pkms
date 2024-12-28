import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/card'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { useBookmarks } from '@/hooks/useBookmarks'

interface BookmarkItemProps {
  bookmark: {
    id: string
    title: string
    url: string
    createdAt: string
  }
  onDelete: (id: string) => void
  onUpdate: (id: string, data: { title: string; url: string }) => void
}

export function BookmarkItem({ bookmark, onDelete, onUpdate }: BookmarkItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(bookmark.title)
  const [editedUrl, setEditedUrl] = useState(bookmark.url)

  const {
    updateBookmark,
    deleteBookmark
  } = useBookmarks()

  const handleUpdate = async () => {
    const updatedData = { title: editedTitle, url: editedUrl }
    await updateBookmark(bookmark.id, updatedData)
    onUpdate(bookmark.id, updatedData)
    setIsEditing(false)
  }

  const handleDelete = async () => {
      try {
        await deleteBookmark(bookmark.id)
        onDelete(bookmark.id)
      } catch (error) {
        console.error('Failed to delete bookmark:', error)
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