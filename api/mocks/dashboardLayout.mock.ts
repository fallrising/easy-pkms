import { Layout } from '@/api/types/dashboard';

export const mockInitialLayout: Layout = {
    rows: [
        {
            id: "row1",
            components: [
                { id: "1", x: 0, y: 0, w: 6, h: 4 }
            ]
        },
        {
            id: "row2",
            components: [
                { id: "2", x: 6, y: 0, w: 6, h: 4 }
            ]
        },
        {
            id: "row3",
            components: [
                { id: "3", x: 0, y: 4, w: 12, h: 4 }
            ]
        }
    ]
};