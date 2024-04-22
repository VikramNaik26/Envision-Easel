'use client'

import Image from "next/image"
import { useOrganization, useOrganizationList } from "@clerk/nextjs/app-beta/client"
import { cn } from "@/lib/utils"
import { Hint } from "@/components/Hint"

interface ItemProps {
  id: string
  name: string
  imageUrl: string
}
export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return

    setActive({ organization: id })
  }
  return (
    <div className="aspect-square relative">
      <Hint
        label={name}
        side="right"
        align="start"
        sideOffset={18}
      >
        <Image
          fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            "rounded-md opacity-75 hover:opacity-100 cursor-pointer transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>

  )
}

