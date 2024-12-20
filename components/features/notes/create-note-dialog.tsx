'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Textarea } from '@/components/common/textarea'
import { createNote } from '@/lib/api'

interface CreateNoteDialogProps {
  onClose: () => void
}

export function CreateNoteDialog({ onClose }: CreateNoteDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreate = async () => {
    await createNote({ title, content })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
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
          <Button onClick={handleCreate}>Create Note</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

