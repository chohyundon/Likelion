import { Template } from "@/app/template/template";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SECTION_MARKERS = {
  title: "[제목]",
  body: "[본문]",
  keywords: "[키워드]",
} as const;

function parseStructuredOutput(raw: string): {
  title: string;
  body: string;
  keywords: string;
} {
  const text = raw?.trim() ?? "";
  const allMarkers = [
    SECTION_MARKERS.title,
    SECTION_MARKERS.body,
    SECTION_MARKERS.keywords,
  ];
  const findSection = (marker: string) => {
    const start = text.indexOf(marker);
    if (start === -1) return "";
    const from = start + marker.length;
    const next = allMarkers
      .filter((m) => m !== marker)
      .map((m) => text.indexOf(m, from))
      .filter((i) => i >= 0)
      .sort((a, b) => a - b)[0];
    const end = next ?? text.length;
    return text.slice(from, end).trim();
  };
  return {
    title: findSection(SECTION_MARKERS.title),
    body: findSection(SECTION_MARKERS.body),
    keywords: findSection(SECTION_MARKERS.keywords),
  };
}

export async function POST(request: Request) {
  const { selectedTemplate, blogTitleValue, blogDescriptionValue, keywords } =
    await request.json();

  const template = Template.find((t) => t.id === selectedTemplate);

  const message = `
다음 조건에 맞게 블로그 글을 작성해주세요.

## 템플릿/형식
${template?.template ?? "자유 형식"}

## 입력 정보
- 블로그 제목 아이디어: ${blogTitleValue ?? ""}
- 상세 설명: ${blogDescriptionValue ?? ""}
- 핵심 키워드: ${Array.isArray(keywords) ? keywords.join(", ") : keywords ?? ""}

## 응답 형식 (반드시 아래 구분자로 구분해서 작성)
${SECTION_MARKERS.title}
(여기에 블로그 제목 한 줄만 작성)

${SECTION_MARKERS.body}
(여기에 본문 전체 작성 - 마크다운 가능)

${SECTION_MARKERS.keywords}
(여기에 핵심 키워드를 쉼표로 구분해서만 작성)
`.trim();

  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: message,
  });

  const rawText =
    typeof response.output_text === "string"
      ? response.output_text
      : String(response.output ?? "");

  const parsed = parseStructuredOutput(rawText);

  return Response.json({
    title: parsed.title,
    body: parsed.body,
    keywords: parsed.keywords,
    raw: rawText,
  });
}
