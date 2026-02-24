"use client";

import { createClient } from "@/app/lib/supabase/client";
import { DatabaseDocument } from "@/types/database";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ListFilter,
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2,
} from "lucide-react";
import DeleteModal from "../modal/delete/DeleteModal";

const TEMPLATES_PER_PAGE = 6;

export default function MypageScreen() {
  const supabase = useMemo(() => createClient(), []);
  const [templates, setTemplates] = useState<DatabaseDocument[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getTemplates = async () => {
      const { data, error } = await supabase.from("템플릿").select("*");
      if (error) {
        console.error(error);
      } else {
        setTemplates(data ?? []);
        setCurrentPage(0);
      }
    };
    getTemplates();
  }, [supabase]);

  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (id: string) => {
    const { error } = await supabase.from("템플릿").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
    setDeleteTargetId(null);
  };

  const totalPages = Math.max(
    1,
    Math.ceil(templates.length / TEMPLATES_PER_PAGE)
  );
  const start = currentPage * TEMPLATES_PER_PAGE;
  const currentPageItems = templates.slice(start, start + TEMPLATES_PER_PAGE);

  if (templates.length === 0) {
    return (
      <main className="flex-1 ml-2 p-8 bg-navy-950 min-h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-2xl font-bold">로딩중...</div>
        </div>
      </main>
    );
  }

  const handleTemplateFilter = () => {
    console.log("template filter");
  };

  return (
    <main className="flex-1 ml-2 p-8 bg-navy-950 min-h-full">
      {deleteModalOpen && (
        <DeleteModal
          targetId={deleteTargetId}
          setDeleteModalOpen={setDeleteModalOpen}
          modalRef={modalRef as React.RefObject<HTMLDivElement>}
          onConfirm={handleConfirmDelete}
        />
      )}
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">내 블로그 글 목록</h2>
            <p className="text-slate-400 text-sm">
              총 {templates.length}개의 기술 포스트를 관리하고 있습니다.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-navy-900 p-4 rounded-xl border border-navy-700 shadow-sm">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                className="w-full pl-10 pr-4 py-2 bg-navy-800/50 border border-navy-600 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder:text-slate-500 text-sm outline-none transition-all"
                placeholder="포스트 제목, 태그 검색..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-3 py-2 bg-navy-800 border border-navy-600 rounded-lg text-sm font-medium text-slate-300 hover:bg-navy-700 transition-colors"
                onClick={handleTemplateFilter}>
                템플릿: 전체
                <ChevronDown className="size-4" />
              </button>
            </div>
            <button className="p-2 text-slate-500 hover:text-amber-400 transition-colors">
              <ListFilter className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-800/50 border-b border-navy-700">
                <th className="px-6 py-4 text-xs font-bold text-slate-500">
                  포스트 정보
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500">
                  템플릿
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 text-center">
                  생성날짜
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 text-center">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {currentPageItems.map((template) => (
                <tr key={template.id}>
                  <td className="px-6 py-4 text-white">
                    <p className="text-sm font-medium">{template.title}</p>
                    <p className="text-xs text-slate-400">
                      {template.content?.slice(0, 50) ?? ""}
                      {(template.content?.length ?? 0) > 50 ? "..." : ""}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        template.template_type === "TIL"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : template.template_type === "Tutorial"
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : template.template_type === "Trouble_Shooting"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/25"
                          : "bg-navy-700/80 text-slate-400 border-navy-600"
                      }`}>
                      {template.template_type}
                    </span>
                  </td>
                  <td>
                    <p className="text-xs text-slate-400 text-center">
                      {template.created_at
                        ? new Date(template.created_at).toLocaleDateString()
                        : "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-navy-700 rounded-lg text-slate-400 hover:text-slate-300 transition-colors">
                      <Pencil className="size-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-navy-700 rounded-lg text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
                      onClick={() => openDeleteModal(template.id)}>
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-navy-800/50 flex items-center justify-between border-t border-navy-700">
          <p className="text-sm text-slate-500">
            {templates.length > 0
              ? `Showing ${start + 1} to ${Math.min(
                  start + TEMPLATES_PER_PAGE,
                  templates.length
                )} of ${templates.length}`
              : "0 posts"}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-navy-700 text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}>
              <ArrowLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                type="button"
                key={i}
                className={`size-8 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === i
                    ? "bg-amber-500 text-navy-950"
                    : "hover:bg-navy-700 text-slate-300"
                }`}
                onClick={() => setCurrentPage(i)}>
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-navy-700 text-slate-400 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              disabled={currentPage >= totalPages - 1}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
