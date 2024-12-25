import React, { useCallback } from 'react';
import { Responsive, WidthProvider, Layout as GridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardItem } from '@/components/features/dashboard/dashboard-item';
import { Component, Layout } from '@/api/types/dashboard';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
    components: Component[];
    layout: Layout;
    onRemoveComponent: (id: string) => void;
    onUpdateComponent: (id: string, updates: Partial<Omit<Component, 'id'>>) => void;
    onUpdateLayout: (newLayout: Layout) => void;
}

export function DashboardGrid({
                                  components,
                                  layout,
                                  onRemoveComponent,
                                  onUpdateComponent,
                                  onUpdateLayout
                              }: DashboardGridProps) {
    const onLayoutChange = useCallback((currentLayout: GridLayout[]) => {
        const updatedLayout: Layout = {
            rows: currentLayout.map((item) => ({
                id: `row-${item.i}`,
                components: [item.i],
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
            }))
        };
        onUpdateLayout(updatedLayout);
    }, [onUpdateLayout]);

    const getLayoutFromComponents = () => {
        return layout.rows.map((row) => ({
            i: row.components[0],
            x: row.x || 0,
            y: row.y || 0,
            w: row.w || 2,
            h: row.h || 2,
        }));
    };

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: getLayoutFromComponents() }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            onLayoutChange={onLayoutChange}
            isDraggable={true}
            isResizable={true}
        >
            {components.map(component => (
                <div key={component.id}>
                    <DashboardItem
                        component={component}
                        onRemove={() => onRemoveComponent(component.id)}
                        onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                    />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}

