"use client";

import { DashBoardSideList } from "@/app/constants/DashBoardSideList";
import { createClient } from "@/app/lib/supabase/client";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../modal/Modal";
import AuthModal from "../modal/auth/AuthModal";
import { useAuthStore } from "@/app/store/AuthStore";

export default function Aside() {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const supabase = useMemo(() => createClient(), []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
    if (user) setOpenModal(false);
  }, [user]);

  useEffect(() => {
    if (openModal) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setOpenModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openModal]);

  return (
    <aside className="flex flex-col border-r border-navy-700 w-1/10 bg-navy-900/50">
      {openModal && (
        <Modal ref={modalRef as React.RefObject<HTMLDivElement>}>
          <AuthModal setOpenModal={setOpenModal} />
        </Modal>
      )}
      <nav className="flex flex-1 flex-col w-full">
        <ul className="flex flex-col gap-2 w-4/5 mx-auto py-2">
          {DashBoardSideList.map((item) => (
            <li
              key={item.id}
              className={`flex gap-4 items-center text-sm cursor-pointer p-2 rounded-sm ${
                activeItem === item.id
                  ? "bg-navy-600 text-white"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
              onClick={() => setActiveItem(item.id)}>
              <item.icon />
              {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-4 justify-center w-full mx-auto border-t border-navy-700 flex flex-col gap-2">
          <div className="flex gap-2 items-center cursor-pointer p-2 rounded-sm text-slate-300 hover:bg-navy-800 hover:text-white">
            <Settings className="shrink-0" />
            <p>설정</p>
          </div>
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center p-2 rounded-sm">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="유저프로필이미지"
                    className="size-8 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="size-8 rounded-full bg-navy-600 flex items-center justify-center shrink-0">
                    <CircleUserRound className="size-5 text-slate-300" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-slate-400">
                    {user.user_metadata?.full_name ?? user.email ?? "사용자"}
                  </p>
                  {user.email && (
                    <p className="text-xs text-slate-400 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex gap-2 items-center cursor-pointer p-2 rounded-sm hover:bg-navy-800 w-full text-left text-red-400 hover:text-red-300">
                <LogOut className="shrink-0 size-4" />
                <span className="text-sm">로그아웃</span>
              </button>
            </div>
          ) : (
            <div
              className="flex gap-2 items-center cursor-pointer p-2 rounded-sm text-slate-300 hover:bg-navy-800 hover:text-white"
              onClick={handleOpenModal}>
              <CircleUserRound className="shrink-0" />
              <p>로그인</p>
            </div>
          )}
        </div>
      </nav>
      {/* <UserComponent /> */}
    </aside>
  );
}
