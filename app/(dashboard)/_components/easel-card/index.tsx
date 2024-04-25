'use client'

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./Overlay"

interface EaselCardProps {
  id: string
  title: string
  authorId: string
  authorName: string
  createdAt: number
  imageUrl: string
  orgId: string
  isFavorite: boolean
}

export const EaselCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite
}: EaselCardProps) => {
  return (
    <Link
      href={`/board/${id}`}
    >
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-indigo-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit"
          />
          <Overlay />
        </div>
      </div>
    </Link>
  )
}
