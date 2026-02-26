import { BookOpen, Search, Wrench } from "lucide-react";

export const TEMPLATES = [
  {
    id: "TIL",
    name: "오늘 배운 것 (TIL)",
    description: "간결한 기술적 발견과 빠른 팁을 정리합니다.",
    icon: BookOpen,
  },
  {
    id: "Trouble_Shooting",
    name: "트러블슈팅",
    description: "특정 버그나 문제 해결 과정에 대한 상세 가이드.",
    icon: Wrench,
  },
  {
    id: "Deep_Dive",
    name: "딥다이브",
    description: "아키텍처 패턴이나 기술 스택의 깊이 있는 분석.",
    icon: Search,
  },
] as const;
