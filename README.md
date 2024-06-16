# Carrot Market Reloaded

## 기술 스택

- Next.js 14
- Prisma
- Tailwind css ([daisyUI](https://daisyui.com/) 매우 유용한 플러그인)
-

### VSCode 확장 프로그램

- Tailwind CSS IntelliSense

## TailwindCSS

### tailwind.config.ts

theme를 통해 css 속성을 추가 커스텀 할 수가 있고, 서버 재구동 없이 바로 compiler 자동완성 기능으로 사용할 수가 있다.

```bash
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    margin: {
      'tomato': '120px'
    },
    borderRadius: {
      'radius-point': '11.11px'
    }
  },
  plugins: [],
};
```

### globlas.css

- @tailwind base;
  - reset css 역할과 동일
- @tailwind components;
- @tailwind utilities;
  - className에 사용한 css를 정의

### 스타일 컴포넌트

css 파일 내 클래스 네임 정의 후 **@apply** 선언 후에 클래스 작성하면 된다.

```bash
@layer base {
  a {
    @apply text-blue-500;
  }
}

/* 컴포넌트 추상화 하는 방법 */
@layer components {
  .btn {
    @apply bg-gradient-to-tr from-cyan-500 via-blue-300 to-purple-400 text-white py-2 rounded-full transition-transform font-medium active:scale-90 focus:scale-90 peer-required:bg-green-500;
  }
}
```
