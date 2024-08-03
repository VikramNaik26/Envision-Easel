'use clint'

import { useStorage } from "@/liveblocks.config"
import { memo } from "react"

import { LayerType } from "@/types/canvas"
import { LayerRectangle } from "./LayerRectangle"
import { Ellipse } from "./Ellipse"
import { Text } from "./Text"
import { Note } from "./NoteLayer"
import { Path } from "./Path"
import { rgbToHex } from "@/lib/utils"

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor
}: LayerPreviewProps) => {
  const layer = useStorage(root => root.layers.get(id))

  if (!layer) return null

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? rgbToHex(layer.fill) : "#000"}
          stroke={selectionColor}
        />
      )
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Rectangle:
      return (
        <LayerRectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )

    default:
      console.warn("Unknown layer type")
      break;
  }
})

LayerPreview.displayName = "LayerPreview"
