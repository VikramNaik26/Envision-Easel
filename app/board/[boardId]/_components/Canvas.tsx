'use client'

import { useState } from "react"
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation
} from "@/liveblocks.config"

import { CanvasMode, CanvasState } from "@/types/canvas"
import { Info } from "./Info"
import { Participants } from "./Participants"
import { Toolbar } from "./Toolbar"
import { CursorsPresence } from "./CursorsPresence"

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()
  const onPointerMove = useMutation((
  { setMyPresence },
  e: React.PointerEvent
  ) => {
    e.preventDefault()

    const current = { x: 0, y: 0 }

    setMyPresence({ cursor: current })
  }, [])

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />

      <svg className="h-[100dvh] w-[100dvw]">
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
