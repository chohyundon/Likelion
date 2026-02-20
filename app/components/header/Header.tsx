"use client";

import { useAuthStore } from "@/app/store/AuthStore";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { DashBoardSideList } from "@/app/constants/DashBoardSideList";
import { createClient } from "@/app/lib/supabase/client";
import { useRef, useState } from "react";
import { useEffect, useMemo } from "react";
import HeaderModal from "../modal/header/HeaderModal";
import AuthModal from "../modal/auth/AuthModal";

export default function Header({ isHomePage }: { isHomePage?: boolean }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const supabase = useMemo(() => createClient(), []);

  // 홈에서는 Aside가 마운트되지 않아서, Header에서 세션 복원 및 구독
  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase, setUser]);

  useEffect(() => {
    if (user) setModalOpen(false);
  }, [user]);

  const handleLogout = async () => {
    setModalOpen(true);
  };

  const handleLogin = () => {
    setModalOpen(true);
  };

  if (isHomePage) {
    return (
      <header className="flex h-1/14 items-center gap-6 w-full p-6 border-b-2 border-navy-700 relative">
        {modalOpen && user && <HeaderModal setModalOpen={setModalOpen} />}
        {modalOpen && !user && (
          <AuthModal
            setOpenModal={setModalOpen}
            isHomePage={true}
            modalRef={modalRef as React.RefObject<HTMLDivElement>}
          />
        )}
        <Logo />
        <div className="flex gap-4 ml-auto items-center">
          {DashBoardSideList.map((item) => (
            <Link key={item.id} href={`${item.id}`}>
              <p className="text-sm font-medium text-slate-200 hover:text-white transition-colors">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user?.user_metadata?.avatar_url}
            alt="유저프로필이미지"
            className="size-8 rounded-full object-cover shrink-0 cursor-pointer"
            onClick={handleLogout}
          />
        ) : (
          <div
            className="flex items-center justify-center shrink-0 text-slate-300 cursor-pointer bg-navy-500 rounded-full p-2"
            onClick={handleLogin}>
            <p className="text-sm font-medium text-slate-200 hover:text-white transition-colors">
              로그인
            </p>
          </div>
        )}
      </header>
    );
  }
  return (
    <header className="flex flex-wrap items-center gap-6 w-full h-1/16 z-10 px-6 border-b border-navy-700 bg-navy-900">
      <Logo />
      {modalOpen && <HeaderModal setModalOpen={setModalOpen} />}
      <div className="flex gap-4 ml-auto items-center">
        {DashBoardSideList.map((item) => (
          <Link key={item.id} href={`${item.id}`}>
            <p className="text-sm font-medium text-slate-200 hover:text-white transition-colors">
              {item.name}
            </p>
          </Link>
        ))}
        {user?.user_metadata?.avatar_url && (
          <img
            src={user?.user_metadata?.avatar_url}
            alt="유저프로필이미지"
            className="size-8 rounded-full object-cover shrink-0 cursor-pointer"
            onClick={handleLogout}
          />
        )}
      </div>
    </header>
  );
}
