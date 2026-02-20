"use client";

import Button from "@/app/components/button/Button";
import { useAuthStore } from "@/app/store/AuthStore";
import { useRouter } from "next/navigation";

export default function DashBoardHeader() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  return (
    <header className="flex flex-wrap justify-between items-end gap-6 mb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-white text-4xl font-black leading-tight tracking-tight">
          Welcome back, {user?.user_metadata?.full_name ?? "Developer"}
        </h2>
        <p className="text-slate-400 text-lg font-mono">
          system.status: <span className="text-amber-400">ready_to_write</span>
        </p>
      </div>
      <Button
        className="font-bold shadow-lg hover:bg-navy-500 transition-all"
        onClick={() => router.push("/write")}>
        새로운 글 작성
      </Button>
    </header>
  );
}
