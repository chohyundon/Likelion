import { createClient } from "../lib/supabase/client";

export const getTemplate = async (templateId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("템플릿")
    .select("*")
    .eq("id", templateId)
    .single();
  if (error) console.error(error);
  return data;
};
