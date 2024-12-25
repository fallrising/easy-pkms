// File Path: personal-info-manager/components/layout/header.tsx
"use client"

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/common/button"
import { Badge } from "@/components/common/badge"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Search } from "@/components/features/search/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Notification {
  id: number
  message: string
  read: boolean
}

export function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New message received", read: false },
    { id: 2, message: "Your report is ready", read: false },
    { id: 3, message: "Meeting in 30 minutes", read: true },
  ])
  const queryClient = new QueryClient();
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <QueryClientProvider client={queryClient}>
            <Search/>
          </QueryClientProvider>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" className="w-[300px]">
            {notifications.length === 0 ? (
              <DropdownMenu.Item>No new notifications</DropdownMenu.Item>
            ) : (
              notifications.map((notification) => (
                <DropdownMenu.Item key={notification.id} onSelect={() => markAsRead(notification.id)}>
                  <div className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${notification.read ? 'bg-muted' : 'bg-blue-500'}`} />
                    <div>
                      <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </DropdownMenu.Item>
              ))
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}

