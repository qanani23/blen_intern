// app/api/debug/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return NextResponse.json({ hasSession: false });

  try {
    const decoded = await auth.verifySessionCookie(session, true);
    return NextResponse.json({ hasSession: true, uid: decoded.uid, claims: decoded });
  } catch (err) {
    return NextResponse.json({ hasSession: false, error: String(err) });
  }
}