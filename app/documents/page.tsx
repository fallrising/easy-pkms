'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Input } from '@/components/common/input'
import { Button } from '@/components/common/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/table'
import { FileText, Trash2 } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: string
  lastModified: string
}

const initialDocuments: Document[] = [
  { id: '1', name: 'Project Proposal.docx', type: 'Word Document', size: '2.5 MB', lastModified: '2023-06-15' },
  { id: '2', name: 'Financial Report.xlsx', type: 'Excel Spreadsheet', size: '1.8 MB', lastModified: '2023-06-14' },
  { id: '3', name: 'Presentation.pptx', type: 'PowerPoint', size: '5.2 MB', lastModified: '2023-06-13' },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
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
          <Button>
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
                <TableCell>{doc.lastModified}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

