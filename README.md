# Carrot Market CloneCode

## Tech

- Next.js 14
- Tailwind CSS ([daisyUI](https://daisyui.com/) 매우 유용한 플러그인)
- Prisma
- Zod
  - coerce(=강제) : user가 입력한 string을 number로 변환을 시도

## VSCode 확장 프로그램

- Tailwind CSS IntelliSense

### Install Package

- npm install @heroicons/react
  - [Document][https://github.com/tailwindlabs/heroicons]
- npm install @tailwindcss/forms
- npm install Zod
  - 유효성 검사 라이브러리
- npm install validator
  - 수많은 validator를 모아놓은 라이브러리
- npm i --save-dev @types/validator

### NextJS

#### Server Action - api/route.ts

- NextJS에게 route.ts 파일이 **API Route** 라고 알려준다.
- HTTP Request를 받아서 json을 반환하거나 사용자를 다른 페이지로 이동시켜준다. (route.ts는 UI를 렌더링 하지 않는다.)
- NextRequest : Request를 사용하는 것보다 IP, Cookies, 현재 URL 정보, 이동할 URL 정보 등 더 다양한 사용자 정보를 얻어올 수가 있다.

1. Server Action 방식이 나오기 이전에 사용하던 Router Handler 방식

- useState, useEffect, onCh ange 등 여러 hook 사용 필요

```bash
const Login = (props: Props) => {
  const onClickTestPost = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: "nico",
        password: "1234",
      }),
    });

    console.log(await response.json());
  };

  return (
    <span onClick={onClickTestPost}>
      <FormBtn text="Login" isLoading={false} />
    </span>
  )
};
```

2. Server Action 방식

- click function 내부에 **'use server'** 만 작성해주면, DATA Fetching이 된다. (POST 방식으로)
- ReactJS에서 제공하는 FormData를 사용하기 위해서는 input에서 name이 굉장히 중요하다.

```bash
const Login = (props: Props) => {
  const handleFormSubmit = async (formData: FormData) => {
    "use server"; // POST Action이 발생한다.
    console.log("I run in the server");
    console.log(formData.get("email"), formData.get("password")); // route 핸들러로 데이터 전달하기
  };

  return (
    <form className="flex flex-col gap-3" action={handleFormSubmit}>
      <FormInput
        type="email"
        name="email"
        isRequired
        placeholder="Email"
        errors={[""]}
      />
    </form>
  )
}
```

##### useFormStatus HOOK

- form action의 작업 상태를 알려주는 hook (ReactJS에서 제공)
- 다만, Form의 자식 요소, 자식 component에서만 사용할 수가 있다. (Form과 같은 곳에서는 hook을 호출할 수가 없다.)
- Hook을 사용하는 컴포넌트는 **'use client'**를 작성해주어야 한다.
- 사용 예제 : components/form-btn.tsx 파일 참고

```bash
const { pending } = useFormStatus();
```

##### useFormState HOOK

- form action의 결과값을 알기 위해 사용하는 hook (배열을 return)
- form 의 action을 첫번째 인자로 받고, 두번째 인자로 초기값을 선언해야 한다.
- dispatch는 useFormState 첫번째 인자의 결과값을 지켜본 후 state에 결과를 담아서 돌려준다.
- 결과값을 배열로 받는다.
  - 배열의 첫번째 아이템은 dispatch가 반환하는 값
  - 배열의 두번째 아이템은 dispatch를 실행하는 트리거 (=FormAction)
- 이 훅은 action이 return한 새로운 state로 UI가 업데이트 되기를 원하기 때문에 **'use client'**를 작성해주어야 한다. (클라이언트 컴포넌트)

```bash
const [state, dispatch] = useFormState(FormAction, null);
```

### Zod

object로 데이터를 검증할 경우, errors 결과를 fieldErrors로 받아올 수가 있다.

1. 필수 사용

- transform : 무조건 return이 있어야 한다.
- refine() : object 안에 있는 데이터를 validation 체크하고 싶을 때 사용

```bash
import { z } from "zod";

z.object({
  username: z.string().trim().transform((username) => `🔥${username}🔥`).refine(checkUsername, "no tomato alllowed."),
  password: z.string().min(PASSWORD_MIN_LENNGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  email: z.string().email()
})

const phoneSchema = z.string().trim().refine(validator.isMobilePhone, "ko-KR"); //한국 전화번호만 받게 하고 싶은 경우

```

2. 선택적 사용

- 필수이 아닌 경우 optional을 사용하면 된다.

```bash
  username: z.string().min(3).max(10).optional,
```
