import type { Metadata } from "next"

import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { ButtonsExample } from "@/components/examples/buttons-example"
import { DataExample } from "@/components/examples/data-example"
import { DisplayExample } from "@/components/examples/display-example"
import { FeedbackExample } from "@/components/examples/feedback-example"
import { FormControlsExample } from "@/components/examples/form-controls-example"
import { HooksExample } from "@/components/examples/hooks-example"
import { OverlayExample } from "@/components/examples/overlay-example"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = { title: "예제" }

// 섹션 앵커 목록
const sections = [
  { id: "buttons", label: "버튼" },
  { id: "display", label: "표시" },
  { id: "forms", label: "폼 컨트롤" },
  { id: "overlay", label: "오버레이" },
  { id: "feedback", label: "피드백" },
  { id: "data", label: "데이터" },
  { id: "hooks", label: "훅 & 유틸" },
]

export default function ExamplesPage() {
  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="예제"
        description="설치된 컴포넌트와 유틸리티의 사용법을 한 곳에서 확인하세요."
      />
      <nav className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <Badge key={s.id} variant="outline" render={<a href={`#${s.id}`} />}>
            {s.label}
          </Badge>
        ))}
      </nav>
      <ButtonsExample />
      <DisplayExample />
      <FormControlsExample />
      <OverlayExample />
      <FeedbackExample />
      <DataExample />
      <HooksExample />
    </Container>
  )
}
