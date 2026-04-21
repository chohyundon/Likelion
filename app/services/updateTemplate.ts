import { DatabaseDocument } from "@/types/database";
import { createClient } from "../lib/supabase/client";

export const updateTemplate = async (
  templateId: string,
  template: DatabaseDocument
) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("템플릿")
    .update(template)
    .eq("id", templateId);
  if (error) console.error(error);
  return error;
};
