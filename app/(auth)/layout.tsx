import { Rocket } from "lucide-react"
import Link from "next/link"

import { siteConfig } from "@/lib/site-config"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Rocket className="size-5" />
        {siteConfig.name}
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
