import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password, action } = await request.json();

  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin-session", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return res;
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin-session", "authenticated", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: "lax",
  });
  return res;
}
