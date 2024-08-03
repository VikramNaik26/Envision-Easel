import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

import { TextLayer } from "@/types/canvas"
import { cn, rgbToHex } from "@/lib/utils"
import { useMutation } from "@/liveblocks.config"

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
})

interface TextProps {
  id: string
  layer: TextLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const calculateFontSize = (height: number, width: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.5
  const fontSizeBasedOnHeight = height * scaleFactor
  const fontSizeBasedOnWidth = width * scaleFactor

  return Math.min(
    fontSizeBasedOnHeight,
    fontSizeBasedOnWidth,
    maxFontSize
  )
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: TextProps) => {
  const { x, y, height, width, value, fill } = layer

  const updateValue = useMutation((
    { storage },
    newValue: string
  ) => {
    const liveLayers = storage.get("layers")
    liveLayers.get(id)?.set("value", newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={e => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "w-full h-full flex justify-center items-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(height, width),
          color: fill ? rgbToHex(fill) : "black",
        }}
      />
    </foreignObject>
  )
}
