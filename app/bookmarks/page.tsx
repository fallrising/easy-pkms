'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { BookmarkList } from '@/components/bookmark-list'
import { BatchCreateBookmarks } from '@/components/batch-create-bookmarks'
import { Button } from '@/components/button'
import { PlusCircle } from 'lucide-react'

export default function BookmarksPage() {
  const [isBatchCreating, setIsBatchCreating] = useState(false)

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Bookmark Management</h2>
          <Button onClick={() => setIsBatchCreating(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Batch Create Bookmarks
          </Button>
        </div>
        <BookmarkList />
        {isBatchCreating && (
          <BatchCreateBookmarks onClose={() => setIsBatchCreating(false)} />
        )}
      </div>
    </Layout>
  )
}

