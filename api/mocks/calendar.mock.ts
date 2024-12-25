import { Event } from "@/api/types/calendar";

export const mockEvents: Event[] = [
    {
        id: "1",
        title: "Team Meeting",
        description: "Discuss project milestones",
        startTime: 1705327200000, // Unix timestamp
        endTime: 1705330800000,   // Unix timestamp
    },
    {
        id: "2",
        title: "Code Review",
        description: "Review the latest PRs",
        startTime: 1705341600000, // Unix timestamp
        endTime: 1705345200000,   // Unix timestamp
    }
];
