import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#DC2626",
  "#D97766",
  "#859669",
  "#7C3AED",
  "#DB2777",
  "#14B8A6",
  "#64748B",
  "#0284C7",
  "#84CC16",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  const index = connectionId % COLORS.length
  return COLORS[index]
}


