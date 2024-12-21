// Export all types
export type {
    Action,
    Activity,
    Bookmark,
    Card,
    GetCardsOptions,
    Note,
    Stat,
    SortKey,
    UpdateBookmarkData
} from './types'

// Export all services
export {
    ActionService,
    ActivityService,
    BookmarkService,
    CardService,
    NoteService,
    StatService
} from './services'

import {
    CardService,
    NoteService,
    BookmarkService,
    ActivityService,
    StatService,
    ActionService
} from './services'


// You might want to keep the old API functions for backward compatibility
// These would map to the service methods
export const getCards = CardService.getCards
export const createCard = CardService.createCard
export const updateCard = CardService.updateCard
export const deleteCard = CardService.deleteCard

export const getNotes = NoteService.getNotes
export const createNote = NoteService.createNote
export const updateNote = NoteService.updateNote
export const deleteNote = NoteService.deleteNote

export const getBookmarks = BookmarkService.getBookmarks
export const createBookmarks = BookmarkService.createBookmarks
export const updateBookmark = BookmarkService.updateBookmark
export const deleteBookmark = BookmarkService.deleteBookmark

export const getActivities = ActivityService.getActivities
export const createActivity = ActivityService.createActivity
export const deleteActivity = ActivityService.deleteActivity

export const getStats = StatService.getStats
export const updateStat = StatService.updateStat
export const incrementStat = StatService.incrementStat

export const getActions = ActionService.getActions
export const createAction = ActionService.createAction
export const updateAction = ActionService.updateAction