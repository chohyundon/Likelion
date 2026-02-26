import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 보호할 경로
  const protectedPaths = ["/write"];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !session) {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
