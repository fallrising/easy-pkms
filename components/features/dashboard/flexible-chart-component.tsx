// File Path: personal-info-manager/components/features/dashboard/flexible-chart-component.tsx
import React, { useMemo } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

interface CommonSettings {
    title?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    height?: number;
}

interface CartesianSettings extends CommonSettings {
    type: 'bar' | 'line' | 'area';
    xAxisKey: string;
    series: {
        dataKey: string;
        name: string;
        color?: string;
        stack?: string;
    }[];
    yAxisConfig?: {
        label?: string;
        domain?: [number, number];
        tickCount?: number;
    };
}

interface PieSettings extends CommonSettings {
    type: 'pie';
    dataKey: string;
    nameKey: string;
    colors?: string[];
}

type ChartSettings = CartesianSettings | PieSettings;

interface FlexibleChartProps<T extends ChartSettings> {
    settings: T;
    data: Array<Record<string, any>>;
    className?: string;
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const DEFAULT_HEIGHT = 350;

export function FlexibleChart<T extends ChartSettings>({
                                                           settings,
                                                           data,
                                                           className
                                                       }: FlexibleChartProps<T>) {
    const chartContent = useMemo(() => {
        switch (settings.type) {
            case 'bar':
            case 'line':
            case 'area': {
                const ChartComponent = settings.type === 'bar' ? BarChart :
                    settings.type === 'line' ? LineChart : AreaChart;

                const DataComponent = settings.type === 'bar' ? Bar :
                    settings.type === 'line' ? Line : Area;

                // Type assertion to resolve the TypeScript error
                const TypedDataComponent = DataComponent as React.ComponentType<any>;

                return (
                    <ChartComponent data={data}>
                        {settings.showGrid && <CartesianGrid strokeDasharray="3 3" />}
                        <XAxis
                            dataKey={settings.xAxisKey}
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            {...settings.yAxisConfig}
                        />
                        <Tooltip />
                        {settings.showLegend && <Legend />}
                        {settings.series.map((series, index) => {
                            const color = series.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
                            return (
                                <TypedDataComponent
                                    key={series.dataKey}
                                    dataKey={series.dataKey}
                                    name={series.name}
                                    stackId={series.stack}
                                    fill={color}
                                    stroke={color}
                                />
                            );
                        })}
                    </ChartComponent>
                );
            }

            case 'pie': {
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={settings.dataKey}
                            nameKey={settings.nameKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={settings.colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        {settings.showLegend && <Legend />}
                    </PieChart>
                );
            }

            default: {
                return <div>Unsupported chart type</div>;
            }
        }
    }, [settings, data]);

    return (
        <div className={className}>
            {settings.title && (
                <h3 className="text-center mb-4 font-medium">
                    {settings.title}
                </h3>
            )}
            <ResponsiveContainer width="100%" height={settings.height || DEFAULT_HEIGHT}>
                {chartContent}
            </ResponsiveContainer>
        </div>
    );
}

