import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  console.log({ username, password });

  const correctPassword = process.env.ADMIN_PASSWORD;
  if (username === "admin") {
    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  }
}
