import { Suspense } from 'react'
import { CardList } from '@/components/card-list'
import { CreateCardButton } from '@/components/create-card-button'
import { SearchBox } from '@/components/search-box'
import { Layout } from '@/components/layout'

export default function CardsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Content Cards</h2>
          <div className="flex space-x-4">
            <SearchBox />
            <CreateCardButton />
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CardList />
        </Suspense>
      </div>
    </Layout>
  )
}

