# Next.js 모던 웹 스타터킷

Next.js 16 App Router 기반으로 바로 서비스 개발을 시작할 수 있는 스타터킷입니다.

## 기술 스택

- Next.js 16 (App Router, Turbopack, Cache Components)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (`base-nova` 스타일, @base-ui 기반) + lucide-react
- next-themes (다크모드), react-hook-form + zod (폼 검증), sonner (토스트)
- date-fns (날짜), usehooks-ts (범용 훅)

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run lint
```

## 페이지

| 경로 | 설명 |
|---|---|
| `/` | 랜딩 (Hero / Features / CTA) |
| `/examples` | 설치된 컴포넌트·훅 사용 예제 모음 |
| `/dashboard` | 사이드바 대시보드 (통계 카드, 테이블) |
| `/dashboard/settings` | 설정 (Tabs, 폼 검증, localStorage 환경설정, 확인 다이얼로그) |
| `/dashboard/analytics` | 분석 (빈 상태 예시) |
| `/login`, `/signup` | 인증 폼 UI (백엔드 연동 없음) |

## 디렉터리 구조

```
app/
├── (marketing)/   # 헤더 + 푸터 레이아웃
├── (dashboard)/   # 사이드바 레이아웃
└── (auth)/        # 중앙 정렬 카드 레이아웃
components/
├── ui/            # L1 shadcn 기본 컴포넌트 (CLI로 생성)
├── common/        # L2 도메인 무관 공통 블록
├── layout/        # L3 헤더, 푸터, 사이드바 등 페이지 골격
├── sections/      # L4 랜딩 섹션
├── forms/         # L4 검증 포함 폼
└── providers/     # 전역 Provider
lib/               # site-config, breakpoints, format, validations
hooks/             # 라이브러리 훅 래퍼
```

**의존 규칙**: `ui → common → layout / sections / forms → app` (상위 계층만 하위 계층을 import)

## 커스터마이징

- 사이트 이름, 설명, 내비게이션: `lib/site-config.ts`
- 테마 색상: `app/globals.css`의 CSS 변수
- 컴포넌트 추가: `npx shadcn@latest add <name>`
  (@base-ui 기반이므로 `asChild` 대신 `render` prop을 사용합니다)
- 환경변수: `NEXT_PUBLIC_SITE_URL` (메타데이터 기준 URL)

## 참고

`next.config.ts`에서 `cacheComponents`가 활성화되어 있어, 요청 시점 값(`new Date()` 등)이나
동적 데이터는 `<Suspense>` 또는 `"use cache"`로 처리해야 합니다.
