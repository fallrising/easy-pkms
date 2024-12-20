'use client'

import { useState } from 'react'
import { Button } from '@/components/common/button'
import { Plus } from 'lucide-react'
import { EditCardDialog } from '@/components/common/edit-card-dialog'

export function CreateCardButton() {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <>
      <Button onClick={() => setIsCreating(true)}>
        <Plus className="mr-2 h-4 w-4" /> Create Card
      </Button>
      {isCreating && (
        <EditCardDialog
          card={null}
          onClose={() => setIsCreating(false)}
        />
      )}
    </>
  )
}

