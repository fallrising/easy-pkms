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
                dataKey: "sales",
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
    },
    {
        id: "4",
        name: "Image",
        settings: {
            src: "https://images.unsplash.com/photo-1734375063393-2ca2050512cd?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Random image",
            title: "Featured Image",
        }
    },
    {
        id: "5",
        name: "Image",
        settings: {
            src: "https://images.unsplash.com/photo-1709917241494-48fdf74f2640?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Dashboard Image",
            title: "Featured Image",
        }
    },
    {
        id: "6",
        name: "Image",
        settings: {
            src: "https://images.unsplash.com/photo-1713955942677-055e1ab0a04e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Profile Image",
            title: "User Profile",
        }
    }
];