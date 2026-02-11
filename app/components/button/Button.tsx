"use client";

import { useRouter } from "next/navigation";

export default function Button({
  children,
  isDashboard,
  onClick,
}: {
  children: React.ReactNode;
  isDashboard?: boolean;
  onClick?: () => void;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (isDashboard) {
      router.push("/write");
    } else {
      onClick?.();
    }
  };

  return (
    <button
      className="bg-blue-500 cursor-pointer text-white px-4 py-2 font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
      onClick={handleClick}>
      {children}
    </button>
  );
}
