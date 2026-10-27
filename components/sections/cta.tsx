import Link from "next/link"

import { Container } from "@/components/common/container"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-center gap-4 rounded-xl bg-muted px-6 py-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight">지금 바로 시작하세요</h2>
          <p className="text-muted-foreground">계정을 만들고 대시보드를 둘러보세요.</p>
          <Button nativeButton={false} render={<Link href="/signup" />}>
            회원가입
          </Button>
        </div>
      </Container>
    </section>
  )
}
