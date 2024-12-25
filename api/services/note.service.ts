// File Path: personal-info-manager/api/services/note.service.ts
import { Note } from '@/api'
import { mockNotes } from '../mocks/note.mock'

export class NoteService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getNotes(): Promise<Note[]> {
        await this.delay()
        return [...mockNotes]
    }

    static async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
        await this.delay()
        const newNote = {
            ...note,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        mockNotes.unshift(newNote)
        return newNote
    }

    static async updateNote(id: string, note: Partial<Note>): Promise<Note> {
        await this.delay()
        const index = mockNotes.findIndex(n => n.id === id)
        if (index === -1) throw new Error('Note not found')
        mockNotes[index] = {
            ...mockNotes[index],
            ...note,
            updatedAt: new Date().toISOString()
        }
        return mockNotes[index]
    }

    static async deleteNote(id: string): Promise<void> {
        await this.delay()
        const index = mockNotes.findIndex(n => n.id === id)
        if (index === -1) throw new Error('Note not found')
        mockNotes.splice(index, 1)
    }
}