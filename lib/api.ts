export interface Card {
  id: string
  title: string
  content: string
  logo: string
  status: string
  createdAt: string
  updatedAt: string
}

interface GetCardsOptions {
  search?: string | null;
  type?: string | null;
  id?: string | null;
}

const mockCards: Card[] = [
  {
    id: '1',
    title: 'Sample Card 1',
    content: 'This is a sample card content.',
    logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  // Add more mock cards here
]

export async function getCards(page: number, options: GetCardsOptions = {}): Promise<Card[]> {
  const { search, type, id } = options;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter cards based on search parameters
  let filteredCards = [...mockCards];

  if (id) {
    filteredCards = filteredCards.filter(card => card.id === id);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredCards = filteredCards.filter(card =>
        card.title.toLowerCase().includes(searchLower) ||
        card.content.toLowerCase().includes(searchLower)
    );
  }

  if (type) {
    // Assuming you want to add type filtering in the future
    // You might need to add a 'type' field to your Card interface
    // filteredCards = filteredCards.filter(card => card.type === type);
  }

  // Return paginated results
  return filteredCards.slice((page - 1) * 10, page * 10);
}

// Add more mock cards for testing
mockCards.push(
    {
      id: '2',
      title: 'Development Updates',
      content: 'Latest updates on the development progress.',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
      status: 'active',
      createdAt: '2023-01-02T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Project Planning',
      content: 'Project roadmap and milestone planning details.',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
      status: 'pending',
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z',
    }
);

export async function createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newCard: Card = {
    ...card,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockCards.unshift(newCard)
  return newCard
}

export async function updateCard(id: string, card: Partial<Card>): Promise<Card> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockCards.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Card not found')
  mockCards[index] = { ...mockCards[index], ...card, updatedAt: new Date().toISOString() }
  return mockCards[index]
}

export async function deleteCard(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockCards.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Card not found')
  mockCards.splice(index, 1)
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content: 'Welcome to your new Notes Management System!',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: 'Discuss project timeline and deliverables.',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
  },
  // Add more mock notes here
]

export async function getNotes(): Promise<Note[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockNotes
}

export async function createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newNote = {
    ...note,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockNotes.unshift(newNote)
  return newNote
}

export async function updateNote(id: string, note: Partial<Note>): Promise<Note> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockNotes.findIndex(n => n.id === id)
  if (index === -1) throw new Error('Note not found')
  mockNotes[index] = { 
    ...mockNotes[index], 
    ...note, 
    updatedAt: new Date().toISOString() 
  }
  return mockNotes[index]
}

export async function deleteNote(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockNotes.findIndex(n => n.id === id)
  if (index === -1) throw new Error('Note not found')
  mockNotes.splice(index, 1)
}

export interface Bookmark {
  id: string
  title: string
  url: string
  createdAt: string
}

const mockBookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'Google',
    url: 'https://www.google.com',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'GitHub',
    url: 'https://github.com',
    createdAt: '2023-01-02T00:00:00.000Z',
  },
  // Add more mock bookmarks here
]

export async function getBookmarks(): Promise<Bookmark[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockBookmarks
}

export async function createBookmarks(bookmarks: Omit<Bookmark, 'id' | 'createdAt'>[]): Promise<Bookmark[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const newBookmarks = bookmarks.map(bookmark => ({
    ...bookmark,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }))
  mockBookmarks.push(...newBookmarks)
  return newBookmarks
}

export async function updateBookmark(id: string, bookmark: Partial<Bookmark>): Promise<Bookmark> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockBookmarks.findIndex(b => b.id === id)
  if (index === -1) throw new Error('Bookmark not found')
  mockBookmarks[index] = { ...mockBookmarks[index], ...bookmark }
  return mockBookmarks[index]
}

export async function deleteBookmark(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockBookmarks.findIndex(b => b.id === id)
  if (index === -1) throw new Error('Bookmark not found')
  mockBookmarks.splice(index, 1)
}

export interface Activity {
  id: string
  type: 'create' | 'update' | 'delete'
  description: string
  timestamp: string
  user: {
    name: string
    avatar: string
  }
}

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'create',
    description: 'Created a new bookmark for "React Documentation"',
    timestamp: '2024-03-21T10:30:00.000Z',
    user: {
      name: 'John Doe',
      avatar: '/api/placeholder/32/32'
    }
  },
  {
    id: '2',
    type: 'update',
    description: 'Updated bookmark title for "TypeScript Handbook"',
    timestamp: '2024-03-21T09:15:00.000Z',
    user: {
      name: 'Jane Smith',
      avatar: '/api/placeholder/32/32'
    }
  },
  {
    id: '3',
    type: 'delete',
    description: 'Removed bookmark "Old Tutorial"',
    timestamp: '2024-03-20T16:45:00.000Z',
    user: {
      name: 'Mike Johnson',
      avatar: '/api/placeholder/32/32'
    }
  }
]

export async function getActivities(): Promise<Activity[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockActivities
}

export async function createActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const newActivity: Activity = {
    ...activity,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  }

  mockActivities.unshift(newActivity) // Add to beginning of array
  return newActivity
}

export async function deleteActivity(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const index = mockActivities.findIndex(activity => activity.id === id)
  if (index === -1) throw new Error('Activity not found')

  mockActivities.splice(index, 1)
}


export interface Stat {
  id: string
  label: string
  value: string
  iconName: string  // Store icon name as string instead of component
  description: string
}

export const mockStats: Stat[] = [
  {
    id: '1',
    label: "Total Documents",
    value: "34",
    iconName: "file-text",  // Icon names as strings
    description: "Documents stored",
  },
  {
    id: '2',
    label: "Quick Links",
    value: "6",
    iconName: "link",
    description: "Saved shortcuts",
  },
  {
    id: '3',
    label: "Categories",
    value: "12",
    iconName: "folder",
    description: "Organization system",
  },
  {
    id: '4',
    label: "Favorites",
    value: "8",
    iconName: "star",
    description: "Starred items",
  },
]

export async function getStats(): Promise<Stat[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockStats
}

export async function updateStat(id: string, newValue: string): Promise<Stat> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const statIndex = mockStats.findIndex(stat => stat.id === id)
  if (statIndex === -1) throw new Error('Stat not found')

  mockStats[statIndex] = {
    ...mockStats[statIndex],
    value: newValue
  }

  return mockStats[statIndex]
}

export async function incrementStat(id: string): Promise<Stat> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const statIndex = mockStats.findIndex(stat => stat.id === id)
  if (statIndex === -1) throw new Error('Stat not found')

  const currentValue = parseInt(mockStats[statIndex].value)
  mockStats[statIndex] = {
    ...mockStats[statIndex],
    value: (currentValue + 1).toString()
  }

  return mockStats[statIndex]
}

export async function decrementStat(id: string): Promise<Stat> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const statIndex = mockStats.findIndex(stat => stat.id === id)
  if (statIndex === -1) throw new Error('Stat not found')

  const currentValue = parseInt(mockStats[statIndex].value)
  if (currentValue <= 0) throw new Error('Cannot decrement below 0')

  mockStats[statIndex] = {
    ...mockStats[statIndex],
    value: (currentValue - 1).toString()
  }

  return mockStats[statIndex]
}