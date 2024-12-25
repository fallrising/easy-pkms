// File Path: personal-info-manager/app/layout.tsx
import "@/styles/globals.css"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider"
import React from "react";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Asurada",
    description: "A comprehensive web-based personal information management system",
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          {children}
      </ThemeProvider>
      </body>
    </html>
  )
}

