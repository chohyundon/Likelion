"use client";

import { createClient } from "@/app/lib/supabase/client";
import { X } from "lucide-react";
import { useMemo } from "react";

export default function AuthModal({
  setOpenModal,
  isHomePage,
  modalRef,
}: {
  setOpenModal: (open: boolean) => void;
  isHomePage?: boolean;
  modalRef?: React.RefObject<HTMLDivElement>;
}) {
  const supabase = useMemo(() => createClient(), []);

  const handleLoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLoginWithKakao = async () => {
    await supabase.auth.signInWithOAuth({ provider: "kakao" });
  };

  if (isHomePage) {
    return (
      <>
        <div
          ref={modalRef as React.RefObject<HTMLDivElement>}
          className="fixed left-1/2 top-1/2 z-[101] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-navy-700 bg-navy-950 p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2
                id="auth-modal-title"
                className="text-xl font-bold text-white">
                로그인
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                소셜 계정으로 간편히 시작하세요
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="닫기">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-navy-600 bg-navy-800 text-slate-200 font-medium hover:bg-navy-700 transition-colors">
              <img
                src="/google.svg"
                alt="구글 로고"
                className="size-5 shrink-0"
              />
              Google로 계속하기
            </button>
            <button
              type="button"
              onClick={handleLoginWithKakao}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[#FEE500] text-[#191919] font-medium hover:bg-[#f5dc00] transition-colors">
              <img
                src="/kakao.svg"
                alt="카카오 로고"
                className="size-5 shrink-0"
              />
              카카오로 계속하기
            </button>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">로그인</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            소셜 계정으로 간편히 시작하세요
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="닫기">
          <X className="size-5" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-navy-600 bg-navy-800 text-slate-200 font-medium hover:bg-navy-700 transition-colors">
          <img src="/google.svg" alt="구글 로고" className="size-5 shrink-0" />
          Google로 계속하기
        </button>
        <button
          type="button"
          onClick={handleLoginWithKakao}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[#FEE500] text-[#191919] font-medium hover:bg-[#f5dc00] transition-colors">
          <img src="/kakao.svg" alt="카카오 로고" className="size-5 shrink-0" />
          카카오로 계속하기
        </button>
      </div>
      <p className="text-xs text-slate-500 text-center mt-4">
        로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
      </p>
    </div>
  );
}
