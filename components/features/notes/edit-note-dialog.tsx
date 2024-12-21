'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Textarea } from '@/components/common/textarea'
import type { Note } from '@/api/types/note'

interface EditNoteDialogProps {
  note: {
    id: string
    title: string
    content: string
  }
  onClose: () => void
  onUpdate: (id: string, data: Partial<Note>) => Promise<void>
}

export function EditNoteDialog({ note, onClose, onUpdate }: EditNoteDialogProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleUpdate = async () => {
    await onUpdate(note.id, { title, content })
    onClose()
  }

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
            />
            <Button onClick={handleUpdate}>Update Note</Button>
          </div>
        </DialogContent>
      </Dialog>
  )
}