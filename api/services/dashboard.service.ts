// api/services/dashboard.service.ts
import { mockInitialComponents } from '../mocks/dashboardComponents.mock';
import { mockInitialLayout } from '../mocks/dashboardLayout.mock';
import { Component, Layout, ComponentType } from '@/api/types/dashboard';

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
        const validLayout: Layout = {
            rows: newLayout.rows.map(row => ({
                ...row,
                components: row.components.filter(comp => componentIds.includes(comp.id))
            })).filter(row => row.components.length > 0)
        };

        // Ensure all components have a layout entry
        this.storage.components.forEach(component => {
            const hasLayout = validLayout.rows.some(row =>
                row.components.some(comp => comp.id === component.id)
            );
            if (!hasLayout) {
                validLayout.rows[0].components.push({
                    id: component.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2
                });
            }
        });

        this.storage.layout = validLayout;
        return { ...this.storage.layout };
    }

    static async addComponent(
        component: Omit<Component, 'id'> & { name: ComponentType },
        layoutInfo: { x: number; y: number; w: number; h: number }
    ): Promise<{ component: Component; layoutUpdate: Layout }> {
        await this.delay();
        const newComponent: Component = {
            ...component,
            id: Date.now().toString(),
        };

        // Type check the settings based on component type
        this.validateComponentSettings(newComponent);

        this.storage.components.push(newComponent);

        // Update layout
        const updatedLayout = { ...this.storage.layout };
        updatedLayout.rows.push({
            id: `row-${newComponent.id}`,
            components: [{ id: newComponent.id, ...layoutInfo }]
        });

        this.storage.layout = updatedLayout;

        return {
            component: { ...newComponent },
            layoutUpdate: { ...updatedLayout }
        };
    }

    static async removeComponent(id: string): Promise<Layout> {
        await this.delay();
        const index = this.storage.components.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Component not found');
        }

        this.storage.components.splice(index, 1);

        // Update layout
        const updatedLayout = {
            rows: this.storage.layout.rows.filter(row =>
                !row.components.some(comp => comp.id === id)
            )
        };
        this.storage.layout = updatedLayout;

        return { ...updatedLayout };
    }

    static async updateComponent(
        id: string,
        updates: Partial<Omit<Component, 'id'>>,
        layoutUpdates?: { x?: number; y?: number; w?: number; h?: number }
    ): Promise<{ component: Component; layoutUpdate: Layout | null }> {
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

        let updatedLayout: Layout | null = null;
        if (layoutUpdates) {
            updatedLayout = { ...this.storage.layout };
            for (let row of updatedLayout.rows) {
                const componentIndex = row.components.findIndex(comp => comp.id === id);
                if (componentIndex !== -1) {
                    row.components[componentIndex] = {
                        ...row.components[componentIndex],
                        ...layoutUpdates
                    };
                    break;
                }
            }
            this.storage.layout = updatedLayout;
        }

        return {
            component: { ...updatedComponent },
            layoutUpdate: updatedLayout
        };
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