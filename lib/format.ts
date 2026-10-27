import { format, formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

// 날짜 포맷 (예: 2026년 10월 27일)
export function formatDate(date: Date | string | number, pattern = "yyyy년 M월 d일") {
  return format(new Date(date), pattern, { locale: ko })
}

// 상대 시간 (예: 3일 전)
export function formatRelative(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
}
