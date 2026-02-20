"use client";

import { usePathname } from "next/navigation";
import Aside from "../components/aside/Aside";
import Header from "../components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  if (isHomePage) {
    return (
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <Header isHomePage={true} />
        {children}
      </div>
    );
  }
  return (
    <div className="w-full h-screen bg-navy-950 flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0 flex">
        <Aside />
        {children}
      </div>
    </div>
  );
}
