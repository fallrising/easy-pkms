// File Path: personal-info-manager/components/common/content-card.tsx
'use client'

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/common/card"
import { Card as CardType } from "@/api/types/cards"
import { format } from "date-fns"

// Add type to your CardType interface (if not already present)
interface ContentCardProps extends CardType {
    onEdit?: (id: string, card: Partial<CardType>) => void
    onDelete?: (id: string) => void
    type?: 'document' | 'image' | 'video' | 'audio' | 'code' | 'folder' | string
}

export function ContentCard({
                                id,
                                title,
                                content,
                                status,
                                type, // Add this prop
                                createdAt,
                                updatedAt,
                                onEdit,
                                onDelete
                            }: ContentCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    </div>
                    <span className={`text-sm capitalize px-2 py-1 rounded-full ${
                        status === 'active' ? 'bg-green-100 text-green-700' :
                            status === 'draft' ? 'bg-slate-100 text-slate-700' :
                                status === 'archived' ? 'bg-gray-100 text-gray-700' :
                                    'bg-blue-100 text-blue-700'  // default fallback
                    }`}>
                        {status}
                    </span>
                </div>
            </CardHeader>
            {/* Rest of the component remains the same */}
            <CardContent className="flex-grow">
                <CardDescription>{content}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div className="flex flex-col">
                    <div>
                        Created {format(new Date(createdAt), 'MMM d, yyyy')}
                    </div>
                    <div>
                        Updated {format(new Date(updatedAt), 'MMM d, yyyy')}
                    </div>
                </div>
                <div className="flex space-x-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(id, { title, content, status })}
                            className="hover:text-foreground"
                        >
                            Edit
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(id)}
                            className="hover:text-destructive"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}