'use client'

import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { DashboardItem } from '@/components/dashboard/dashboard-item'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardComponent {
  id: string
  type: 'table' | 'chart' | 'quote' | 'image'
  content: any
}

const initialLayout = [
  { i: '1', x: 0, y: 0, w: 6, h: 2 },
  { i: '2', x: 6, y: 0, w: 6, h: 2 },
  { i: '3', x: 0, y: 2, w: 12, h: 2 },
]

const initialComponents: DashboardComponent[] = [
  { id: '1', type: 'table', content: { /* table data */ } },
  { id: '2', type: 'chart', content: { /* chart data */ } },
  { id: '3', type: 'quote', content: { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" } },
]

export function DashboardGrid() {
  const [layout, setLayout] = useState(initialLayout)
  const [components, setComponents] = useState(initialComponents)

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout)
  }

  const onRemoveItem = (id: string) => {
    setComponents(components.filter(component => component.id !== id))
    setLayout(layout.filter(item => item.i !== id))
  }

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      onLayoutChange={onLayoutChange}
    >
      {components.map(component => (
        <div key={component.id}>
          <DashboardItem
            component={component}
            onRemove={() => onRemoveItem(component.id)}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}

