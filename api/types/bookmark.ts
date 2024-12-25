// File Path: personal-info-manager/api/types/bookmark.ts
export interface Bookmark {
    id: string
    title: string
    url: string
    createdAt: string
}

export interface UpdateBookmarkData {
    title: string
    url: string
}