export interface Card {
    id: string
    title: string
    content: string
    logo: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface GetCardsOptions {
    search?: string | null
    type?: string | null
    id?: string | null
}