// api/services/dashboard.service.ts
import { mockInitialComponents } from '../mocks/dashboardComponents.mock';
import { mockInitialLayout } from '../mocks/dashboardLayout.mock';
import { Component, Layout, ComponentType, ComponentSettings } from '@/api/types/dashboard';

export class DashboardService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private static storage = {
        components: [...mockInitialComponents] as Component[],
        layout: { ...mockInitialLayout }
    };

    static async getInitialComponents(): Promise<Component[]> {
        await this.delay();
        return [...this.storage.components];
    }

    static async getInitialLayout(): Promise<Layout> {
        await this.delay();
        return { ...this.storage.layout };
    }

    static async updateLayout(newLayout: Layout): Promise<Layout> {
        await this.delay();
        const componentIds = this.storage.components.map(c => c.id);
        const allComponentsExist = newLayout.rows.every(row =>
            row.components.every(componentId =>
                componentIds.includes(componentId)
            )
        );

        if (!allComponentsExist) {
            throw new Error('Invalid layout: references non-existent components');
        }

        this.storage.layout = { ...newLayout };
        return { ...this.storage.layout };
    }

    static async addComponent(
        component: Omit<Component, 'id'> & { name: ComponentType }
    ): Promise<Component> {
        await this.delay();
        const newComponent: Component = {
            ...component,
            id: Date.now().toString(),
        };

        // Type check the settings based on component type
        this.validateComponentSettings(newComponent);

        this.storage.components.push(newComponent);
        return { ...newComponent };
    }

    static async removeComponent(id: string): Promise<void> {
        await this.delay();
        const index = this.storage.components.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Component not found');
        }

        this.storage.components.splice(index, 1);
        this.storage.layout.rows = this.storage.layout.rows.filter(row =>
            !row.components.includes(id)
        );
    }

    static async updateComponent(
        id: string,
        updates: Partial<Omit<Component, 'id'>>
    ): Promise<Component> {
        await this.delay();
        const index = this.storage.components.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Component not found');
        }

        const currentComponent = this.storage.components[index];
        const updatedComponent: Component = {
            ...currentComponent,
            ...updates,
            id // Ensure ID doesn't change
        };

        // Type check the settings if they're being updated
        this.validateComponentSettings(updatedComponent);

        this.storage.components[index] = updatedComponent;
        return { ...updatedComponent };
    }

    private static validateComponentSettings(component: Component): void {
        const { name, settings } = component;

        switch (name) {
            case 'Chart':
                if (!('type' in settings && 'data' in settings)) {
                    throw new Error('Invalid Chart settings');
                }
                break;
            case 'Table':
                if (!('columns' in settings && 'data' in settings)) {
                    throw new Error('Invalid Table settings');
                }
                break;
            case 'Quote':
                if (!('text' in settings && 'author' in settings)) {
                    throw new Error('Invalid Quote settings');
                }
                break;
            case 'Image':
                if (!('src' in settings && 'alt' in settings)) {
                    throw new Error('Invalid Image settings');
                }
                break;
            default:
                throw new Error(`Unknown component type: ${name}`);
        }
    }
}