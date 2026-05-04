import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, content, keywords, template_type, user_id } =
    await request.json();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("템플릿")
    .insert([{ title, content, keywords, template_type, user_id }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error });
}
