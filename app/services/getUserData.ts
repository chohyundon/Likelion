"use server";

import { createClient } from "@/app/lib/supabase/server";

export const getUserData = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("템플릿")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
  }
  return data;
};
