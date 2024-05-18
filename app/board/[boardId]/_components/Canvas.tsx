'use client'

import { useCallback, useMemo, useState } from "react"
import { nanoid } from "nanoid"
import { LiveObject } from "@liveblocks/client"

import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
  useOthersMapped
} from "@/liveblocks.config"
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point
} from "@/types/canvas"
import { Info } from "./Info"
import { Participants } from "./Participants"
import { Toolbar } from "./Toolbar"
import { CursorsPresence } from "./CursorsPresence"
import {
  connectionIdToColor,
  pointerEventToCanvasPoint
} from "@/lib/utils"
import { LayerPreview } from "./LayerPreview"

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds)

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [camera, setCamera] = useState<Camera>({ x: 255, y: 0 })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0 
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useMutation((
    { setMyPresence, storage },
    layerType: LayerType.Rectangle | LayerType.Ellipse | LayerType.Text | LayerType.Note,
    position: Point
  ) => {
    const liveLayers = storage.get('layers')
    if (liveLayers.size >= MAX_LAYERS) {
      return
    }

    const liveLayerIds = storage.get('layerIds')
    const layerId = nanoid()
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    })

    liveLayerIds.push(layerId)
    liveLayers.set(layerId, layer)

    setMyPresence({ selection: [layerId] }, { addToHistory: true })
    setCanvasState({ mode: CanvasMode.None })
  }, [lastUsedColor])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera(camera => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation((
    { setMyPresence },
    e: React.PointerEvent
  ) => {
    e.preventDefault()

    const current = pointerEventToCanvasPoint(e, camera)
    setMyPresence({ cursor: current })
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerUp = useMutation((
    { },
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera)

    //     console.log({
    //       point,
    //       mode: canvasState.mode
    //     })

    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(
        canvasState.layerType,
        point
      )
    } else {
      setCanvasState({ mode: CanvasMode.None })
    }

    history.resume()
  }, [
    camera,
    canvasState,
    history,
    insertLayer
  ])

  const selections = useOthersMapped(other => other.presence.selection)

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {}

    for (const user of selections) {
      const [connectionId, selection] = user

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }

    return layerIdsToColorSelection
  }, [selections])

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

      <svg
        className="h-[100dvh] w-[100dvw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map(layerId => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={(e, layerId) => { }}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
