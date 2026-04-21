"use client";

import { useEffect, useState } from "react";
import Button from "../button/Button";
import { TEMPLATES } from "@/app/constants/Template";
import WriteSectionHeader from "../write/Header/WriteSectionHeader";
import WriteInfoToolTip from "../write/infoTooltip/WriteInfoToolTip";
import LoadingComponent from "../Loading/Loading";
import { CheckCircle, Lightbulb, X } from "lucide-react";
import { NAVY, dashboardWriteStyles } from "./dashboardWriteStyles";
import { postOpenAi } from "@/app/services/postOpenAi";
import { createClient } from "@/app/lib/supabase/client";
import { useAuthStore } from "@/app/store/AuthStore";
import { useRouter } from "next/navigation";

const RECOMMENDED_KEYWORDS = ["JavaScript", "Optimization", "Web Dev"];

const { inputBase, sectionCard, templateCardBase, keywordTag, suggestionBtn } =
  dashboardWriteStyles;

export default function DashBoardWrite() {
  const router = useRouter();
  const supabase = createClient();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("TIL");
  const [blogTitleValue, setBlogTitleValue] = useState<string>("");
  const [blogDescriptionValue, setBlogDescriptionValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([
    "React",
    "성능 최적화",
    "프론트엔드",
  ]);
  const [keywordInput, setKeywordInput] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    content: string;
    keywords: string[];
    template: string;
  } | null>(null);
  const user = useAuthStore((state) => state.user);

  const removeKeyword = (index: number) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const addKeyword = (word: string) => {
    const trimmed = word.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
      setKeywordInput("");
    }
  };

  const handleGenerateArticle = async () => {
    setIsLoading(true);

    try {
      const response = await postOpenAi({
        selectedTemplate,
        blogTitleValue,
        blogDescriptionValue,
        keywords,
      });
      const keywordsArray =
        typeof response.keywords === "string"
          ? response.keywords
              .split(",")
              .map((k: string) => k.trim())
              .filter(Boolean)
          : Array.isArray(response.keywords)
          ? response.keywords
          : [];
      setGeneratedArticle({
        title: response.title ?? "",
        content: response.content ?? "",
        keywords: keywordsArray,
        template: selectedTemplate,
      });
    } catch (e) {
      console.error("AI 생성 실패:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 생성 성공 후 Supabase에 저장하고, 저장된 id로 /post/[id] 이동
  useEffect(() => {
    if (!generatedArticle || !generatedArticle.content.trim() || !user) return;

    const saveAndGoToPost = async () => {
      const { data, error } = await supabase
        .from("템플릿")
        .insert([
          {
            title: generatedArticle.title,
            content: generatedArticle.content,
            template_type: generatedArticle.template,
            keywords: generatedArticle.keywords,
            user_id: user.id,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error(error);
        return;
      }
      const id = data?.id;
      if (id) {
        router.push(`/post/${id}`);
      }
    };
    saveAndGoToPost();
  }, [generatedArticle, user, router]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const handleSampleView = () => {
    router.push("/post");
  };

  return (
    <main
      className={`w-full min-h-full flex flex-col overflow-y-auto ${NAVY.bg}`}>
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 pb-20">
        <section className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              블로그 콘텐츠 설정
            </h1>
            <p className="text-slate-400 text-base mt-0.5">
              아래 세부 정보를 입력하면 AI가 기술 문서를 대신 작성해 드립니다.
            </p>
          </div>

          <button
            onClick={handleSampleView}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-600 border border-slate-600 transition-colors">
            샘플 보기
          </button>
        </section>

        <section className="space-y-8">
          {/* 1. 템플릿 선택 */}
          <section className={sectionCard}>
            <WriteSectionHeader step={1} title="템플릿 선택" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TEMPLATES.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`${templateCardBase} ${
                      isSelected ? "relative " : ""
                    } ${
                      isSelected
                        ? "border-amber-500/60 bg-amber-500/10"
                        : `border-slate-600/50 ${NAVY.card} hover:border-slate-500`
                    } text-left`}>
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-amber-400">
                        <CheckCircle className="size-5" />
                      </div>
                    )}
                    <span
                      className={`text-3xl mb-2 block ${
                        isSelected ? "text-amber-400" : "text-slate-500"
                      }`}>
                      <tpl.icon className="size-8 text-amber-300" />
                    </span>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {tpl.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{tpl.description}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. 주제 입력 */}
          <section className={sectionCard}>
            <WriteSectionHeader
              step={2}
              title="주제 입력"
              tooltip="최대한 구체적으로 작성하세요. 사용하는 기술 스택과 핵심 문제 또는 개념을 포함하면 더 좋은 글이 생성됩니다."
            />
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-sm font-semibold text-slate-300">
                    블로그 제목 아이디어
                  </label>
                  <WriteInfoToolTip text="독자의 관심을 끌 수 있는 키워드를 포함한 제목을 입력하세요." />
                </div>
                <input
                  className={inputBase}
                  placeholder="예: useMemo를 활용한 React 성능 최적화 방법"
                  type="text"
                  value={blogTitleValue}
                  onChange={(e) => setBlogTitleValue(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-sm font-semibold text-slate-300">
                    상세 설명 (AI 컨텍스트)
                  </label>
                  <WriteInfoToolTip text="다루고 싶은 내용을 간략히 설명하세요. 특정 라이브러리, 버전, 또는 상황을 명시하면 좋습니다." />
                </div>
                <textarea
                  className={`${inputBase} resize-none`}
                  placeholder="어떤 내용을 다루고 싶은지 간단히 설명해 주세요..."
                  rows={4}
                  value={blogDescriptionValue}
                  onChange={(e) => setBlogDescriptionValue(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* 3. 핵심 키워드 */}
          <section className={sectionCard}>
            <WriteSectionHeader step={3} title="핵심 키워드" />
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 p-3 bg-slate-800/40 border border-slate-600/50 rounded-lg min-h-[50px]">
                {keywords.map((kw, i) => (
                  <span key={`${kw}-${i}`} className={keywordTag}>
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(i)}
                      className="cursor-pointer hover:opacity-80"
                      aria-label={`${kw} 제거`}>
                      <X className="size-4 text-slate-400 hover:text-white" />
                    </button>
                  </span>
                ))}
                <input
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white min-w-[120px] focus:ring-0 placeholder:text-slate-500"
                  placeholder="키워드 추가..."
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addKeyword(keywordInput);
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-xs text-slate-400">추천 키워드:</p>
                <div className="flex gap-2">
                  {RECOMMENDED_KEYWORDS.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => addKeyword(kw)}
                      className={suggestionBtn}>
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-3">
              <Lightbulb className="size-8 text-amber-400" />
              <div>
                <p className="text-white font-bold leading-none">
                  생성할 준비가 되셨나요?
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  AI가 몇 초 안에 초안을 작성해 드립니다.
                </p>
              </div>
            </div>
            <Button onClick={handleGenerateArticle}>AI 글 생성하기</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
