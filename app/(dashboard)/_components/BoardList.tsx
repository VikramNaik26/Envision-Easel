'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { EmptyBoards } from "./EmptyBoard"
import { EmptyFav } from "./EmptyFav"
import { EmptySearch } from "./EmptySearch"
import { EaselCard } from './easel-card'
import { NewBoardButton } from './NewBoardButton'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({
  orgId,
  query
}: BoardListProps) => {
  const data = useQuery(api.board.get, { orgId, ...query })

  if (data === undefined) {
    return (
      <section>
        <h2 className='text-3xl'>
          {query.favorites ? 'Favirote Easels (Boards)' : 'Team Easels (Boards)'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton
            orgId={orgId}
            disabled
          />
          <EaselCard.Skeleton />
          <EaselCard.Skeleton />
          <EaselCard.Skeleton />
          <EaselCard.Skeleton />
        </div>
      </section>
    )
  }

  if (!data.length && query.search) {
    return <EmptySearch />
  }

  if (!data.length && query.favorites) {
    return <EmptyFav />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return (
    <section>
      <h2 className='text-3xl'>
        {query.favorites ? 'Favirote Easels (Boards)' : 'Team Easels (Boards)'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((easel) => (
          <EaselCard
            key={easel._id}
            id={easel._id}
            title={easel.title}
            imageUrl={easel.imageUrl}
            authorId={easel.authorId}
            authorName={easel.authorName}
            createdAt={easel._creationTime}
            orgId={easel.orgId}
            isFavorite={easel.isFavorite}
          />
        ))}
      </div>
    </section>
  )
}
