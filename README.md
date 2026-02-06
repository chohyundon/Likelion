# self

Next.js(App Router) + TypeScript + Tailwind CSS 프로젝트입니다.

## 프로젝트 구조

```
self/
├── app/                 # App Router (페이지, 레이아웃, 글로벌 스타일)
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx        # 홈 페이지
│   └── globals.css     # 전역 CSS
├── components/         # 재사용 UI 컴포넌트
├── lib/                # 유틸, 헬퍼 함수
│   └── utils.ts        # cn() 등
├── types/              # 공통 TypeScript 타입
├── public/             # 정적 파일 (이미지, 아이콘 등)
├── next.config.ts
├── tailwind (postcss.config.mjs)
└── tsconfig.json
```

## 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 스크립트

| 명령어          | 설명             |
| --------------- | ---------------- |
| `npm run dev`   | 개발 서버 실행   |
| `npm run build` | 프로덕션 빌드    |
| `npm run start` | 빌드 결과물 실행 |
| `npm run lint`  | ESLint 실행      |

## 참고

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
