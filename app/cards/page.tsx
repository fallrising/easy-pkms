// File Path: personal-info-manager/app/cards/page.tsx
'use client'

import { Suspense } from 'react'
import { CardList } from '@/components/common/card-list'
import { CreateCardButton } from '@/components/common/create-card-button'
import { SearchBox } from '@/components/common/search-box'
import { Layout } from '@/components/layout/layout'
import {useSearchParams} from "next/navigation";

export default function CardsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  return (
      <Layout>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">Content Cards</h2>
            <div className="flex space-x-4">
              <SearchBox defaultValue={search || ''} />
              <CreateCardButton />
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <CardList searchQuery={search} filterType={type} filterId={id} />
          </Suspense>
        </div>
      </Layout>
  )
}

