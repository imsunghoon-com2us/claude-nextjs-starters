import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ExampleSectionProps = {
  id: string
  title: string
  description: string
  children: ReactNode
}

// 예제 섹션 공통 래퍼 (앵커 id + 제목/설명 + 데모 영역)
export function ExampleSection({ id, title, description, children }: ExampleSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">{children}</CardContent>
      </Card>
    </section>
  )
}

// 데모 내 소제목 + 요소 묶음
export function ExampleGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
