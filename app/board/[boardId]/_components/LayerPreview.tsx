'use clint'

import { useStorage } from "@/liveblocks.config"
import { memo } from "react"

import { LayerType } from "@/types/canvas"
import { LayerRectangle } from "./LayerRectangle"

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
  console.log(layer)

  if (!layer) return null

  switch (layer.type) {
    case LayerType.Rectangle:
      return (
        <LayerRectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
        />
      )

    default:
      console.warn("Unknown layer type")
      break;
  }
})

LayerPreview.displayName = "LayerPreview"