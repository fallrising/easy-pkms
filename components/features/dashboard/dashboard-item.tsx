import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { X, Edit } from 'lucide-react';
import { TableComponent } from '@/components/features/dashboard/table-component';
import { QuoteComponent } from '@/components/features/dashboard/quote-component';
import { ImageComponent } from '@/components/features/dashboard/image-component';
import { FlexibleChart } from '@/components/features/dashboard/flexible-chart-component';
import { Component } from '@/api/types/dashboard';

interface DashboardItemProps {
    component: Component;
    onRemove: () => void;
    onUpdate: (updates: Partial<Omit<Component, 'id'>>) => void;
}

const transformChartSettings = (component: Component) => {
    const settings = component.settings as any;
    if (!settings) return null;

    if (settings.type === 'bar' || settings.type === 'line' || settings.type === 'area') {
        return {
            type: settings.type,
            title: settings.title,
            xAxisKey: settings.xAxisKey || 'x',
            showGrid: settings.showGrid ?? true,
            showLegend: settings.showLegend ?? true,
            series: settings.series || [],
            data: settings.data || [],
            yAxisConfig: settings.yAxisConfig
        };
    } else if (settings.type === 'pie') {
        return {
            type: 'pie',
            title: settings.title,
            dataKey: settings.dataKey || 'value',
            nameKey: settings.nameKey || 'name',
            colors: settings.colors,
            showLegend: settings.showLegend ?? true,
            data: settings.data || []
        };
    }

    return settings;
};

const componentMap: Record<string, React.ComponentType<any>> = {
    Table: TableComponent,
    Chart: FlexibleChart,
    Quote: QuoteComponent,
    Image: ImageComponent,
};

export function DashboardItem({ component, onRemove, onUpdate }: DashboardItemProps) {
    const ComponentRenderer = componentMap[component.name];

    if (!ComponentRenderer) {
        console.warn('Unknown component type:', component.name);
        return (
            <Card className="w-full h-full">
                <CardHeader className="p-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">Unknown Component: {component.name}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={onRemove}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        );
    }

    const handleEdit = () => {
        // This is a placeholder for the edit functionality
        // You would typically open a modal or a form to edit the component
        console.log('Edit component:', component);
        // For demonstration, let's just update the title if it's a chart
        if (component.name === 'Chart') {
            onUpdate({
                settings: {
                    ...component.settings,
                    title: `${component.settings.title} (Edited)`
                }
            });
        }
    };

    const renderComponent = () => {
        if (component.name === 'Chart') {
            const chartSettings = transformChartSettings(component);
            return <FlexibleChart settings={chartSettings} data={component.settings.data} />;
        }
        return <ComponentRenderer data={component.settings} onUpdate={(newData: any) => onUpdate({ settings: newData })} />;
    };

    return (
        <Card className="w-full h-full overflow-hidden">
            <CardHeader className="p-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">{component.name}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={handleEdit}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={onRemove}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-2 overflow-auto h-[calc(100%-2rem)]">
                {renderComponent()}
            </CardContent>
        </Card>
    );
}

