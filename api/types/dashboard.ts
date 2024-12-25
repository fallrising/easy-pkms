// api/types/dashboard.ts

// Chart series configuration
export interface ChartSeries {
    dataKey: string;
    name: string;
    color?: string;
    stack?: string;
}

// Chart component settings
export interface ChartSettings {
    type: 'bar' | 'line' | 'area' | 'pie';
    title?: string;
    xAxisKey?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    series?: ChartSeries[];
    dataKey?: string;  // for pie charts
    nameKey?: string;  // for pie charts
    colors?: string[];  // for pie charts
    data: Array<Record<string, any>>;
    yAxisConfig?: {
        label?: string;
        domain?: [number, number];
        tickCount?: number;
    };
}

// Table component settings
interface TableSettings {
    columns: string[];
    data: string[][];
}

// Quote component settings
interface QuoteSettings {
    text: string;
    author: string;
}

// Image component settings
interface ImageSettings {
    src: string;
    alt: string;
}

// Component types
export type ComponentType = 'Chart' | 'Table' | 'Quote' | 'Image';

// Settings type union
export type ComponentSettings = {
    type?: ComponentType;
    settings: ChartSettings | TableSettings | QuoteSettings | ImageSettings;
}

export interface Component {
    id: string;
    name: ComponentType;
    settings: ChartSettings | Record<string, any>;
}

export interface Layout {
    rows: {
        id: string;
        components: string[];
    }[];
}