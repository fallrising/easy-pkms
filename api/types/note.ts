// File Path: personal-info-manager/api/types/note.ts
export interface Note {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

export type SortKey = 'updatedAt' | 'createdAt' | 'title'