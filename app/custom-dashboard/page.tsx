'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { DashboardGrid } from '@/components/features/dashboard/dashboard-grid'
import { Button } from '@/components/common/button'
import { PlusCircle } from 'lucide-react'
import { AddComponentDialog } from '@/components/features/dashboard/add-component-dialog'

export default function CustomDashboardPage() {
  const [isAddingComponent, setIsAddingComponent] = useState(false)

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Custom Dashboard</h2>
          <Button onClick={() => setIsAddingComponent(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Component
          </Button>
        </div>
        <DashboardGrid />
        {isAddingComponent && (
          <AddComponentDialog onClose={() => setIsAddingComponent(false)} />
        )}
      </div>
    </Layout>
  )
}

