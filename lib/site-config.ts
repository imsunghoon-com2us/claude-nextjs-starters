import {
  BarChart3,
  Home,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
}

// 사이트 전역 설정: 이름, 설명, 내비게이션을 한 곳에서 관리
export const siteConfig = {
  name: "Next.js Starter",
  description:
    "Next.js 16, TypeScript, Tailwind CSS, shadcn/ui로 빠르게 시작하는 모던 웹 스타터킷",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com",
  mainNav: [
    { title: "홈", href: "/" },
    { title: "대시보드", href: "/dashboard" },
    { title: "예제", href: "/examples" },
    { title: "로그인", href: "/login" },
  ] satisfies NavItem[],
  dashboardNav: [
    { title: "개요", href: "/dashboard", icon: Home },
    { title: "분석", href: "/dashboard/analytics", icon: BarChart3 },
    { title: "설정", href: "/dashboard/settings", icon: Settings },
  ] satisfies NavItem[],
}
