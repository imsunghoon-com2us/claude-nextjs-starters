import { Layers, Moon, Palette, ShieldCheck, Zap, Smartphone } from "lucide-react"

import { Container } from "@/components/common/container"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  { icon: Zap, title: "Next.js 16", description: "App Router, Turbopack 기반의 최신 프레임워크" },
  { icon: Palette, title: "shadcn/ui", description: "계층별로 정리된 접근성 높은 UI 컴포넌트" },
  { icon: Moon, title: "다크 모드", description: "라이트/다크/시스템 테마를 깜빡임 없이 지원" },
  { icon: ShieldCheck, title: "폼 검증", description: "react-hook-form + zod 기반 타입 안전 폼" },
  { icon: Layers, title: "레이아웃 제공", description: "마케팅, 대시보드, 인증 레이아웃 기본 포함" },
  { icon: Smartphone, title: "반응형", description: "모바일부터 데스크톱까지 대응하는 내비게이션" },
]

export function Features() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          주요 기능
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-2 size-6" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
