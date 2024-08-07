'use client'

import { ReactNode } from "react"
import { ClientSideSuspense } from "@liveblocks/react"
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client"

import { RoomProvider } from "@/liveblocks.config"
import { Layer } from "@/types/canvas"

interface RoomProps {
  children: ReactNode
  roomId: string
  fallback: NonNullable<ReactNode> | null
}

export const Room = ({
  children,
  roomId,
  fallback
}: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        pencilColor: null
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>()
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
