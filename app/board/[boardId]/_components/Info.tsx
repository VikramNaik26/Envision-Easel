'use client'

import Image from "next/image"
import { Poppins } from "next/font/google"
import { useQuery } from "convex/react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Action } from "@/components/Actions"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Hint } from "@/components/Hint"
import { useRenameModel } from "@/store/useRenameModel"

interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  )
}

export const Info = ({
  boardId
}: InfoProps) => {
  const { onOpen } = useRenameModel()

  const data = useQuery(api.easel.get, {
    id: boardId as Id<'boards'>
  })

  if (!data) return <InfoSkeleton />

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint
        label="Go to easels(boards)"
        side="bottom"
        sideOffset={10}
      >
        <Button
          className="px-2"
          variant="board"
          asChild
        >
          <Link href='/'>
            <Image
              src="/logo.svg"
              alt="Logo"
              height={40}
              width={40}
            />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Envision Easel
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint
        label="Edit title"
        side="bottom"
        sideOffset={10}
      >
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Action
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint
            label="Main menu"
          ><Button
            variant="board"
            size="icon"
          >
              <Menu />
            </Button>
          </Hint>
        </div>
      </Action>
    </div>
  )
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  )
}
