import { useMediaQuery } from "usehooks-ts"

import { BREAKPOINTS } from "@/lib/breakpoints"

// 모바일 여부 판단 (SSR 하이드레이션 불일치 방지를 위해 초기값은 false)
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`, {
    initializeWithValue: false,
  })
}
