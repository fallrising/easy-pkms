import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card"
import { Layout } from "@/components/layout/layout"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { StatsGrid } from "@/components/dashboard/stats-grid"

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <StatsGrid />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Activity items will go here */}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

