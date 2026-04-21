"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/app/store/AuthStore";
import Footer from "../../footer/Footer";
import AuthModal from "../../modal/auth/AuthModal";
import HomeTitleSection from "./title/HomeTitleSection";
import BottomCta from "./bottom/BottomCta";
import FeatureSection from "./feature/FeatureSection";

export default function Home() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const startOrOpenAuth = () => {
    if (user) router.push("/dashboard");
    else setIsOpenModal(true);
  };

  return (
    <div className="relative min-h-screen w-full h-full bg-navy-950">
      {isOpenModal && <AuthModal setOpenModal={setIsOpenModal} />}
      <HomeTitleSection onStartFree={startOrOpenAuth} />
      <FeatureSection />
      <BottomCta onStartFree={startOrOpenAuth} />
      <Footer />
    </div>
  );
}
