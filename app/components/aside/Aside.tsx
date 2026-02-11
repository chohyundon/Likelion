"use client";

import { DashBoardSideList } from "@/app/constants/DashBoardSideList";
import { Settings } from "lucide-react";
import { useState } from "react";

export default function Aside() {
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  return (
    <aside className="flex w-1/7 flex-col h-full bg-gray-100">
      {/* <LogoComponent /> */}
      <nav className="flex flex-1 flex-col w-full">
        <ul className="flex flex-col gap-2 w-4/5 mx-auto py-2">
          {DashBoardSideList.map((item) => (
            <li
              key={item.id}
              className={`flex gap-4 items-center cursor-pointer p-2 rounded-sm ${
                activeItem === item.id ? "bg-blue-400 text-white font-bold" : ""
              }`}
              onClick={() => setActiveItem(item.id)}>
              <item.icon />
              {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-20 w-full pl-4 mx-auto border-t border-gray-300 flex gap-2 items-center cursor-pointer p-2 rounded-sm hover:bg-gray-200">
          <Settings className="shrink-0" />
          <p>설정</p>
        </div>
      </nav>
      {/* <UserComponent /> */}
    </aside>
  );
}
