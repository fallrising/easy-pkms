// File Path: personal-info-manager/api/services/dashboard.service.ts
import {mockInitialComponents} from "@/api/mocks/dashboardComponents.mock";

export class DashboardService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async getComponentMetadata(id: string): Promise<any> {
        await this.delay();
        const component = mockInitialComponents.find(c => c.id === id);
        if (!component) {
            throw new Error(`Component with ID ${id} not found`);
        }
        return component;
    }

    static async getInitialComponents(): Promise<any[]> {
        await this.delay();
        return mockInitialComponents;
    }
}