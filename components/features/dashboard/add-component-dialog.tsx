// File Path: personal-info-manager/components/features/dashboard/add-component-dialog.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/common/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/common/dialog"
import { Component } from '@/api/types/dashboard'

interface AddComponentDialogProps {
  onClose: () => void
  onAddComponent: (component: Omit<Component, 'id'> & { name: Component['name'] }) => void
}

export function AddComponentDialog({ onClose, onAddComponent }: AddComponentDialogProps) {
  const [componentType, setComponentType] = useState<Component['name'] | undefined>()

  const handleAddComponent = () => {
    if (!componentType) return

    const newComponent: Omit<Component, 'id'> & { name: Component['name'] } = {
      name: componentType,
      settings: getDefaultSettings(componentType)
    }

    onAddComponent(newComponent)
    onClose()
  }

  const getDefaultSettings = (type: Component['name']) => {
    switch (type) {
      case 'Chart':
        return {
          type: 'bar',
          title: 'New Chart',
          xAxisKey: 'category',
          showGrid: true,
          showLegend: true,
          series: [{ dataKey: 'value', name: 'Value', color: '#8884d8' }],
          data: [
            { category: 'A', value: 10 },
            { category: 'B', value: 20 },
            { category: 'C', value: 30 },
          ]
        }
      case 'Table':
        return {
          columns: ['Column 1', 'Column 2'],
          data: [
            ['Row 1, Col 1', 'Row 1, Col 2'],
            ['Row 2, Col 1', 'Row 2, Col 2'],
          ]
        }
      case 'Quote':
        return {
          text: 'Enter your quote here',
          author: 'Author Name'
        }
      case 'Image':
        return {
          src: 'https://via.placeholder.com/300',
          alt: 'Placeholder image',
          title: 'New Image'
        }
      default:
        return {}
    }
  }

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Component</DialogTitle>
            <DialogDescription>
              Choose a component type and click 'Add Component' to add it to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select onValueChange={(value) => setComponentType(value as Component['name'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select component type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chart">Chart</SelectItem>
                <SelectItem value="Table">Table</SelectItem>
                <SelectItem value="Quote">Quote</SelectItem>
                <SelectItem value="Image">Image</SelectItem>
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

