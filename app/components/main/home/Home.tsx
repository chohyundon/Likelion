import Footer from "../../footer/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden w-full h-full bg-navy-950">
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-8">
          <span className="material-symbols-outlined text-base">
            auto_awesome
          </span>
          GPT-4o 기반 기술 블로그 작성 지원
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl leading-[1.1] text-white">
          개발자의 글쓰기, <br />
          <span className="text-amber-400">AI로 더 스마트하게</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed">
          복잡한 기술 블로그 작성, 이제 AI와 개발자 전용 템플릿으로{" "}
          <br className="hidden md:block" /> 10분 만에 완성하세요. 코드는
          그대로, 설명은 완벽하게.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-24 w-full justify-center">
          <button className="bg-amber-500 hover:bg-amber-400 text-white text-lg font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2">
            Start for Free{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button className="bg-navy-800 border border-navy-600 text-slate-200 text-lg font-bold px-10 py-4 rounded-xl hover:bg-navy-700 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">play_circle</span> View
            Demo
          </button>
        </div>

        <div className="relative w-full max-w-5xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/50 to-purple-500/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy-600 bg-navy-900/80 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 bg-navy-800/50 border-b border-navy-600">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="text-xs font-mono text-slate-400">
                post_architecture_review.md
              </div>
              <div className="w-12"></div>
            </div>

            <div className="flex h-[400px]">
              <div className="w-1/2 border-r border-white/5 p-6 text-left font-mono text-sm overflow-hidden">
                <p className="text-amber-400 mb-2">
                  # Microservices Implementation
                </p>
                <p className="text-slate-400 mb-4">
                  In this post, we explore the challenges of service
                  discovery...
                </p>
                <div className="bg-black/40 rounded p-4 mb-4 border border-white/5">
                  <p className="text-green-400">
                    async function{" "}
                    <span className="text-blue-400">fetchService</span>() {"{"}
                  </p>
                  <p className="text-green-400 pl-4">
                    const res = await api.get(&apos;/info&apos;);
                  </p>
                  <p className="text-green-400">{"}"}</p>
                </div>
                <div className="flex items-center gap-2 text-amber-400 animate-pulse">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                  <span className="h-4 w-1 bg-amber-400"></span>
                </div>
              </div>
              <div className="w-1/2 bg-black/20 p-6 text-left relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-1 rounded border border-amber-500/30 uppercase tracking-widest">
                  AI Preview
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  마이크로서비스 구현 전략
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  서비스 디스커버리는 분산 시스템의 핵심입니다. 위의 코드
                  스니펫에서 볼 수 있듯이 비동기 통신을 통해 시스템의 유연성을
                  확보할 수 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-700/50 rounded"></div>
                  <div className="h-2 w-4/5 bg-slate-700/50 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-700/50 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border border-amber-500/30 bg-navy-900/95 backdrop-blur shadow-2xl max-w-[240px] text-left transform rotate-2 hover:rotate-0 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-400 text-sm">
                bolt
              </span>
              <span className="text-xs font-bold text-slate-200">
                AI Suggestion
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              "이 부분에 대한 시퀀스 다이어그램 설명을 추가하면 독자가 더 쉽게
              이해할 수 있습니다. 생성하시겠습니까?"
            </p>
            <button className="mt-3 w-full bg-amber-500 text-[10px] font-bold py-1.5 rounded text-white hover:bg-amber-400">
              Apply Change
            </button>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-navy-700">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
            Focus on your code, <br className="md:hidden" /> leave the rest to
            us
          </h2>
          <p className="text-slate-400">개발자만을 위해 설계된 핵심 기능</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-navy-900/50 border border-navy-700 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-amber-400 text-3xl">
                psychology
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">AI Generation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              코드 스니펫이나 키워드 몇 개만으로도 기술적으로 정확하고 깊이 있는
              초안을 즉시 생성합니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-navy-900/50 border border-navy-700 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-amber-400 text-3xl">
                markdown
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Markdown Editor
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              실시간 미리보기와 개발자 친화적인 구문 강조(Syntax Highlighting)를
              지원하는 전문 편집기입니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-navy-900/50 border border-navy-700 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-amber-400 text-3xl">
                vertical_split
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Multiple Templates
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              튜토리얼, 릴리즈 노트, 아키텍처 리뷰 등 상황에 맞는 최적의 기술
              블로그 레이아웃을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="relative rounded-3xl p-12 overflow-hidden text-center bg-amber-500 flex flex-col items-center">
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
            지금 바로 첫 글을 작성해보세요
          </h2>
          <p className="text-white/90 mb-10 text-lg relative z-10">
            수백 명의 개발자가 이미 TechWrite AI와 함께 성장하고 있습니다.
          </p>
          <button className="bg-white text-amber-600 text-lg font-bold px-12 py-4 rounded-xl shadow-2xl hover:bg-slate-100 transition-all relative z-10">
            Get Started Free
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
