'use client'

import { Link2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ConfirmModel } from "./ConfirmModel"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps["side"]
  sideOffset?: DropdownMenuContentProps["sideOffset"]
  id: string
  title: string
}

export const Action = ({
  children,
  side,
  sideOffset,
  id,
  title
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.easel.remove)

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`
    )
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <ConfirmModel
          header="Delete board?"
          description="This will delete the board and all its contents. This action cannot be undone."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete the Board
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
