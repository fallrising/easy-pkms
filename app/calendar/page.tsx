'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Calendar } from '@/components/common/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card'

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Layout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
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
              <CardTitle>Selected Date</CardTitle>
            </CardHeader>
            <CardContent>
              {date ? (
                <p>You selected: {date.toDateString()}</p>
              ) : (
                <p>Please select a date</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

