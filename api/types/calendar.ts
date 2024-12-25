export interface Event {
    id: string;
    title: string;
    description: string;
    startTime: number; // Unix timestamp (milliseconds)
    endTime: number;   // Unix timestamp (milliseconds)
}
