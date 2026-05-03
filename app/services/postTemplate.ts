export const postTemplate = async (template: {
  title: string;
  content: string;
  template_type: string;
  keywords: string[];
  user_id: string;
}) => {
  const response = await fetch("/api/supabase", {
    method: "POST",
    body: JSON.stringify(template),
  });
  return response.json();
};
