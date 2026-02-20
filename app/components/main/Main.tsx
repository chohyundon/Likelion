"use client";

import { usePathname } from "next/navigation";
import DashBoardWrite from "../dashboardWrite/DashBoard";
import DashBoard from "./dashboard/DashBoard";
import Home from "./home/Home";

export default function Main() {
  const pathname = usePathname();
  const isWritePage = pathname === "/write";
  const isDashBoardPage = pathname === "/dashboard";
  const isHomePage = pathname === "/";

  if (isWritePage) {
    return <DashBoardWrite />;
  }
  if (isDashBoardPage) {
    return <DashBoard />;
  }
  return <Home />;
}
