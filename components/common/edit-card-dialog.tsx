'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Textarea } from '@/components/common/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select'
import { createCard, updateCard } from '@/lib/api'

interface EditCardDialogProps {
  card: {
    id: string
    title: string
    content: string
    logo: string
    status: string
  } | null
  onClose: () => void
}

export function EditCardDialog({ card, onClose }: EditCardDialogProps) {
  const [formData, setFormData] = useState(card || {
    title: '',
    content: '',
    logo: '',
    status: 'active'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (card) {
      await updateCard(card.id, formData)
    } else {
      await createCard(formData)
    }
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{card ? 'Edit Card' : 'Create Card'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <Input
            placeholder="Logo (SVG)"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          />
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">{card ? 'Update' : 'Create'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

