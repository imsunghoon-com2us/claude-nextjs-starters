@AGENTS.md

# 프로젝트 개요

Next.js 16.4 App Router 스타터킷 (React 19.3, Tailwind v4, shadcn `base-nova`/@base-ui, zod 4).
인증·데이터 연동 없음 (UI·검증·목업만). 디렉터리 구조와 페이지 목록은 README.md 참고.

## 명령어

패키지 매니저는 **npm** (`package-lock.json` 기준, bun 사용 금지).

- `npm run dev` / `npm run build` / `npm run lint` (테스트 프레임워크 없음)
- 컴포넌트 추가: `npx shadcn@latest add <name>` (`components/ui/`는 CLI 생성물이므로 직접 새로 작성하지 않기)

## Next.js 16 주의사항

- 코드 작성 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 확인 (학습 데이터와 API가 다를 수 있음)
- `cacheComponents` + `partialPrefetching` 활성: 요청 시점 값(`new Date()`, cookies 등)과 동적 데이터는 `<Suspense>` 또는 `"use cache"`로 처리
- 현재 Server Actions, `proxy.ts`(구 middleware) 없음
- 페이지는 정적 `export const metadata` 사용 (title은 루트 템플릿 `%s | 사이트명`)

## 아키텍처

- 라우트 그룹: `(marketing)` 헤더+푸터 / `(auth)` 중앙 카드 / `(dashboard)`는 `dashboard/layout.tsx`에서 사이드바 구성
- 계층 의존 규칙: `ui → common → layout·sections·forms → app` (상위 계층만 하위 계층을 import)
- 전역 Provider: `components/providers/app-providers.tsx` (Theme → Tooltip → Toaster)
- 사이트명·내비게이션: `lib/site-config.ts` (하드코딩 금지)
- 페이지·레이아웃은 서버 컴포넌트, `"use client"`는 인터랙션이 필요한 리프 컴포넌트에만

## 코딩 규칙

- shadcn은 @base-ui 기반: `asChild` 금지, `render` prop 사용. Button이 Link 등 비버튼 요소를 렌더하면 `nativeButton={false}` 필수
  - 예: `<Button nativeButton={false} render={<Link href="/" />}>홈</Button>`
- `cn`은 `@/lib/utils`에서 import (npm `cn` 패키지 re-export, clsx/tailwind-merge 아님)
- 파일명 kebab-case, named export만 사용 (default export는 Next 특수 파일만), 경로 별칭 `@/*`
- 스타일: 세미콜론 없음, 큰따옴표, import는 외부 패키지 → 빈 줄 → `@/` 순서
- UI 문구는 한국어, 날짜 포맷은 `lib/format.ts` (date-fns `ko`)
- usehooks-ts의 저장소/미디어쿼리 훅은 `initializeWithValue: false` (하이드레이션 불일치 방지)
- 테마 색상은 `app/globals.css`의 CSS 변수 (tailwind.config 없음, v4 CSS-first)

## 폼 패턴

- 스키마는 `lib/validations/*.ts`, zod 4 문법(`z.email()`), 타입은 `z.infer`로 export
- `useForm` + `zodResolver` + `register`, `<form noValidate>`
- `Field`(`data-invalid`) > `FieldLabel` + `Input`(`aria-invalid`) + `FieldError`
- 제출 중 `disabled={isSubmitting}` + `LoadingSpinner`, 결과 알림은 sonner `toast`, 서버 에러는 `setError("root")`

## 작업 완료 전 검증

- `npm run lint && npm run build` 통과
- UI 변경은 Playwright MCP로 실제 화면 확인 (`/examples`에서 컴포넌트 동작 확인 가능)

## 프로젝트 도구

- `/git:commit`: 이모지 + 컨벤셔널 커밋
- `code-reviewer` 서브에이전트: 읽기 전용 코드 리뷰
- MCP: shadcn (컴포넌트 검색), context7 (라이브러리 문서), playwright (브라우저 검증)
