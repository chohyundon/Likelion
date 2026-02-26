"use client";

import { TEMPLATE_ID } from "@/app/template/template";
import DashBoardHeader from "./dashboardHeader/DashBoardHeader";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { DatabaseDocument } from "@/types/database";
import Link from "next/link";
import { useAuthStore } from "@/app/store/AuthStore";
import { getUserData } from "@/app/services/getUserData";

const TEMPLATE_IMAGES: Record<string, string> = {
  TIL: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=340&fit=crop",
  Deep_Dive:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
  "trouble-shooting":
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=340&fit=crop",
};

export default function DashBoard() {
  const supabase = useMemo(() => createClient(), []);
  const [templates, setTemplates] = useState<DatabaseDocument[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user?.id) {
      setTemplates([]);
      return;
    }
    const getTemplates = async () => {
      const templates = await getUserData(user.id);
      setTemplates(templates ?? []);
    };
    getTemplates();
  }, [supabase, user?.id]);

  console.log(templates);

  const recentTemplates = useMemo(
    () =>
      [...templates]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 3),
    [templates]
  );

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 min-h-0 flex flex-col overflow-y-auto bg-navy-950">
        <div className="mx-auto px-8 py-10">
          {/* PageHeading */}
          <DashBoardHeader />
          {/* Section: Start a New Post */}
          <section className="mb-12">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              🚀 새 글 쓰기
            </h3>
            {/* ImageGrid for Templates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {TEMPLATE_ID.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-navy-700/50 shadow-lg rounded-xl overflow-hidden border border-navy-600 hover:border-navy-500 transition-all">
                  <div className="relative h-48 w-full bg-navy-800">
                    <Image
                      src={TEMPLATE_IMAGES[tpl.id] ?? TEMPLATE_IMAGES.TIL}
                      alt={tpl.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {tpl.name}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {tpl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Recent Drafts */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                ⚙️ 최근 작성한 문서
              </h3>
              <Link
                className="text-amber-400 text-sm font-semibold hover:underline"
                href="/mypage">
                전체 보기
              </Link>
            </div>
            {user ? (
              <div className="space-y-3">
                <div className="flex flex-col gap-4">
                  {recentTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-6 bg-navy-900/50 border border-navy-700 border-dashed rounded-xl text-center">
                      <p className="text-slate-400 text-sm mb-1">
                        아직 작성한 문서가 없어요
                      </p>
                      <p className="text-slate-500 text-xs">
                        위에서 템플릿을 선택하고 새 글을 작성해 보세요.
                      </p>
                    </div>
                  ) : (
                    recentTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-6 bg-navy-900 border border-navy-700 rounded-xl hover:bg-navy-800 transition-all cursor-pointer">
                        <h4 className="text-white font-bold text-sm">
                          {template.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded bg-navy-700 text-[10px] font-mono text-slate-400 uppercase">
                            {template.template_type}
                          </span>
                          <ArrowRight className="size-4 text-slate-400" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 bg-navy-900/50 border border-navy-700 border-dashed rounded-xl text-center">
                <p className="text-slate-400 text-sm mb-1">
                  로그인하면 작성한 문서를 볼 수 있어요
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
