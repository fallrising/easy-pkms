'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/card'
import { Button } from '@/components/common/button'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteNote } from '@/lib/api'
import { EditNoteDialog } from '@/components/features/notes/edit-note-dialog'

interface NoteItemProps {
  note: {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
  }
}

export function NoteItem({ note }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note.id)
      // You might want to update the note list here
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{note.title}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex justify-between w-full">
          <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
      {isEditing && (
        <EditNoteDialog note={note} onClose={() => setIsEditing(false)} />
      )}
    </Card>
  )
}

