import { BarChart3 } from "lucide-react"
import type { Metadata } from "next"

import { EmptyState } from "@/components/common/empty-state"
import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = { title: "분석" }

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="분석" description="통계 차트가 들어갈 자리입니다." />
      <EmptyState
        icon={BarChart3}
        title="표시할 데이터가 없습니다"
        description="차트 라이브러리(예: recharts)를 연결해 분석 화면을 구성하세요."
      />
    </>
  )
}
