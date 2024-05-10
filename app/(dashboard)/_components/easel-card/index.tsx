'use client'

import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from "@clerk/nextjs"
import { MoreHorizontal } from "lucide-react"

import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "@/convex/_generated/api"

import { Skeleton } from "@/components/ui/skeleton"
import { Footer } from "./Footer"
import { Action } from "@/components/Actions"
import { Overlay } from "./Overlay"
import { toast } from "sonner"

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
  const { userId } = useAuth()
  const authorLabel = userId === authorId ? 'You' : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

  const {
    mutate: onFavorite,
    pending: pendingFavorite
  } = useApiMutation(api.easel.favorite)
  const {
    mutate: onUnfavorite,
    pending: pendingUnfavorite
  } = useApiMutation(api.easel.unfavorite)

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id })
        .catch(() => toast.error('Failed to unfavorite'))
    } else {
      onFavorite({ id, orgId })
        .catch(() => toast.error('Failed to favorite'))
    }
  }

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
          <Action
            id={id}
            title={title}
            side="right"
          >
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Action>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  )
}

EaselCard.Skeleton = function EaselCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
