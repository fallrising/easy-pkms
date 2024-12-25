// File Path: personal-info-manager/components/features/dashboard/dashboard-grid.tsx
import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardItem } from '@/components/features/customized-dashboard/dashboard-item';
import { DashboardService } from '@/api/services/dashboard.service';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
    onRemoveComponent: (id: string) => void;
    onUpdateComponent: (id: string, updates: any) => void;
    onUpdateLayout: (newLayout: any) => void;
}

export function DashboardGrid({ onRemoveComponent, onUpdateComponent, onUpdateLayout }: DashboardGridProps) {
    const [components, setComponents] = useState<any[]>([]);

    useEffect(() => {
        async function fetchComponents() {
            const initialComponents = await DashboardService.getInitialComponents();
            setComponents(initialComponents);
        }
        fetchComponents();
    }, []);

    const handleLayoutChange = (currentLayout: any[]) => {
        // Map the new layout to the components
        const updatedComponents = components.map(component => {
            const layoutItem = currentLayout.find(item => item.i === component.id);
            return layoutItem ? { ...component, layout: { x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h } } : component;
        });

        // Update the components state
        setComponents(updatedComponents);

        // Pass the updated layout to the parent component
        onUpdateLayout(currentLayout);
    };

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: components.map(c => ({ i: c.id, ...c.layout })) }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            onLayoutChange={handleLayoutChange}
            isDraggable={true}
            isResizable={true}
        >
            {components.map(component => (
                <div key={component.id} data-grid={component.layout}>
                    <DashboardItem
                        componentId={component.id}
                        onRemove={() => onRemoveComponent(component.id)}
                        onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                    />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}