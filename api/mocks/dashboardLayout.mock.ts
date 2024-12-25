import { Layout } from '@/api/types/dashboard';

export const mockInitialLayout: Layout = {
    rows: [
        {
            id: "row1",
            components: ["1"]
        },
        {
            id: "row2",
            components: ["2"]
        },
        {
            id: "row3",
            components: ["3"]
        }
    ]
};