'use client'

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/card"
import type { Card as CardType } from "@/lib/api"
import { format } from "date-fns"

interface ContentCardProps extends CardType {
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
}

export function ContentCard({
                                id,
                                title,
                                content,
                                logo,
                                status,
                                createdAt,
                                updatedAt,
                                onEdit,
                                onDelete
                            }: ContentCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* Logo as SVG */}
                        <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: logo }} />
                        <CardTitle>{title}</CardTitle>
                    </div>
                    <span className="text-sm capitalize px-2 py-1 rounded-full bg-slate-100">
            {status}
          </span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription>{content}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div>
                    Created {format(new Date(createdAt), 'MMM d, yyyy')}
                </div>
                <div className="flex space-x-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(id)}
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