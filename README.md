# Carrot Market CloneCode

## Tech

- Next.js 14
- Tailwind CSS ([daisyUI](https://daisyui.com/) 매우 유용한 플러그인)
- Prisma

## VSCode 확장 프로그램

- Tailwind CSS IntelliSense

### Install Package

- npm install @heroicons/react
  - [Document][https://github.com/tailwindlabs/heroicons]
- npm install @tailwindcss/forms

### NextJS

#### Server Action - api/route.ts

- NextJS에게 route.ts 파일이 **API Route** 라고 알려준다.
- HTTP Request를 받아서 json을 반환하거나 사용자를 다른 페이지로 이동시켜준다. (route.ts는 UI를 렌더링 하지 않는다.)
- NextRequest : Request를 사용하는 것보다 IP, Cookies, 현재 URL 정보, 이동할 URL 정보 등 더 다양한 사용자 정보를 얻어올 수가 있다.

1. Server Action 방식이 나오기 이전에 사용하던 Router Handler 방식

- useState, useEffect, onChange 등 여러 hook 사용 필요

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
- input에서 name이 굉장히 중요하다.

```bash
const Login = (props: Props) => {
  const handleFormSubmit = async () => {
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
