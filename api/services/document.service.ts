// File Path: personal-info-manager/api/services/document.service.ts
import { Document, GetDocumentsOptions } from '@/api/types/documents'
import { mockDocuments } from '../mocks/document.mock'

export class DocumentService {
    private static delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static async getDocuments(page: number, options: GetDocumentsOptions = {}): Promise<Document[]> {
        const { search, type, id } = options
        await this.delay()

        let filteredDocuments = [...mockDocuments]

        if (id) {
            filteredDocuments = filteredDocuments.filter(doc => doc.id === id)
        }

        if (search) {
            const searchLower = search.toLowerCase()
            filteredDocuments = filteredDocuments.filter(doc =>
                doc.name.toLowerCase().includes(searchLower)
            )
        }

        if (type) {
            // Add type filtering if needed in the future
        }

        return filteredDocuments.slice((page - 1) * 10, page * 10)
    }

    static async createDocument(document: Omit<Document, 'id' | 'lastModified'>): Promise<Document> {
        await this.delay();
        const newDocument: Document = {
            ...document,
            id: Date.now().toString(),
            lastModified: Date.now(), // Add the missing properties
        };
        mockDocuments.unshift(newDocument);
        return newDocument;
    }

    static async updateDocument(id: string, document: Partial<Document>): Promise<Document> {
        await this.delay()
        const index = mockDocuments.findIndex(doc => doc.id === id)
        if (index === -1) throw new Error('Document not found')
        mockDocuments[index] = {
            ...mockDocuments[index],
            ...document,
            lastModified: Date.now(), // Current Unix time in milliseconds
        }
        return mockDocuments[index]
    }

    static async deleteDocument(id: string): Promise<void> {
        await this.delay()
        const index = mockDocuments.findIndex(doc => doc.id === id)
        if (index === -1) throw new Error('Document not found')
        mockDocuments.splice(index, 1)
    }
}