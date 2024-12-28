// File Path: personal-info-manager/app/documents/page.tsx
'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Input } from '@/components/common/input'
import { Button } from '@/components/common/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/table'
import { FileText, Trash2 } from 'lucide-react'
import { useInfiniteDocuments } from '@/hooks/useInfiniteDocuments'
import { UploadDocumentModal } from '@/components/features/documents/upload-document-modal'

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { documents, isLoading, hasMore, loadMore, deleteDocument, createDocument } = useInfiniteDocuments({ search: searchTerm })

  const formatTimestamp = (unixTime: number) => {
    return new Date(unixTime).toLocaleString() // Format Unix time to a readable timestamp
  }

  const filteredDocuments = documents.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    deleteDocument(id)
  }

  return (
      <Layout>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <div className="flex justify-between items-center">
            <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
            />
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <FileText className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{formatTimestamp(doc.lastModified)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          {hasMore && (
              <Button onClick={() => loadMore()} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
          )}
          <UploadDocumentModal
              open={isUploadModalOpen}
              onClose={() => setIsUploadModalOpen(false)}
              createDocument={createDocument} // Pass the createDocument function
          />
        </div>
      </Layout>
  )
}