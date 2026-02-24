import { Template } from "@/app/template/template";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SECTION_MARKERS = {
  title: "[제목]",
  content: "[본문]",
  keywords: "[키워드]",
} as const;

function parseStructuredOutput(raw: string): {
  title: string;
  content: string;
  keywords: string;
} {
  const text = raw?.trim() ?? "";
  const allMarkers = [
    SECTION_MARKERS.title,
    SECTION_MARKERS.content,
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
    content: findSection(SECTION_MARKERS.content),
    keywords: findSection(SECTION_MARKERS.keywords),
  };
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "요청 본문이 올바른 JSON이 아닙니다." },
        { status: 400 }
      );
    }

    const { selectedTemplate, blogTitleValue, blogDescriptionValue, keywords } =
      body as Record<string, unknown>;

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY가 설정되지 않았습니다.");
      return Response.json({ error: "서버 설정 오류입니다." }, { status: 500 });
    }

    const template = Template.find((t) => t.id === selectedTemplate);

    const message = `
다음 조건에 맞게 블로그 글을 작성해주세요.

## 템플릿/형식
템플릿 형식은 ${template?.template}으로 작성해줘.

## 입력 정보
- 블로그 제목 아이디어: ${blogTitleValue ?? ""} (최대 100자 이내로 작성)
- 상세 설명: ${
      blogDescriptionValue ?? ""
    } (블로그에 올릴 글의 내용을 작성해야합니다.)
- 핵심 키워드: ${Array.isArray(keywords) ? keywords.join(", ") : keywords ?? ""}

## 응답 형식 (반드시 아래 구분자로 구분해서 작성)
${SECTION_MARKERS.title}
(여기에 블로그 제목 한 줄만 작성)

${SECTION_MARKERS.content}
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
      content: parsed.content,
      keywords: parsed.keywords,
    });
  } catch (err) {
    console.error("[openai] POST error:", err);
    const message = err instanceof Error ? err.message : String(err);
    const status =
      message.includes("400") || message.includes("Invalid") ? 400 : 502;
    return Response.json(
      { error: "AI 생성 중 오류가 발생했습니다.", details: message },
      { status }
    );
  }
}
