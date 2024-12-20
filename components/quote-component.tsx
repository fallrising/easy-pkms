'use client'

export function QuoteComponent({ data }: { data: { text: string; author: string } }) {
  return (
    <blockquote className="space-y-2">
      <p className="text-lg">&ldquo;{data.text}&rdquo;</p>
      <footer className="text-sm text-muted-foreground">- {data.author}</footer>
    </blockquote>
  )
}

