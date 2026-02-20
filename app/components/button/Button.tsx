"use client";

import { useRouter } from "next/navigation";

export default function Button({
  children,
  isDashboard,
  onClick,
  className,
}: {
  children: React.ReactNode;
  isDashboard?: boolean;
  onClick?: () => void;
  className?: string;
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
      className={`bg-navy-600 cursor-pointer text-white px-4 py-2 font-semibold rounded-lg hover:bg-navy-500 transition-colors duration-300 ${className}`}
      onClick={handleClick}>
      {children}
    </button>
  );
}
