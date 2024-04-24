'use client'

import { EmptyBoards } from "./EmptyBoard"
import { EmptyFav } from "./EmptyFav"
import { EmptySearch } from "./EmptySearch"

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
  const data = [] // TODO: chnage to API call

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
    <section className="">
      {JSON.stringify(query)}
    </section>
  )
}
