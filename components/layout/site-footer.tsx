import { Container } from "@/components/common/container"
import { siteConfig } from "@/lib/site-config"

// 연도 값은 캐시하여 프리렌더링 허용 (cacheComponents 대응)
export async function SiteFooter() {
  "use cache"
  return (
    <footer className="border-t py-8">
      <Container className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p>Next.js · Tailwind CSS · shadcn/ui</p>
      </Container>
    </footer>
  )
}
