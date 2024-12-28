// File Path: personal-info-manager/api/types/documents.ts
export interface Document {
    id: string
    name: string
    type: string
    size: string
    lastModified: string
}

export interface GetDocumentsOptions {
    search?: string | null
    type?: string | null
    id?: string | null
}