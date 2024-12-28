// File Path: personal-info-manager/api/mocks/card.mock.ts
import { Card } from '@/api';

export const mockCards: Card[] = [
    {
        id: '1',
        title: 'Sample Card 1',
        content: 'This is a sample card content.',
        status: 'active',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
    },
    {
        id: '2',
        title: 'Development Updates',
        content: 'Latest updates on the development progress.',
        status: 'active',
        createdAt: '2023-01-02T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
    },
    {
        id: '3',
        title: 'Project Planning',
        content: 'Project roadmap and milestone planning details.',
        status: 'pending',
        createdAt: '2023-01-03T00:00:00.000Z',
        updatedAt: '2023-01-03T00:00:00.000Z',
    }
]