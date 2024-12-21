'use client'

import { useState } from 'react'
import { Button } from '@/components/common/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/common/dialog";

interface AddComponentDialogProps {
  onClose: () => void
}

export function AddComponentDialog({ onClose }: AddComponentDialogProps) {
  const [componentType, setComponentType] = useState<string | undefined>()

  const handleAddComponent = () => {
    // Here you would add the new component to your dashboard
    console.log(`Adding new component of type: ${componentType}`)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Component</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={setComponentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select component type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="chart">Chart</SelectItem>
              <SelectItem value="quote">Quote</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddComponent} disabled={!componentType}>
            Add Component
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

