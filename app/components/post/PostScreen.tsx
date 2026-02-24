"use client";

export default function PostScreen() {
  return (
    <main className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 sm:px-6 bg-navy-950 min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <a
            className="text-slate-400 text-sm font-medium hover:text-amber-400 hover:underline transition-colors"
            href="#">
            내 포스트
          </a>
          <span className="text-slate-500 material-symbols-outlined text-sm">
            chevron_right
          </span>
          <span className="text-white text-sm font-semibold">
            기술 블로그 포스트 - 2024 AI 트렌드
          </span>
        </div>
        <div className="flex h-10 w-full md:w-80 items-center justify-center rounded-lg bg-navy-800 border border-navy-600 p-1">
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-navy-700 has-[:checked]:shadow-sm has-[:checked]:text-amber-400 text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">
            <span>편집</span>
            <input
              className="hidden"
              name="view-mode"
              type="radio"
              value="Edit"
            />
          </label>
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-navy-700 has-[:checked]:shadow-sm has-[:checked]:text-amber-400 text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">
            <span>미리보기</span>
            <input
              className="hidden"
              name="view-mode"
              type="radio"
              value="Preview"
            />
          </label>
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-navy-700 has-[:checked]:shadow-sm has-[:checked]:text-amber-400 text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">
            <span className="truncate">분할 보기</span>
            <input
              defaultChecked
              className="hidden"
              name="view-mode"
              type="radio"
              value="Split View"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2 bg-navy-900 border border-navy-700 rounded-t-xl">
        <div className="flex flex-wrap items-center gap-1">
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="굵게">
            <span className="material-symbols-outlined">format_bold</span>
          </button>
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="기울임꼴">
            <span className="material-symbols-outlined">format_italic</span>
          </button>
          <div className="w-px h-6 bg-navy-600 mx-1" />
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="코드 블록">
            <span className="material-symbols-outlined">code</span>
          </button>
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="링크">
            <span className="material-symbols-outlined">link</span>
          </button>
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="이미지">
            <span className="material-symbols-outlined">image</span>
          </button>
          <div className="w-px h-6 bg-navy-600 mx-1" />
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="글머리 기호">
            <span className="material-symbols-outlined">list</span>
          </button>
          <button
            className="p-2 text-slate-300 hover:bg-navy-700 rounded transition-colors"
            title="번호 매기기">
            <span className="material-symbols-outlined">
              format_list_numbered
            </span>
          </button>
          <div className="w-px h-6 bg-navy-600 mx-1" />
          <div className="flex items-center gap-1 ml-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25 rounded-lg hover:bg-amber-500/20 transition-colors">
              <span className="material-symbols-outlined text-sm">add_box</span>
              <span>내용 확장</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-lg hover:bg-emerald-500/20 transition-colors">
              <span className="material-symbols-outlined text-sm">subject</span>
              <span>요약</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/25 rounded-lg hover:bg-purple-500/20 transition-colors">
              <span className="material-symbols-outlined text-sm">
                record_voice_over
              </span>
              <span>말투 변경</span>
            </button>
          </div>
        </div>
        <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-amber-500/15 text-amber-400 border border-amber-500/25 hover:bg-amber-500/20 transition-all font-semibold text-sm">
          <span className="material-symbols-outlined mr-2 text-[18px]">
            auto_awesome
          </span>
          <span>계속 작성하기</span>
        </button>
      </div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-px bg-navy-700 border border-t-0 border-navy-700 rounded-b-xl overflow-hidden min-h-[600px] mb-8">
        <div className="bg-navy-900 flex flex-col">
          <textarea
            className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 focus:outline-none text-white font-mono text-sm leading-relaxed resize-none placeholder:text-slate-500"
            spellCheck={false}
            defaultValue="# 2024년 AI 트렌드: 개발자를 위한 가이드 2024년은 광범위한 AI 실험의
            단계를 지나 깊이 있는 아키텍처 통합으로 전환되는 중요한 해입니다.
            개발자들에게 이는 단순한 API 호출을 넘어 '에이전틱
            워크플로우(Agentic Workflows)'를 구축하는 것을 의미합니다. ## 1.
            에이전틱 프레임워크의 부상 자율형 에이전트는 더 이상 SF 영화 속의
            이야기가 아닙니다. 우리는 LangChain과 AutoGPT와 같은 프레임워크가
            성숙해지는 것을 목격하고 있습니다."></textarea>
        </div>
      </div>
    </main>
  );
}
