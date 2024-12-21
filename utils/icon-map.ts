import { FileText, Link, FolderOpen, Star, type LucideIcon } from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
    'file-text': FileText,
    'link': Link,
    'folder': FolderOpen,
    'star': Star,
    // Add more icons as needed
}

// Helper function to get icon component
export function getIconByName(name: string): LucideIcon {
    return iconMap[name] || FileText  // Return FileText as fallback
}