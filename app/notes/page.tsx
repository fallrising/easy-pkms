'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { NoteList } from '@/components/features/notes/note-list'
import { CreateNoteDialog } from '@/components/features/notes/create-note-dialog'
import { Button } from '@/components/common/button'
import { PlusCircle } from 'lucide-react'

export default function NotesPage() {
  const [isCreatingNote, setIsCreatingNote] = useState(false)

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
        <NoteList />
        {isCreatingNote && (
          <CreateNoteDialog onClose={() => setIsCreatingNote(false)} />
        )}
      </div>
    </Layout>
  )
}

