// File: personal-info-manager/api/types/dashboard.ts

// Chart series configuration
export interface ChartSeries {
    dataKey: string;
    name: string;
    color?: string;
    stack?: string;
}

// Base settings interface
interface BaseSettings {
    title?: string;
    showGrid?: boolean;
    showLegend?: boolean;
}

// Specific chart type settings
export interface CartesianChartSettings extends BaseSettings {
    type: 'bar' | 'line' | 'area';
    xAxisKey: string;
    series: ChartSeries[];
    data: Array<Record<string, any>>;
    yAxisConfig?: {
        label?: string;
        domain?: [number, number];
        tickCount?: number;
    };
}

export interface PieChartSettings extends BaseSettings {
    type: 'pie';
    dataKey: string;
    nameKey: string;
    colors?: string[];
    data: Array<Record<string, any>>;
}

// Union type for all chart settings
export type ChartSettings = CartesianChartSettings | PieChartSettings;

// Other component settings
export interface TableSettings {
    columns: string[];
    data: (string | number)[][];
}

export interface QuoteSettings {
    text: string;
    author: string;
}

export interface ImageSettings {
    src: string;
    alt: string;
    title?: string;
}

// Component type with discriminated union
export interface BaseComponent {
    id: string;
    layout: { x: number; y: number; w: number; h: number; };
}

export interface ChartComponent extends BaseComponent {
    type: 'Chart';
    settings: ChartSettings;
}

export interface TableComponent extends BaseComponent {
    type: 'Table';
    settings: TableSettings;
}

export interface QuoteComponent extends BaseComponent {
    type: 'Quote';
    settings: QuoteSettings;
}

export interface ImageComponent extends BaseComponent {
    type: 'Image';
    settings: ImageSettings;
}

export type Component = ChartComponent | TableComponent | QuoteComponent | ImageComponent;
export type ComponentType = Component['type'];
export type ComponentSettings = Component['settings'];

// Type guard functions
export const isChartComponent = (component: Component): component is ChartComponent =>
    component.type === 'Chart';

export const isPieChartSettings = (settings: ChartSettings): settings is PieChartSettings =>
    settings.type === 'pie';