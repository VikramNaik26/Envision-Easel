import Image from "next/image"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { CreateOrganization } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export const EmptyOrg = () => {
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <Image
        src='/empty.svg'
        alt="Empty"
        height={400}
        width={400}
      />
      <h2 className="text-2xl font-semibold mt-6">
        Welcome to Envision Easel
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an Organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-[#312ecb] hover:bg-[#312ecb] opacity-80 hover:opacity-100 transition"
            >
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
