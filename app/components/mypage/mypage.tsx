"use client";

import { createClient } from "@/app/lib/supabase/client";
import { DatabaseDocument } from "@/types/database";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2,
} from "lucide-react";
import DeleteModal from "../modal/delete/DeleteModal";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import FilterModal from "../modal/filter/FilterModal";
import { useFilterStore } from "@/app/store/FilterStore";
import { useAuthStore } from "@/app/store/AuthStore";

const TEMPLATES_PER_PAGE = 6;

export default function MypageScreen() {
  const supabase = createClient();
  const [templates, setTemplates] = useState<DatabaseDocument[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedTemplateType = useFilterStore(
    (state) => state.selectedTemplateType
  );
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setTemplates([]);
      setIsLoading(false);
      return;
    }
    const getTemplates = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("템플릿")
        .select("*")
        .eq("user_id", user.id);
      if (error) console.error(error);
      else setTemplates(data ?? []);
      setCurrentPage(0);
      setIsLoading(false);
    };
    getTemplates();
  }, [user?.id]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTemplateType]);

  const openDeleteModal = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handleEditPost = (id: string) => {
    router.push(`/post/${id}`);
  };

  const handleConfirmDelete = async (id: string) => {
    const { error } = await supabase.from("템플릿").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      toast.success("포스트가 삭제되었습니다.");
    }
    setDeleteTargetId(null);
  };

  const filteredTemplates = templates.filter((template) => {
    if (
      selectedTemplateType !== "전체" &&
      template.template_type !== selectedTemplateType
    )
      return false;
    if (searchQuery.trim() && !template.title.includes(searchQuery.trim()))
      return false;
    return true;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE)
  );
  const start = currentPage * TEMPLATES_PER_PAGE;
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  const currentPageItems = sortedTemplates.slice(
    start,
    start + TEMPLATES_PER_PAGE
  );

  if (isLoading) {
    return (
      <main className="flex-1 ml-2 p-8 bg-navy-950 min-h-full">
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-2xl font-bold">로딩중...</p>
        </div>
      </main>
    );
  }

  const handleTemplateFilter = () => {
    setFilterModalOpen(true);
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
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
      {!user && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
          글을 저장하려면 로그인이 필요합니다. 상단 또는 왼쪽 사이드바에서
          로그인해 주세요.
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
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
          <div className="flex-1">
            <input
              className="w-full pl-4 pr-4 py-2 bg-navy-800/50 border border-navy-600 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder:text-slate-500 text-sm outline-none transition-all"
              placeholder="포스트 제목, 태그 검색..."
              type="text"
              value={searchQuery}
              onChange={handleSearchQuery}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              {filterModalOpen && (
                <FilterModal
                  setFilterModalOpen={setFilterModalOpen}
                  templates={templates}
                />
              )}
              <button
                className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-navy-800 border border-navy-600 rounded-lg text-sm font-medium text-slate-300 hover:bg-navy-700 transition-colors"
                onClick={handleTemplateFilter}>
                템플릿: {selectedTemplateType}
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-y-auto">
          <table className="w-full text-left border-collapse">
            {user && (
              <>
                <thead>
                  <tr className="bg-navy-800/50 border-b border-navy-700">
                    <th className="w-1/2 px-6 py-4 text-xs font-bold text-slate-500">
                      포스트 정보
                    </th>
                    <th className="w-1/4 px-6 py-4 text-xs font-bold text-slate-500">
                      템플릿
                    </th>
                    <th className="w-1/4 px-6 py-4 text-xs font-bold text-slate-500 text-center">
                      생성날짜
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 text-center whitespace-nowrap">
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
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleEditPost(template.id)}
                          className="p-2 hover:bg-navy-700 rounded-lg text-slate-400 hover:text-slate-300 transition-colors cursor-pointer">
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
              </>
            )}
          </table>
        </div>
        {user ? (
          <div className="px-6 py-4 bg-navy-800/50 flex items-center justify-between border-t border-navy-700">
            <p className="text-sm text-slate-500">
              {filteredTemplates.length > 0
                ? `Showing ${start + 1} to ${Math.min(
                    start + TEMPLATES_PER_PAGE,
                    filteredTemplates.length
                  )} of ${filteredTemplates.length}`
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
        ) : (
          <div className="px-6 py-4 bg-navy-800/50 flex items-center justify-between border-t border-navy-700">
            <p className="text-sm text-slate-500">0 posts</p>
          </div>
        )}
      </div>
    </main>
  );
}
