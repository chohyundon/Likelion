import { createClient } from "@/app/lib/supabase/server";
import { createServiceRoleClient } from "@/app/lib/supabase/admin";
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

  let admin;
  try {
    admin = createServiceRoleClient();
  } catch {
    return NextResponse.json(
      {
        error:
          "서버에 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다. Vercel 환경 변수를 확인해 주세요.",
      },
      { status: 500 }
    );
  }

  const { data, error } = await admin
    .from("템플릿")
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
