'use client'

import Image from "next/image"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/useApiMutation"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  // custom hook
  const { mutate, pending } = useApiMutation(api.easel.create)

  const onClick = () => {
    if (!organization) return
    mutate({
      orgId: organization.id,
      title: "Untitled",
    }).then((id) => {
      toast.success('Board created')
      // TODO: redirect to board/:id
    }).catch((err) => {
      toast.error('Failed to create board')
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/note.svg"
        alt="Empty"
        width={110}
        height={110}
      />
      <h2 className="text-2xl font-semibold mt-6">
        Create your first board
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button
          disabled={pending}
          size='lg'
          className="bg-[#312ecb] hover:bg-[#312ecb] opacity-80 hover:opacity-100 transition"
          onClick={onClick}
        >
          Create Board
        </Button>
      </div>
    </div>
  )
}