import React, { useCallback, useEffect, useRef } from 'react';
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
    const layoutRef = useRef(layout);

    useEffect(() => {
        layoutRef.current = layout;
    }, [layout]);

    const onLayoutChange = useCallback((currentLayout: GridLayout[]) => {
        const updatedLayout: Layout = {
            rows: [{
                id: 'main',
                components: currentLayout.map(item => ({
                    id: item.i,
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                }))
            }]
        };

        if (JSON.stringify(updatedLayout) !== JSON.stringify(layoutRef.current)) {
            onUpdateLayout(updatedLayout);
        }
    }, [onUpdateLayout]);

    const getLayoutFromComponents = useCallback(() => {
        const flattenedComponents = layout.rows.flatMap(row => row.components);
        return flattenedComponents.map(component => ({
            i: component.id,
            x: component.x,
            y: component.y,
            w: component.w,
            h: component.h,
        }));
    }, [layout]);

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
            {components.map(component => {
                const componentLayout = layout.rows
                    .flatMap(row => row.components)
                    .find(item => item.id === component.id);

                return (
                    <div key={component.id} data-grid={componentLayout}>
                        <DashboardItem
                            component={component}
                            onRemove={() => onRemoveComponent(component.id)}
                            onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                        />
                    </div>
                );
            })}
        </ResponsiveGridLayout>
    );
}

