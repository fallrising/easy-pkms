'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { X } from 'lucide-react'
import { TableComponent } from '@/components/table-component'
import { ChartComponent } from '@/components/chart-component'
import { QuoteComponent } from '@/components/quote-component'
import { ImageComponent } from '@/components/image-component'

interface DashboardItemProps {
  component: {
    id: string
    type: 'table' | 'chart' | 'quote' | 'image'
    content: any
  }
  onRemove: () => void
}

export function DashboardItem({ component, onRemove }: DashboardItemProps) {
  const renderComponent = () => {
    switch (component.type) {
      case 'table':
        return <TableComponent data={component.content} />
      case 'chart':
        return <ChartComponent data={component.content} />
      case 'quote':
        return <QuoteComponent data={component.content} />
      case 'image':
        return <ImageComponent data={component.content} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader className="p-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">{component.type.charAt(0).toUpperCase() + component.type.slice(1)}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 overflow-auto h-[calc(100%-2rem)]">
        {renderComponent()}
      </CardContent>
    </Card>
  )
}

