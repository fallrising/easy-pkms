// File Path: personal-info-manager/components/features/dashboard/chart-component.tsx
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface ChartComponentProps {
    data: {
        type: 'bar' | 'line' | 'pie';
        data: Array<{
            month: string;
            value: number;
        }>;
    };
}

export function ChartComponent({ data: chartData }: ChartComponentProps) {
    console.log('Chart Data for Recharts:', chartData.data);

    // Ensure we have the data we need
    if (!chartData?.data) {
        console.warn('No data provided to ChartComponent');
        return <div>No data available</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                    dataKey="value"
                    fill="#adfa1d"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}