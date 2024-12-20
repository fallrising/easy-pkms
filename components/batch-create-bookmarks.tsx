'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog'
import { Button } from '@/components/button'
import { Textarea } from '@/components/textarea'
import { createBookmarks } from '@/lib/api'

interface BatchCreateBookmarksProps {
  onClose: () => void
}

export function BatchCreateBookmarks({ onClose }: BatchCreateBookmarksProps) {
  const [batchInput, setBatchInput] = useState('')

  const handleBatchCreate = async () => {
    const bookmarks = batchInput.split('\n').map(line => {
      const [title, url] = line.split(',').map(item => item.trim())
      return { title, url }
    })

    await createBookmarks(bookmarks)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Batch Create Bookmarks</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter bookmarks in the format: Title, URL (one per line)"
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            rows={10}
          />
          <Button onClick={handleBatchCreate}>Create Bookmarks</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

