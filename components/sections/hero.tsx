"use client"

import { Check, Copy } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useCopyToClipboard } from "usehooks-ts"

import { Container } from "@/components/common/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const INSTALL_COMMAND = "git clone <repo> && npm install && npm run dev"

export function Hero() {
  const [, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  // 설치 명령어 복사 + 토스트 안내
  const handleCopy = async () => {
    const ok = await copy(INSTALL_COMMAND)
    if (!ok) return toast.error("복사에 실패했습니다.")
    setCopied(true)
    toast.success("명령어를 복사했습니다.")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Next.js 16 · App Router</Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          빠르게 시작하는 모던 웹 스타터킷
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          레이아웃, 테마, 폼 검증, 대시보드까지 준비되어 있습니다. 바로 서비스
          개발에 집중하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
            대시보드 보기
          </Button>
          <Button variant="outline" size="lg" onClick={handleCopy}>
            {copied ? <Check /> : <Copy />}
            <code className="font-mono text-xs">npm install</code>
          </Button>
        </div>
      </Container>
    </section>
  )
}
