import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, content, keywords, template_type } = await request.json();

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

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        content,
        keywords,
        template_type,
        user_id: user.id,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error });
}
