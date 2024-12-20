'use client'

import { useState } from 'react'
import { Input } from '@/components/common/input'
import { Search } from 'lucide-react'

export function SearchBox() {
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', search)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8 w-64"
      />
    </form>
  )
}

