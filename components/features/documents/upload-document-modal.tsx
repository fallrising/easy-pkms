// File Path: personal-info-manager/components/features/documents/upload-document-modal.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/common/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/common/dialog"
import { Input } from '@/components/common/input'
import { Label } from '@/components/common/label'
import { useInfiniteDocuments } from '@/hooks/useInfiniteDocuments'

interface UploadDocumentModalProps {
    open: boolean
    onClose: () => void
}

export function UploadDocumentModal({ open, onClose }: UploadDocumentModalProps) {
    const [file, setFile] = useState<File | null>(null)
    const { createDocument } = useInfiniteDocuments()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        const newDocument = {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`, // Accurate size in MB
            lastModified: Date.now(), // Current Unix time in milliseconds
        }

        await createDocument(newDocument)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                        Choose a file to upload to your documents.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>File</Label>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <Button onClick={handleUpload} disabled={!file}>
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
