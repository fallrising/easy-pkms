// File Path: personal-info-manager/hooks/useNotes.ts
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Note, SortKey } from '@/api/types/note'
import { NoteService } from '@/api/services/note.service'

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState<SortKey>('updatedAt')

    const fetchNotes = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await NoteService.getNotes()
            setNotes(data)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch notes'))
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const newNote = await NoteService.createNote(note)
            setNotes(prev => [newNote, ...prev])
            return newNote
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to create note')
        }
    }

    const updateNote = async (id: string, data: Partial<Note>) => {
        try {
            const updatedNote = await NoteService.updateNote(id, data)
            setNotes(prev => prev.map(note =>
                note.id === id ? updatedNote : note
            ))
            return updatedNote
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to update note')
        }
    }

    const deleteNote = async (id: string) => {
        try {
            await NoteService.deleteNote(id)
            setNotes(prev => prev.filter(note => note.id !== id))
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to delete note')
        }
    }

    // Memoize filtered and sorted notes
    const processedNotes = useMemo(() => {
        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return [...filtered].sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title)
            } else {
                return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()
            }
        })
    }, [notes, searchTerm, sortBy])

    return {
        notes: processedNotes,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        createNote,
        updateNote,
        deleteNote,
        refresh: fetchNotes
    }
}