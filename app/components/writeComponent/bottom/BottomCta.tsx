import { Lightbulb } from "lucide-react";
import Button from "../../button/Button";

export default function BottomCta({
  handleGenerateArticle,
}: {
  handleGenerateArticle: () => Promise<void>;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl border border-amber-500/30 bg-amber-500/5">
      <div className="flex items-center gap-3">
        <Lightbulb className="size-8 text-amber-400" />
        <div>
          <p className="text-white font-bold leading-none">
            생성할 준비가 되셨나요?
          </p>
          <p className="text-slate-400 text-sm mt-1">
            AI가 몇 초 안에 초안을 작성해 드립니다.
          </p>
        </div>
      </div>
      <Button
        onClick={handleGenerateArticle}
        className="font-bold shadow-lg bg-amber-500 hover:bg-amber-600 transition-all text-white">
        AI 글 생성하기
      </Button>
    </div>
  );
}
