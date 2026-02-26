import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "요청 본문이 올바른 JSON이 아닙니다." },
        { status: 400 }
      );
    }

    const {
      topic,
      keywords: rawKeywords,
      style: rawStyle,
      blogTitleValue,
      blogDescriptionValue,
      selectedTemplate,
    } = body as Record<string, unknown>;

    const topicStr =
      typeof topic === "string"
        ? topic
        : typeof blogTitleValue === "string"
        ? blogTitleValue
        : "";
    const description =
      typeof blogDescriptionValue === "string" ? blogDescriptionValue : "";
    const keywords = Array.isArray(rawKeywords)
      ? rawKeywords.map((k) => String(k))
      : [];
    const styleKey =
      typeof rawStyle === "string"
        ? rawStyle.toLowerCase()
        : typeof selectedTemplate === "string"
        ? selectedTemplate
            .toLowerCase()
            .replace(/_/g, "-")
            .replace("trouble-shooting", "troubleshooting")
        : "tutorial";

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "서버 설정 오류입니다." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = getSystemPrompt(styleKey);
    const userPrompt = `
주제: ${topicStr}
${description ? `상세 설명: ${description}\n` : ""}
키워드: ${keywords.length ? keywords.join(", ") : "(없음)"}

위 주제와 키워드를 바탕으로 기술 블로그 글을 작성해주세요.
`.trim();

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    let result: Record<string, unknown> = {};
    if (content) {
      try {
        result = JSON.parse(content);
      } catch {
        result = { title: "", content, keywords: [], metaDescription: "" };
      }
    }

    const keywordsResult = Array.isArray(result.keywords)
      ? result.keywords
      : Array.isArray(result.hashtags)
      ? result.hashtags
      : [];
    return NextResponse.json({
      ...result,
      keywords: keywordsResult,
    });
  } catch (error) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const status =
      message.includes("400") || message.includes("Invalid") ? 400 : 500;
    return NextResponse.json(
      { error: "글 생성에 실패했습니다.", details: message },
      { status }
    );
  }
}

function getSystemPrompt(style: string): string {
  const basePrompt = `당신은 기술 블로그 전문 작가입니다.
사용자가 제공한 주제와 키워드를 바탕으로 기술 블로그 글을 작성합니다.

응답은 반드시 아래 JSON 형식으로만 해주세요:
{
  "title": "SEO에 최적화된 제목",
  "content": "마크다운 형식의 본문",
  "keywords": ["키워드1", "키워드2", "키워드3"],
  "metaDescription": "SEO 메타 설명 (160자 이내)"
}`;

  const styleGuides: Record<string, string> = {
    deep_dive: `
글 구조:
1. 개요: 무엇을 배울 수 있는지 소개
2. 사전 준비: 필요한 환경/지식
3. Step 1, 2, 3...: 단계별 설명 (코드 예시 포함)
4. 마무리: 요약 및 다음 학습 방향`,
    til: `
글 구조:
1. 오늘 배운 것: 핵심 개념 요약
2. 상세 내용: 코드 예시와 함께 설명
3. 어려웠던 점: 겪은 문제와 해결 과정
4. 느낀 점: 개인적인 소감`,
    troubleshooting: `
글 구조:
1. 문제 상황: 발생한 에러/문제 설명
2. 원인 분석: 왜 이 문제가 발생했는지
3. 해결 방법: 단계별 해결 과정 (코드 포함)
4. 결론: 배운 점과 예방법`,
  };

  const normalized = style
    .toLowerCase()
    .replace(/_/g, "-")
    .replace("trouble-shooting", "troubleshooting");
  return basePrompt + (styleGuides[normalized] ?? styleGuides.tutorial);
}
