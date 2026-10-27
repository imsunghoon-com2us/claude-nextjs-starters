import { Rocket } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center gap-4">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Rocket className="size-5" />
          <span>{siteConfig.name}</span>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/dashboard" />}
          >
            시작하기
          </Button>
        </div>
      </Container>
    </header>
  )
}
