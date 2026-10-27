"use client"

import { TriangleAlert } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <EmptyState
        icon={TriangleAlert}
        title="문제가 발생했습니다"
        description="잠시 후 다시 시도해주세요."
        action={<Button onClick={reset}>다시 시도</Button>}
      />
    </div>
  )
}
