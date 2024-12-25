import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { X, Edit } from 'lucide-react';
import { TableComponent } from '@/components/features/customized-dashboard/table-component';
import { QuoteComponent } from '@/components/features/dashboard/quote-component';
import { ImageComponent } from '@/components/features/customized-dashboard/image-component';
import { FlexibleChart } from '@/components/features/customized-dashboard/flexible-chart-component';
import { DashboardService } from '@/api/services/dashboard.service';
import {
    Component,
    ChartSettings,
    CartesianChartSettings,
    isPieChartSettings,
    PieChartSettings
} from '@/api/types/dashboard';

interface DashboardItemProps {
    componentId: string;
    onRemove: () => void;
    onUpdate: (updates: any) => void;
}

const renderChartComponent = (settings: ChartSettings) => {
    if (isPieChartSettings(settings)) {
        return (
            <FlexibleChart<PieChartSettings>
                settings={settings}
                data={settings.data}
                className="w-full"
            />
        );
    }

    return (
        <FlexibleChart<CartesianChartSettings>
            settings={settings}
            data={settings.data}
            className="w-full"
        />
    );
};

function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x);
}

export function DashboardItem({ componentId, onRemove, onUpdate }: DashboardItemProps) {
    const [component, setComponent] = useState<Component | null>(null);

    useEffect(() => {
        async function fetchComponent() {
            try {
                const metadata = await DashboardService.getComponentMetadata(componentId);
                setComponent(metadata);
            } catch (error) {
                console.error('Error fetching component:', error);
            }
        }
        fetchComponent();
    }, [componentId]);

    if (!component) {
        return <div>Loading component...</div>;
    }

    const renderComponent = () => {
        if (!component) return null;

        switch (component.type) {
            case 'Chart':
                return renderChartComponent(component.settings);
            case 'Table':
                return <TableComponent data={component.settings} />;
            case 'Quote':
                return <QuoteComponent data={component.settings} />;
            case 'Image':
                return <ImageComponent data={component.settings} />;
            default:
                return assertNever(component);
        }
    };

    return (
        <Card className="w-full h-full">
            <CardHeader className="p-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">{component.type}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onUpdate(component)}>
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