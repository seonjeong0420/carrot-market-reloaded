# Carrot Market CloneCode

📍 parenthess(괄호)를 사용한 folder naming은 URL에 전혀 영향이 없다.

- () 안에 layout.tsx를 두면, 해당 폴더에서만 적용이 된다.
  다시 말해, auth 폴더 안의 layout.tsx는 auth 폴더 내부에 있는 .tsx 파일에서만 layout이 적용된다.

## Tech

- Next.js 14
- Tailwind CSS ([daisyUI](https://daisyui.com/) 매우 유용한 플러그인)
- Prisma
  - .env 파일을 .gitignore에 넣는게 가장 중요하다
- Zod
  - coerce(=강제) : user가 입력한 string을 number로 변환을 시도

## VSCode 확장 프로그램

- Tailwind CSS IntelliSense
- Prisma
- SQLite

### Install Package

- npm install @heroicons/react
  - [Document][https://github.com/tailwindlabs/heroicons]
- npm install @tailwindcss/forms
- npm install Zod
  - 유효성 검사 라이브러리
- npm install validator
  - 수많은 validator를 모아놓은 라이브러리
- npm i --save-dev @types/validator
- npm i prisma
- npx prisma init

  - npx prisma migrate dev (-> add_user 작성 후 enter)
  - npx prisma studio

- npm i bcrypt
  - 비밀번호를 hashing 할 수 있게 해주는 패키지
- npm i @types/bcrypt
- npm i iron-session
- npm i react-hook-form
- npm i @hookform/resolvers
  - Zod schema를 사용해서 form을 validation 할 수 있게 해주는 라이브러리

### NextJS

- Intl API

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

#### React Image 컴포넌트

layout shift를 방지하기 위해 Image 컴포넌트를 사용하자.

- width, height 속성 부여
- fill 속성 사용하기 (=object-fit:cover)

```bash
<Image width={28} height={28} src={photo} alt={title} quality={100} />
<Image fill src={photo} alt={title} quality={100} />
```

#### Intercepting Routes

[Next 공식문서](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
애플리케이션의 다른 부분에서 현재의 레이아웃으로 route를 불러올 수 있도록 도와주는 API
(..) -> ../ 이런 식으로 상대경로를 의미

### Zod

object로 데이터를 검증할 경우, errors 결과를 fieldErrors로 받아올 수가 있다.

1. 필수 사용

- transform : 무조건 return이 있어야 한다.
- refine() : object 안에 있는 데이터를 validation 체크하고 싶을 때 사용
- superRefine() : superRefine()에 정의된 validation 외에 다른 refine 실행되지 않는다.

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

### Prisma

ORM으로 객체를 schema로 정의한 후에 그 객체와 내가 선택한 database를 연결해주는 매개체
개발자가 타입스크립트를 사용하여 쉽게 데이터베이스를 조작할 수 있도록 도와준다.

1. npm install prisma하면, .env & prisma 폴더가 자동으로 생성
2. .env 파일 내부 컨텐츠 수정 **DATABASE_URL="file:./database.db"**
3. prisma/schema.prisma 컨텐츠의 datasource db - provider 내용 수정 및 model User 추가

```bash
// sqlite : 프로젝트 내부에 database 파일 갖고 있으면 된다.
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id Int @id @default(autoincrement()) // 첫번째 사용자의 id는 자동으로 1 설정
  username String @unique
  email String? @unique // sms으로 로그인 할 수도 있기 때문에 선택값
  password String? // sms으로 로그인 할 수도 있기 때문에 선택값
  phone String? @unique
  github_id String? @unique
  avatar String? @default("http://dkdkdkdkdk.com/dldl.jpg")
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt // 사용자의 수정이 있을 때마다 시간 저장
}
```

4. npx prisma migrate dev -> add_user 입력 후 enter
5. prisma 폴더에 migrations와 database.db 파일 자동 생성

**Prisma 사용 방법**

- schema.prisma 파일을 변경하고 싶다면, schema.prisma의 새로운 컬럼이나, model을 추가/수정하고 나서 migrate 해야 한다. 그리고 변경사항을 studio에 반영하고 싶다면, **studio를 재시작** 해주어야 한다.

1.  npx prisma migrate dev (-> 변경사항이 있는 database 작성 후 enter)
2.  npx prisma studio

**Prisma 쿼리 작성 방법**

- database의 username에서 'dbdb'를 갖고 있는 쿼리 find

```bash
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const test = async () => {
  const user = await db.user.findMany({
    where: {
      username: {
        contains: "dbdb",
      },
    },
  });
  console.log(user);
};

test();

export default db;

```

**Password 해싱**
해싱 : 기본적으로 유저가 보낸 비밀번호를 변환하는 것 (암호화, 단방향)

### MiddleWare

[NextJS 공식문서](https://nextjs.org/docs/pages/building-your-application/routing/middleware)
middleware는 Edge runtime에 실행된다. (실제로는 Node.js에서 실행되지 않는다.)

- Edge runtime : node.js API의 경량 버전.

page 바뀔 때 뿐만 아니라 브라우저가 css 파일을 다운로드 하거나 javascript, favicon 등 다운로드 할 때에도 실행된다.

- 파일 위치 : /middleware.ts
