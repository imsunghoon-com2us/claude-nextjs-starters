import { FileQuestion } from "lucide-react"
import Link from "next/link"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <EmptyState
        icon={FileQuestion}
        title="페이지를 찾을 수 없습니다"
        description="주소가 올바른지 확인하거나 홈으로 돌아가세요."
        action={
          <Button nativeButton={false} render={<Link href="/" />}>
            홈으로
          </Button>
        }
      />
    </div>
  )
}
