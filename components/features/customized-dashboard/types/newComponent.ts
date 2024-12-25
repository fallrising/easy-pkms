import { ComponentType, ChartSettings, TableSettings, QuoteSettings, ImageSettings, Component } from '@/api/types/dashboard';

export interface NewComponent {
    type: ComponentType;
    settings: ChartSettings | TableSettings | QuoteSettings | ImageSettings;
}

// Type guard to ensure component type matches settings type
export function createTypedComponent(newComponent: NewComponent, id: string, layout: Component['layout']): Component {
    switch (newComponent.type) {
        case 'Chart':
            return {
                id,
                type: 'Chart',
                settings: newComponent.settings as ChartSettings,
                layout
            };
        case 'Table':
            return {
                id,
                type: 'Table',
                settings: newComponent.settings as TableSettings,
                layout
            };
        case 'Quote':
            return {
                id,
                type: 'Quote',
                settings: newComponent.settings as QuoteSettings,
                layout
            };
        case 'Image':
            return {
                id,
                type: 'Image',
                settings: newComponent.settings as ImageSettings,
                layout
            };
    }
}

// Type guard for component updates
export function createTypedComponentUpdate(
    component: Component,
    updates: Partial<Omit<Component, 'id'>>
): Component {
    switch (component.type) {
        case 'Chart':
            return {
                ...component,
                ...updates,
                type: 'Chart',
                settings: updates.settings ? updates.settings as ChartSettings : component.settings
            };
        case 'Table':
            return {
                ...component,
                ...updates,
                type: 'Table',
                settings: updates.settings ? updates.settings as TableSettings : component.settings
            };
        case 'Quote':
            return {
                ...component,
                ...updates,
                type: 'Quote',
                settings: updates.settings ? updates.settings as QuoteSettings : component.settings
            };
        case 'Image':
            return {
                ...component,
                ...updates,
                type: 'Image',
                settings: updates.settings ? updates.settings as ImageSettings : component.settings
            };
    }
}
