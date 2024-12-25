'use client';

import { useEffect, useState } from 'react';
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

    const handleAddComponent = async (newComponent: Omit<Component, 'id'> & { name: Component['name'] }) => {
        try {
            const addedComponent = await DashboardService.addComponent(newComponent);
            setComponents(prevComponents => [...prevComponents, addedComponent]);

            // Update layout to include the new component
            setLayout(prevLayout => ({
                rows: [...prevLayout.rows, { id: `row-${addedComponent.id}`, components: [addedComponent.id] }]
            }));

            setIsAddingComponent(false);
        } catch (error) {
            console.error('Error adding component:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleRemoveComponent = async (id: string) => {
        try {
            await DashboardService.removeComponent(id);
            setComponents(prevComponents => prevComponents.filter(component => component.id !== id));
            setLayout(prevLayout => ({
                rows: prevLayout.rows.filter(row => !row.components.includes(id))
            }));
        } catch (error) {
            console.error('Error removing component:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleUpdateComponent = async (id: string, updates: Partial<Omit<Component, 'id'>>) => {
        try {
            const updatedComponent = await DashboardService.updateComponent(id, updates);
            setComponents(prevComponents =>
                prevComponents.map(component =>
                    component.id === id ? updatedComponent : component
                )
            );
        } catch (error) {
            console.error('Error updating component:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleUpdateLayout = async (newLayout: DashboardLayout) => {
        try {
            await DashboardService.updateLayout(newLayout);
            setLayout(newLayout);
        } catch (error) {
            console.error('Error updating layout:', error);
            // Handle error (e.g., show error message to user)
        }
    };

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

