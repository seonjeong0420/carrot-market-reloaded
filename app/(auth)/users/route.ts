import { NextRequest } from "next/server";

// GET Request
export async function GET(request: NextRequest) {
  console.log(request); // http://localhost:3000/api/users 접속 시 json 파일 화면에 렌더링 해준다.
  return Response.json({
    ok: true,
  });
}

// POST : data를 얻기 위해서는 request의 body를 읽어야 한다.
export async function POST(request: NextRequest) {
  // request.cookies.get("");
  const data = await request.json();
  return Response.json(data);
}
