import { NextResponse } from "next/server";

export async function POST(request: Request) {
  debugger;
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (password === correctPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
