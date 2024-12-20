'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { updateNote } from '@/lib/api'

interface EditNoteDialogProps {
  note: {
    id: string
    title: string
    content: string
  }
  onClose: () => void
}

export function EditNoteDialog({ note, onClose }: EditNoteDialogProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleUpdate = async () => {
    await updateNote(note.id, { title, content })
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

