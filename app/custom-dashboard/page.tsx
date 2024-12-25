'use client';

import { useEffect, useState, useCallback } from 'react';
import { Layout as PageLayout } from '@/components/layout/layout';
import { DashboardGrid } from '@/components/features/dashboard/dashboard-grid';
import { Button } from '@/components/common/button';
import { PlusCircle } from 'lucide-react';
import { AddComponentDialog } from '@/components/features/dashboard/add-component-dialog';
import { DashboardService } from '@/api/services/dashboard.service';
import { Component, Layout as DashboardLayout } from '@/api/types/dashboard';

export default function CustomDashboardPage() {
    const [isAddingComponent, setIsAddingComponent] = useState(false);
    const [components, setComponents] = useState<Component[]>([]);
    const [layout, setLayout] = useState<DashboardLayout>({ rows: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const [initialComponents, initialLayout] = await Promise.all([
                    DashboardService.getInitialComponents(),
                    DashboardService.getInitialLayout()
                ]);
                setComponents(initialComponents);
                setLayout(initialLayout);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                // Handle error (e.g., show error message to user)
            }
        }
        fetchData();
    }, []);

    const handleAddComponent = useCallback(async (newComponent: Omit<Component, 'id'> & { name: Component['name'] }) => {
        try {
            const lastComponent = layout.rows[layout.rows.length - 1]?.components[0];
            const newComponentLayout = {
                x: (lastComponent?.x ?? 0) + (lastComponent?.w ?? 0),
                y: lastComponent?.y ?? 0,
                w: 4,
                h: 4,
            };

            const { component: addedComponent, layoutUpdate } = await DashboardService.addComponent(newComponent, newComponentLayout);
            setComponents(prevComponents => [...prevComponents, addedComponent]);
            setLayout(layoutUpdate);

            setIsAddingComponent(false);
        } catch (error) {
            console.error('Error adding component:', error);
            // Handle error (e.g., show error message to user)
        }
    }, [layout]);

    const handleRemoveComponent = useCallback(async (id: string) => {
        try {
            const updatedLayout = await DashboardService.removeComponent(id);
            setComponents(prevComponents => prevComponents.filter(component => component.id !== id));
            setLayout(updatedLayout);
        } catch (error) {
            console.error('Error removing component:', error);
            // Handle error (e.g., show error message to user)
        }
    }, []);

    const handleUpdateComponent = useCallback(async (id: string, updates: Partial<Omit<Component, 'id'>>) => {
        try {
            const { component: updatedComponent, layoutUpdate } = await DashboardService.updateComponent(id, updates);
            setComponents(prevComponents =>
                prevComponents.map(component =>
                    component.id === id ? updatedComponent : component
                )
            );
            if (layoutUpdate) {
                setLayout(layoutUpdate);
            }
        } catch (error) {
            console.error('Error updating component:', error);
            // Handle error (e.g., show error message to user)
        }
    }, []);

    const handleUpdateLayout = useCallback(async (newLayout: DashboardLayout) => {
        try {
            const updatedLayout = await DashboardService.updateLayout(newLayout);
            setLayout(updatedLayout);
        } catch (error) {
            console.error('Error updating layout:', error);
            // Handle error (e.g., show error message to user)
        }
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
                <DashboardGrid
                    components={components}
                    layout={layout}
                    onRemoveComponent={handleRemoveComponent}
                    onUpdateComponent={handleUpdateComponent}
                    onUpdateLayout={handleUpdateLayout}
                />
                {isAddingComponent && (
                    <AddComponentDialog
                        onClose={() => setIsAddingComponent(false)}
                        onAddComponent={handleAddComponent}
                    />
                )}
            </div>
        </PageLayout>
    );
}

