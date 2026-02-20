import DashBoardHeader from "./dashboardHeader/DashBoardHeader";

export default function DashBoard() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 min-h-0 flex flex-col overflow-y-auto bg-navy-950">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* PageHeading */}
          <DashBoardHeader />
          {/* Section: Start a New Post */}
          <section className="mb-12">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Start a New Post
            </h3>
            {/* ImageGrid for Templates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group flex flex-col gap-4 p-4 rounded-xl border border-navy-700 bg-navy-900 hover:border-amber-500/50 transition-all cursor-pointer">
                <div className="w-full aspect-video bg-navy-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                    data-alt="Technical tutorial illustration with code blocks"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl-qHQRAK-MqX16boXiNYtR9BntrSBZ_Fie-PGeElefzmOW10a2X-6AaLBlGUiaw76ILd1DwaViiM19CoY4LL65z1yb2dl9dS7wfaC52gJo4ok4g3Qtz1FJhiJggiAg51ESAEtlqNqJ_EHLMtApKV8t0BU_3Sd5eZM6QuE_Injn8hhSVzoxmxD-WxW96l1pPpSD_chY_erCZPMR-BeFQ707eKdlTmG4Ff0hZMXsFk6K8tX84tvCGOeLoMDxt-zJp0OAC9oOmIEvRUf"
                  />
                </div>
                <div>
                  <p className="text-white text-base font-bold">Tutorial</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Comprehensive step-by-step technical guides with code
                    snippets.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 p-4 rounded-xl border border-navy-700 bg-navy-900 hover:border-amber-500/50 transition-all cursor-pointer">
                <div className="w-full aspect-video bg-navy-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                    data-alt="Light bulb icon for knowledge sharing"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBztSdL_iDDMF3rK5BrDBRbrJOF7_-rlS0A8m-nK4pSvxMLhQDiJMpETH4_T-UTC8YwDwAfISeUfdVnM4IxGZGXUvNWUam3sJh_dZ0svF9SaCAmEyltDHCauWxOFDhewXDjriqDZhQTZ45_F9fhJWy7z9UbAjIAKnb0XCIdF7wszQ6y0-7oSqezhHVNU54ht-CK2fgEUoxatuGwFT9jlujECxMwIOghedcK8kO3LN6ARcYUeSEt3e1PdzAIh2SZIfh3BxeT-wPFLK9I"
                  />
                </div>
                <div>
                  <p className="text-white text-base font-bold">
                    TIL (Today I Learned)
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Quick knowledge snippets and micro-learnings from your daily
                    work.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 p-4 rounded-xl border border-navy-700 bg-navy-900 hover:border-amber-500/50 transition-all cursor-pointer">
                <div className="w-full aspect-video bg-navy-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                    data-alt="Bug fix and troubleshooting abstract pattern"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHHGMoiT21mjf4Aht1jmYmSbgI4tk3iCNWwVeqMgTZCfshQwE_9DjbJRs2nZtEahDNinhhOz7mQ4GN_R_vT3gQvC5qYr-y_oZMYaXPaHCgmbS353FufpdpdImojFIcRwyPAN8wIUq3gKimQYCkJKLxEbtYw9thn7hD_If9rbhzm7J8AWU6xekpUK6ckB4eOlnlKHTkTc7D_sgb5O0yh64Hd4jaAdRLJdujqbalwS7jURTY_F43Ff2rEFeWvu3aY8wG-eMLcT0YWNkG"
                  />
                </div>
                <div>
                  <p className="text-white text-base font-bold">
                    Troubleshooting
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Detailed debug reports, error solutions, and root cause
                    analysis.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Recent Drafts */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                Recent Drafts
              </h3>
              <a
                className="text-amber-400 text-sm font-semibold hover:underline"
                href="#">
                View all drafts
              </a>
            </div>
            <div className="space-y-3">
              {/* Draft Item 1 */}
              <div className="flex items-center justify-between p-4 bg-navy-900 border border-navy-700 rounded-xl hover:bg-navy-800 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <span className="material-symbols-outlined">
                      data_object
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      Optimizing React Context Performance
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Edited 2 hours ago • 1,200 words
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-navy-700 text-[10px] font-mono text-slate-400 uppercase">
                    Tutorial
                  </div>
                  <span className="material-symbols-outlined text-slate-400">
                    chevron_right
                  </span>
                </div>
              </div>
              {/* Draft Item 2 */}
              <div className="flex items-center justify-between p-4 bg-navy-900 border border-navy-700 rounded-xl hover:bg-navy-800 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined">terminal</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      Bash Aliases for Faster Workflows
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Edited yesterday • 450 words
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-navy-700 text-[10px] font-mono text-slate-400 uppercase">
                    TIL
                  </div>
                  <span className="material-symbols-outlined text-slate-400">
                    chevron_right
                  </span>
                </div>
              </div>
              {/* Draft Item 3 */}
              <div className="flex items-center justify-between p-4 bg-navy-900 border border-navy-700 rounded-xl hover:bg-navy-800 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <span className="material-symbols-outlined">
                      bug_report
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      Solving Memory Leaks in Node.js Streams
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Edited 3 days ago • 800 words
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-navy-700 text-[10px] font-mono text-slate-400 uppercase">
                    Troubleshooting
                  </div>
                  <span className="material-symbols-outlined text-slate-400">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* Activity Summary / Footer info */}
          <div className="mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">
                    Weekly Goal
                  </p>
                  <p className="text-xl font-bold text-white">2 / 3 Posts</p>
                </div>
                <div className="h-10 w-px bg-navy-600"></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">
                    Avg. Engagement
                  </p>
                  <p className="text-xl font-bold text-amber-400">+12.4%</p>
                </div>
              </div>
              <button className="text-sm font-bold bg-navy-700 border border-navy-600 text-slate-200 px-4 py-2 rounded-lg hover:bg-navy-600 transition-all">
                View Productivity Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
