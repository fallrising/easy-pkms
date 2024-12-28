// File Path: personal-info-manager/hooks/useInfiniteDocuments.ts
import { useState, useEffect, useCallback } from 'react'
import { Document, GetDocumentsOptions } from '@/api/types/documents'
import { DocumentService } from '@/api/services/document.service'

export function useInfiniteDocuments(options: GetDocumentsOptions = {}) {
    const [documents, setDocuments] = useState<Document[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // Load the first 10 documents when the component mounts
    useEffect(() => {
        loadMore(true)
    }, []) // Empty dependency array ensures this runs only once on mount

    const loadMore = useCallback(async (reset = false) => {
        if (isLoading || (!hasMore && !reset)) return

        setIsLoading(true)
        try {
            const currentPage = reset ? 1 : page
            const newDocuments = await DocumentService.getDocuments(currentPage, options)

            setHasMore(newDocuments.length === 10)
            setDocuments(prevDocuments => reset ? newDocuments : [...prevDocuments, ...newDocuments])
            setPage(prev => reset ? 2 : prev + 1) // Reset to page 2 if reset is true
        } catch (error) {
            console.error('Failed to load documents:', error)
        } finally {
            setIsLoading(false)
        }
    }, [page, options, hasMore, isLoading])

    const createDocument = useCallback(async (document: Omit<Document, 'id' | 'lastModified'>) => {
        try {
            const newDocument = await DocumentService.createDocument(document);
            setDocuments(prevDocuments => [newDocument, ...prevDocuments]);
        } catch (error) {
            console.error('Failed to create document:', error);
            throw error;
        }
    }, []);

    const deleteDocument = useCallback(async (id: string) => {
        try {
            await DocumentService.deleteDocument(id)
            setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== id))
        } catch (error) {
            console.error('Failed to delete document:', error)
            throw error
        }
    }, [])

    const updateDocument = useCallback(async (id: string, document: Partial<Document>) => {
        try {
            await DocumentService.updateDocument(id, document)
            setDocuments(prevDocuments => prevDocuments.map(existingDocument =>
                existingDocument.id === id
                    ? { ...existingDocument, ...document }
                    : existingDocument
            ))
        } catch (error) {
            console.error('Failed to update document:', error)
            throw error
        }
    }, [])

    const reset = useCallback(() => {
        setDocuments([])
        setPage(1)
        setHasMore(true)
        loadMore(true)
    }, [loadMore])

    return {
        documents,
        isLoading,
        hasMore,
        loadMore,
        createDocument,
        updateDocument,
        deleteDocument,
        reset
    }
}