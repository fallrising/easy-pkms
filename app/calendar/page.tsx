// File Path: personal-info-manager/app/calendar/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/layout';
import { Calendar } from '@/components/common/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { CalendarService } from '@/api/services/calendar.service';
import { Event } from '@/api/types/calendar';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (date) {
      const fetchEvents = async () => {
        const selectedDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        ).toISOString();
        const events = await CalendarService.getEventsForDay(selectedDate);
        setEvents(events);
      };
      fetchEvents();
    }
  }, [date]);

  const formatDateTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
      <Layout>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Timeline Picker</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
              </CardHeader>
              <CardContent>
                {events.length ? (
                    events.map(event => (
                        <div key={event.id} className="mb-4">
                          <h3 className="font-bold">{event.title}</h3>
                          <p>{event.description}</p>
                          <p>
                            {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
                          </p>
                        </div>
                    ))
                ) : (
                    <p>No events for this day</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
  );
}
