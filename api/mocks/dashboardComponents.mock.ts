// File Path: personal-info-manager/api/mocks/dashboardComponents.mock.ts
import { Component } from '@/api/types/dashboard';

export const mockInitialComponents: Component[] = [
    {
        id: "1",
        type: "Chart",
        settings: {
            type: "bar",
            title: "Monthly Sales",
            xAxisKey: "month",
            showGrid: true,
            showLegend: true,
            series: [
                { dataKey: "sales", name: "Sales", color: "#8884d8" },
                { dataKey: "revenue", name: "Revenue", color: "#82ca9d" }
            ],
            data: [
                { month: "Jan", sales: 100, revenue: 200 },
                { month: "Feb", sales: 120, revenue: 220 },
                { month: "Mar", sales: 140, revenue: 250 },
                { month: "Apr", sales: 160, revenue: 280 },
                { month: "May", sales: 180, revenue: 300 }
            ],
            yAxisConfig: {
                label: "Amount",
                tickCount: 5
            }
        },
        layout: { x: 0, y: 0, w: 6, h: 4 }
    },
    {
        id: "2",
        type: "Table",
        settings: {
            columns: ["Name", "Status", "Role"],
            data: [
                ["Alice", "Active", "Admin"],
                ["Bob", "Inactive", "User"],
                ["Carol", "Active", "User"]
            ]
        },
        layout: { x: 6, y: 0, w: 6, h: 4 }
    },
    {
        id: "3",
        type: "Quote",
        settings: {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        layout: { x: 0, y: 4, w: 12, h: 4 }
    },
    {
        id: "4",
        type: "Image",
        settings: {
            src: "https://images.unsplash.com/photo-1734375063393-2ca2050512cd?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Random image",
            title: "Featured Image",
        },
        layout: { x: 0, y: 8, w: 4, h: 4 }
    },
    {
        id: "5",
        type: "Chart",
        settings: {
            type: "pie",
            title: "Revenue Distribution",
            dataKey: "value",
            nameKey: "name",
            showLegend: true,
            data: [
                { name: "Product A", value: 400 },
                { name: "Product B", value: 300 },
                { name: "Product C", value: 300 }
            ],
            colors: ["#0088FE", "#00C49F", "#FFBB28"]
        },
        layout: { x: 6, y: 0, w: 6, h: 4 }
    }
];