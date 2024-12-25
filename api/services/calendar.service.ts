import { Event } from "@/api/types/calendar";
import { mockEvents } from "../mocks/calendar.mock";

export class CalendarService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async getEventsForDay(date: string): Promise<Event[]> {
        await this.delay();
        const selectedDate = new Date(date);
        const startOfDay = selectedDate.setHours(0, 0, 0, 0); // Start of day (ms)
        const endOfDay = selectedDate.setHours(23, 59, 59, 999); // End of day (ms)

        return mockEvents.filter(event => {
            return event.startTime >= startOfDay && event.startTime <= endOfDay;
        });
    }
}
