import { Component } from '@/api/types/dashboard';

export const mockInitialComponents: Component[] = [
    {
        id: "1",
        name: "Chart",
        settings: {
            type: "bar",
            title: "Monthly Sales",
            xAxisKey: "month",
            showGrid: true,
            showLegend: true,
            series: [{
                dataKey: "value",
                name: "Sales",
                color: "#8884d8"
            }, { dataKey: "revenue", name: "Revenue", color: "#82ca9d" }],
            data: [
                { month: "Jan", sales: 100, revenue: 200 },
                { month: "Feb", sales: 120, revenue: 220 },
                { month: "Mar", sales: 140, revenue: 250 },
                { month: "Apr", sales: 160, revenue: 280 },
                { month: "May", sales: 180, revenue: 300 }
            ]
        }
    },
    {
        id: "2",
        name: "Table",
        settings: {
            columns: ["Name", "Status", "Role"],
            data: [
                ["Alice", "Active", "Admin"],
                ["Bob", "Inactive", "User"],
                ["Carol", "Active", "User"]
            ]
        }
    },
    {
        id: "3",
        name: "Quote",
        settings: {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        }
    }
];