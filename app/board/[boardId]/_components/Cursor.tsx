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
  console.log(info, cursor)

  if (!cursor) return null

  const { x, y } = cursor

  return (
    <p>
      <foreignObject
        style={{
          transform: `tranlateX(${x}px) tranlateY(${y}px)`
        }}
        width={50}
        height={50}
        className="relative drop-shadow-md"
      >
        <MousePointer2
          className="w-5 h-5"
          style={{
            fill: connectionIdToColor(connectionId),
            color: connectionIdToColor(connectionId),
          }}
        />
      </foreignObject>
    </p>
  )
})

Cursor.displayName = "Cursor"
