// File Path: personal-info-manager/components/features/dashboard/stat-skeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/common/card"
import { Skeleton } from "@/components/common/skeleton"

export function StatSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[60px]" />
                        <Skeleton className="h-4 w-[120px] mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}