import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: message,
  });

  return Response.json({
    text: response.output_text,
  });
}
