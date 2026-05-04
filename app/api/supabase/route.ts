import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, content, keywords, template_type, user_id } =
    await request.json();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "인증이 필요합니다. 다시 로그인해 주세요." },
      { status: 401 }
    );
  }

  if (user.id !== user_id) {
    return NextResponse.json(
      { error: "요청한 사용자와 로그인 사용자가 일치하지 않습니다." },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("템플릿")
    .insert([{ title, content, keywords, template_type, user_id }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error });
}
