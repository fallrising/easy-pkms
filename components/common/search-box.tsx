'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/common/input'
import { Search } from 'lucide-react'

interface SearchBoxProps {
    defaultValue?: string;
}

export function SearchBox({ defaultValue = '' }: SearchBoxProps) {
    const [search, setSearch] = useState(defaultValue)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        setSearch(defaultValue)
    }, [defaultValue])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        // Create new URLSearchParams object
        const params = new URLSearchParams(searchParams.toString())

        if (search) {
            params.set('search', search)
        } else {
            params.delete('search')
        }

        // Reset page when searching
        params.set('page', '1')

        router.push(`/cards?${params.toString()}`)
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