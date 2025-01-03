// File Path: personal-info-manager/components/common/edit-card-dialog.tsx
'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/common/dialog'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Textarea } from '@/components/common/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select'
import { Card } from "@/api"

type CreateCardData = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>
interface EditCardDialogProps {
  card: {
    id: string
    title: string
    content: string
    status: string
  } | null
  onClose: () => void
  onUpdate: (id: string, card: Partial<Card>) => Promise<void>
  onCreate?: (card: CreateCardData) => Promise<void>
}

export function EditCardDialog({ card, onClose, onUpdate, onCreate }: EditCardDialogProps) {
  const [formData, setFormData] = useState(card || {
    title: '',
    content: '',
    logo: '',
    status: 'active'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (card?.id) {
        await onUpdate(card.id, formData)
      } else if (onCreate) {
        await onCreate({
          title: formData.title,
          content: formData.content,
          status: formData.status
        })
      }
      onClose()
    } catch (error) {
      console.error('Failed to save card:', error)
    }
  }

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{card ? 'Edit Card' : 'Create Card'}</DialogTitle>
            <DialogDescription>
              {card ? 'Edit the details of the card.' : 'Fill in the details to create a new card.'}
            </DialogDescription>
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