import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardItem } from '@/components/features/dashboard/dashboard-item';
import { DashboardService } from '@/api/services/dashboard.service';
import { Component, Layout } from '@/api/types/dashboard';

const ResponsiveGridLayout = WidthProvider(Responsive);

export function DashboardGrid() {
  const [components, setComponents] = useState<Component[]>([]);
  const [layout, setLayout] = useState<Layout>({ rows: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      setIsLoading(true);
      setError(null);
      try {
        const [initialComponents, initialLayout] = await Promise.all([
          DashboardService.getInitialComponents(),
          DashboardService.getInitialLayout()
        ]);
        setComponents(initialComponents);
        setLayout(initialLayout);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load dashboard'));
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const onLayoutChange = async (newLayout: any) => {
    // newLayout is already an array of layout items
    const updatedLayout: Layout = {
      rows: newLayout.map((item: any) => ({
        id: `row-${item.i}`,
        components: [item.i] // In this simple version, each row has one component
      }))
    };
    setLayout(updatedLayout);

    try {
      await DashboardService.updateLayout(updatedLayout);
    } catch (err) {
      console.error('Failed to update layout:', err);
      // Optionally revert the layout if the update fails
      // setLayout(prevLayout);
    }
  };

  const onRemoveItem = (id: string) => {
    setComponents(prevComponents => prevComponents.filter(component => component.id !== id));
    setLayout(prevLayout => ({
      rows: prevLayout.rows.filter(row => !row.components.includes(id))
    }));
  };

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error loading dashboard: {error.message}</div>;
  }

  const getLayoutFromComponents = () => {
    return layout.rows.map((row) => ({
      i: row.components[0], // Using first component as the ID
      x: 0,
      y: 0,
      w: 12,
      h: 4,
    }));
  };

  return (
      <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: getLayoutFromComponents() }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          onLayoutChange={(layout) => onLayoutChange(layout)}
          isDraggable={true}
          isResizable={true}
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
  );
}