import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  const correctPassword = process.env.ADMIN_PASSWORD;
  console.log({ password, correctPassword });
  if (password === correctPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
