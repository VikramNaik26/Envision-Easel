'use client'

import { FormEventHandler, useEffect, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogDescription,

} from "@/components/ui/dialog"
import { useRenameModel } from "@/store/useRenameModel"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.easel.update)

  const {
    isOpen,
    onClose,
    initialValue
  } = useRenameModel()

  const [title, setTitle] = useState(initialValue.title)

  useEffect(() => {
    setTitle(initialValue.title)
  }, [initialValue.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValue.id,
      title
    })
      .then(() => {
        toast.success("Board renamed")
        onClose()
      })
      .catch(() => toast.error("Failed to rename board"))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          Edit board title
        </DialogTitle>
        <DialogDescription>
          Edit the new title of the board
        </DialogDescription>
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

