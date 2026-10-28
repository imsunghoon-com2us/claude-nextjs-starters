import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <Loader2
      aria-label="로딩 중"
      className={cn("size-4 animate-spin text-current", className)}
    />
  )
}
