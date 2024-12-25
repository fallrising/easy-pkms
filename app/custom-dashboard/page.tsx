// File Path: personal-info-manager/app/custom-dashboard/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Layout as PageLayout } from '@/components/layout/layout';
import { DashboardGrid } from '@/components/features/dashboard/dashboard-grid';
import { Button } from '@/components/common/button';
import { PlusCircle } from 'lucide-react';
import { AddComponentDialog } from '@/components/features/dashboard/add-component-dialog';
import { DashboardService } from '@/api/services/dashboard.service';
import { Component } from '@/api/types/dashboard';
import {
    createTypedComponent,
    createTypedComponentUpdate,
    NewComponent
} from "@/components/features/dashboard/types/newComponent";

export default function CustomDashboardPage() {
    const [isAddingComponent, setIsAddingComponent] = useState(false);
    const [components, setComponents] = useState<Component[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const initialComponents = await DashboardService.getInitialComponents();
                setComponents(initialComponents);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                // Handle error (e.g., show error message to user)
            }
        }
        fetchData();
    }, []);

    // Update the handleAddComponent signature
    const handleAddComponent = useCallback(async (newComponent: NewComponent) => {
        try {
            const lastComponent = components[components.length - 1];
            const newComponentLayout = {
                x: (lastComponent?.layout.x ?? 0) + (lastComponent?.layout.w ?? 0),
                y: lastComponent?.layout.y ?? 0,
                w: 4,
                h: 4,
            };

            const addedComponent = createTypedComponent(
                newComponent,
                Date.now().toString(),
                newComponentLayout
            );

            setComponents(prevComponents => [...prevComponents, addedComponent]);
            setIsAddingComponent(false);
        } catch (error) {
            console.error('Error adding component:', error);
        }
    }, [components]);

    const handleRemoveComponent = useCallback(async (id: string) => {
        try {
            setComponents(prevComponents => prevComponents.filter(component => component.id !== id));
        } catch (error) {
            console.error('Error removing component:', error);
            // Handle error (e.g., show error message to user)
        }
    }, []);

    const handleUpdateComponent = useCallback(async (id: string, updates: Partial<Omit<Component, 'id'>>) => {
        try {
            setComponents(prevComponents =>
                prevComponents.map(component =>
                    component.id === id
                        ? createTypedComponentUpdate(component, updates)
                        : component
                )
            );
        } catch (error) {
            console.error('Error updating component:', error);
        }
    }, []);

    const handleUpdateLayout = useCallback(async (newLayout: any) => {
        try {
            setComponents(prevComponents =>
                prevComponents.map(component => {
                    const layoutItem = newLayout.find((item: any) => item.i === component.id);
                    return layoutItem ? { ...component, layout: { x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h } } : component;
                })
            );
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