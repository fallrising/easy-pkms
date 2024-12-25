'use client';

import {useEffect, useState} from 'react';
import { Layout as PageLayout} from '@/components/layout/layout';
import { DashboardGrid } from '@/components/features/dashboard/dashboard-grid';
import { Button } from '@/components/common/button';
import { PlusCircle } from 'lucide-react';
import { AddComponentDialog } from '@/components/features/dashboard/add-component-dialog';
import { DashboardService } from '@/api/services/dashboard.service';
import { Component, Layout as DashboardLayout } from '@/api/types/dashboard';

export default function CustomDashboardPage() {
  const [isAddingComponent, setIsAddingComponent] = useState(false);
  const [components, setComponents] = useState<Component[]>([]);
  const [layout, setLayout] = useState<DashboardLayout>(() => ({ rows: [] }));

  useEffect(() => {
    async function fetchData() {
      const initialComponents = await DashboardService.getInitialComponents();
      const initialLayout = await DashboardService.getInitialLayout();
      setComponents(initialComponents);
      setLayout(initialLayout);
    }
    fetchData();
  }, []);

  return (
      <PageLayout>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">Custom Dashboard</h2>
            <Button onClick={() => setIsAddingComponent(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Component
            </Button>
          </div>
          <DashboardGrid components={components} layout={layout || { rows: [] }} />
          {isAddingComponent && (
              <AddComponentDialog onClose={() => setIsAddingComponent(false)} />
          )}
        </div>
      </PageLayout>
  );
}
