"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import {
  useCopyToClipboard,
  useDebounceValue,
  useIsClient,
  useLocalStorage,
  useMediaQuery,
} from "usehooks-ts"

import { ExampleGroup, ExampleSection } from "@/components/examples/example-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BREAKPOINTS } from "@/lib/breakpoints"
import { formatDate, formatRelative } from "@/lib/format"

const SAMPLE_DATE = "2026-10-01"

export function HooksExample() {
  // SSR 하이드레이션 불일치 방지: initializeWithValue: false
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`, { initializeWithValue: false })
  const [count, setCount] = useLocalStorage("example-count", 0, { initializeWithValue: false })
  const [text, setText] = useState("")
  const [debounced] = useDebounceValue(text, 500)
  const [copiedText, copy] = useCopyToClipboard()

  // 현재 시각 의존 값은 프리렌더에서 막히므로(cacheComponents) 클라이언트에서만 계산
  const isClient = useIsClient()

  return (
    <ExampleSection id="hooks" title="훅 & 유틸" description="usehooks-ts와 date-fns 래퍼 사용 예시">
      <ExampleGroup label="useMediaQuery">
        <Badge variant={isMd ? "default" : "secondary"}>
          {isMd ? `md 이상 (≥ ${BREAKPOINTS.md}px)` : `md 미만 (< ${BREAKPOINTS.md}px)`}
        </Badge>
        <span className="text-sm text-muted-foreground">브라우저 폭을 조절해보세요.</span>
      </ExampleGroup>

      <ExampleGroup label="useLocalStorage (새로고침해도 유지)">
        <Button variant="outline" onClick={() => setCount((c) => c - 1)}>-</Button>
        <span className="min-w-8 text-center font-mono">{count}</span>
        <Button variant="outline" onClick={() => setCount((c) => c + 1)}>+</Button>
        <Button variant="ghost" onClick={() => setCount(0)}>초기화</Button>
      </ExampleGroup>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">useDebounceValue (500ms)</p>
        <Input className="max-w-sm" placeholder="검색어 입력" value={text} onChange={(e) => setText(e.target.value)} />
        <p className="text-sm">입력값: {text || "-"} / 디바운스: {debounced || "-"}</p>
      </div>

      <ExampleGroup label="useCopyToClipboard">
        <Button variant="outline" onClick={() => copy("npm install")}>
          {copiedText ? <Check /> : <Copy />}
          <code className="font-mono text-xs">npm install</code>
        </Button>
      </ExampleGroup>

      <ExampleGroup label="date-fns 래퍼 (lib/format.ts)">
        <span className="text-sm">formatDate: {formatDate(SAMPLE_DATE)}</span>
        <span className="text-sm">formatRelative: {isClient ? formatRelative(SAMPLE_DATE) : "-"}</span>
      </ExampleGroup>
    </ExampleSection>
  )
}
