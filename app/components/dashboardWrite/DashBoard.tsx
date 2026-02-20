"use client";

import { useState } from "react";
import Button from "../button/Button";
import { TEMPLATES } from "@/app/constants/Template";
import WriteSectionHeader from "../write/Header/WriteSectionHeader";
import WriteInfoToolTip from "../write/infoTooltip/WriteInfoToolTip";
import LoadingComponent from "../Loading/Loading";
import { CheckCircle, Lightbulb, X } from "lucide-react";

const RECOMMENDED_KEYWORDS = ["JavaScript", "Optimization", "Web Dev"];

const NAVY = {
  bg: "bg-navy-950",
  card: "bg-navy-900",
  cardBorder: "border-navy-700",
  input: "bg-navy-800/50 border-navy-600 text-white placeholder:text-slate-500",
};

const inputBase =
  "w-full rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all " +
  NAVY.input;
const sectionCard =
  "p-6 rounded-xl border shadow-lg " + NAVY.card + " " + NAVY.cardBorder;
const templateCardBase =
  "group cursor-pointer border-2 p-4 rounded-xl transition-all";
const keywordTag =
  "flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/30";
const suggestionBtn =
  "text-xs font-medium px-2 py-1 bg-slate-700/80 text-slate-300 rounded hover:bg-slate-600 transition-colors";

export default function DashBoardWrite() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("til");
  const [blogTitleValue, setBlogTitleValue] = useState<string>("");
  const [blogDescriptionValue, setBlogDescriptionValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([
    "React",
    "성능 최적화",
    "프론트엔드",
  ]);
  const [keywordInput, setKeywordInput] = useState("");

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
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTemplate,
          blogTitleValue,
          blogDescriptionValue,
          keywords,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(data?.error ?? "요청 실패");
        return;
      }
      console.log(data.title, data.body, data.keywords);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

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

          <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-600 border border-slate-600 transition-colors">
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
                      {tpl.icon}
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
