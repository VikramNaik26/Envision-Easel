'use client'

import { MousePointer2 } from "lucide-react"
import { memo } from "react"

import { connectionIdToColor } from "@/lib/utils"
import { useOther } from "@/liveblocks.config"

interface CursorProps {
  connectionId: number
}

export const Cursor = memo(({
  connectionId
}: CursorProps) => {
  const info = useOther(connectionId, user => user?.info)
  const cursor = useOther(connectionId, user => user?.presence.cursor)

  const name = info?.name || "Anonymous"

  if (!cursor) return null

  const { x, y } = cursor

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`
      }}
      width={50}
      height={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="w-5 h-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute px-1.5 py-0.5 text-white rounded-md text-xs font-semibold"
        style={{
          backgroundColor: connectionIdToColor(connectionId), 
        }}
      >
        {name}
      </div>
    </foreignObject>
  )
})

Cursor.displayName = "Cursor"
