import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = { title: "대시보드" }

// 샘플 데이터 (실제 서비스에서는 API/DB 데이터로 교체)
const stats = [
  { title: "총 매출", value: "₩45,231,000", icon: DollarSign },
  { title: "신규 가입", value: "+2,350", icon: Users },
  { title: "결제 건수", value: "+12,234", icon: CreditCard },
  { title: "활성 사용자", value: "+573", icon: Activity },
]

const activities = [
  { id: 1, name: "김민수", action: "결제 완료", status: "완료", date: "2026-10-25" },
  { id: 2, name: "이서연", action: "회원가입", status: "완료", date: "2026-10-26" },
  { id: 3, name: "박지훈", action: "환불 요청", status: "대기", date: "2026-10-26" },
  { id: 4, name: "최유진", action: "결제 시도", status: "실패", date: "2026-10-27" },
]

const statusVariant = {
  완료: "default",
  대기: "secondary",
  실패: "destructive",
} as const

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="개요" description="서비스 현황을 한눈에 확인하세요." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">{value}</CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.action}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[a.status as keyof typeof statusVariant]}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatDate(a.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
