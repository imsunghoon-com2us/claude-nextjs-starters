"use client"

import { Download, Mail, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { ExampleGroup, ExampleSection } from "@/components/examples/example-section"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { Button } from "@/components/ui/button"

const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const

export function ButtonsExample() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <ExampleSection id="buttons" title="버튼" description="variant, size, 아이콘, 로딩, 링크 버튼">
      <ExampleGroup label="Variant">
        {variants.map((v) => (
          <Button key={v} variant={v}>{v}</Button>
        ))}
      </ExampleGroup>
      <ExampleGroup label="Size">
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button size="default">default</Button>
        <Button size="lg">lg</Button>
      </ExampleGroup>
      <ExampleGroup label="아이콘 (lucide-react)">
        <Button><Mail /> 이메일 보내기</Button>
        <Button variant="outline"><Download /> 다운로드</Button>
        <Button size="icon" aria-label="추가"><Plus /></Button>
      </ExampleGroup>
      <ExampleGroup label="로딩 / 링크">
        <Button onClick={handleClick} disabled={loading}>
          {loading && <LoadingSpinner />}
          {loading ? "처리 중..." : "클릭해보세요"}
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/dashboard" />}>
          Link로 렌더링 (render prop)
        </Button>
      </ExampleGroup>
    </ExampleSection>
  )
}
