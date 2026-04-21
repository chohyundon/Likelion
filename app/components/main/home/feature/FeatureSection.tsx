import { FEATURES } from "@/app/constants/Main";
import FeatureCard from "../card/FeatureCard";

export default function FeatureSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 border-t border-navy-700">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
          Focus on your code, <br className="md:hidden" /> leave the rest to us
        </h2>
        <p className="text-slate-400">개발자만을 위해 설계된 핵심 기능</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
