'use client'

import { NoteItem } from '@/components/features/notes/note-item'
import { Input } from '@/components/common/input'
import { Select } from '@/components/common/select'
import type {Note, SortKey} from '@/api/types/note'

interface NoteListProps {
    notes: Note[]
    isLoading: boolean
    error: Error | null
    searchTerm: string
    setSearchTerm: (term: string) => void
    sortBy: SortKey
    setSortBy: (key: SortKey) => void
    onUpdateNote: (id: string, data: Partial<Note>) => Promise<void>
    onDeleteNote: (id: string) => Promise<void>
}

export function NoteList({
                             notes,
                             isLoading,
                             error,
                             searchTerm,
                             setSearchTerm,
                             sortBy,
                             setSortBy,
                             onUpdateNote,
                             onDeleteNote
                         }: NoteListProps) {
  if (error) {
    return (
        <div className="text-red-600">
          Error: {error.message}
        </div>
    )
  }

  if (isLoading) {
    return (
        <div className="text-center py-4">
          Loading...
        </div>
    )
  }

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Select value={sortBy} onValueChange={(value: SortKey) => setSortBy(value)}>
                    {/* ... */}
                </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes.map(note => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        onUpdate={onUpdateNote}
                        onDelete={onDeleteNote}
                    />
                ))}
            </div>
        </div>
    )
}