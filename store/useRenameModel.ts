import { create } from 'zustand'

const defaultValues = { id: "", title: "" }

interface IRenameModel {
  isOpen: boolean
  initialValue: typeof defaultValues
  onOpen: (id: string, title: string) => void
  onClose: () => void
}

export const useRenameModel = create<IRenameModel>((set) => ({
  isOpen: false,
  initialValue: defaultValues,
  onOpen: (id, title) => set({
    isOpen: true,
    initialValue: { id, title }
  }),
  onClose: () => set({
    isOpen: false,
    initialValue: defaultValues
  }),
}))
