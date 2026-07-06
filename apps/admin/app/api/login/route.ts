import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "joshuaomatsuli01@gmail.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin password is not configured" }, { status: 503 });
  }

  if (email !== ADMIN_EMAIL.toLowerCase() || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid admin login" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("cloneforge_admin", "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}

