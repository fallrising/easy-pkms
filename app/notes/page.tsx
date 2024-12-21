'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { NoteList } from '@/components/features/notes/note-list'
import { CreateNoteDialog } from '@/components/features/notes/create-note-dialog'
import { Button } from '@/components/common/button'
import { PlusCircle } from 'lucide-react'
import { useNotes } from '@/hooks/useNotes'
import type { Note } from '@/api/types/note'

export default function NotesPage() {
  const [isCreatingNote, setIsCreatingNote] = useState(false)
  const {
    notes,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    createNote,
    updateNote,
    deleteNote
  } = useNotes()

  const handleCreateNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createNote(noteData)
    setIsCreatingNote(false)
  }

  const handleUpdateNote = async (id: string, data: Partial<Note>) => {
    await updateNote(id, data)
  }

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id)
  }

  return (
      <Layout>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">Notes Management</h2>
            <Button onClick={() => setIsCreatingNote(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Note
            </Button>
          </div>
          <NoteList
              notes={notes}
              isLoading={isLoading}
              error={error}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
          />
          {isCreatingNote && (
              <CreateNoteDialog
                  onClose={() => setIsCreatingNote(false)}
                  onCreate={handleCreateNote}
              />
          )}
        </div>
      </Layout>
  )
}