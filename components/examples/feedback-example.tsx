"use client"

import { Inbox } from "lucide-react"
import { toast } from "sonner"

import { EmptyState } from "@/components/common/empty-state"
import { ExampleGroup, ExampleSection } from "@/components/examples/example-section"
import { Button } from "@/components/ui/button"

export function FeedbackExample() {
  // promise 토스트: 비동기 작업 상태를 자동으로 전환
  const handlePromise = () => {
    toast.promise(new Promise((r) => setTimeout(r, 1500)), {
      loading: "저장 중...",
      success: "저장되었습니다.",
      error: "저장에 실패했습니다.",
    })
  }

  return (
    <ExampleSection id="feedback" title="피드백" description="sonner 토스트와 EmptyState">
      <ExampleGroup label="Toast (sonner)">
        <Button variant="outline" onClick={() => toast.success("성공했습니다.")}>success</Button>
        <Button variant="outline" onClick={() => toast.error("오류가 발생했습니다.")}>error</Button>
        <Button variant="outline" onClick={() => toast.info("알려드립니다.")}>info</Button>
        <Button variant="outline" onClick={handlePromise}>promise</Button>
      </ExampleGroup>
      <div className="rounded-lg border border-dashed">
        <EmptyState
          icon={Inbox}
          title="받은 메시지가 없습니다"
          description="공통 EmptyState 컴포넌트 예시입니다."
          action={<Button size="sm">새로 만들기</Button>}
        />
      </div>
    </ExampleSection>
  )
}
