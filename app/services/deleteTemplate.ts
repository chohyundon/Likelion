import { createClient } from "../lib/supabase/client";

export const deleteTemplate = async (templateId: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("템플릿").delete().eq("id", templateId);
  if (error) console.error(error);
  return error;
};
