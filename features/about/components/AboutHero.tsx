import Badge from "@/components/ui/Badge";

interface Metric {
  id: string;
  value: string;
  title: string;
  desc: string;
  highlight: boolean;
}

interface AboutHeroProps {
  badge: string;
  titleLine1: string;
  titleGradient: string;
  description: string;
  metrics: Metric[];
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  badge,
  titleLine1,
  titleGradient,
  description,
  metrics,
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
    <div className="max-w-3xl">
      <Badge>{badge}</Badge>

      <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
        {titleLine1} <span className="text-primary">{titleGradient}</span>.
      </h1>

      <p className="text-zinc-300 font-sans text-base sm:text-lg mt-6 leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
      {metrics.map((metric, idx) => (
        <div key={idx} className="p-6 rounded-2xl bg-zinc-900/80">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide font-semibold mb-1">
            {metric.id}
          </div>

          <div
            className={`font-display text-3xl sm:text-4xl font-extrabold ${
              metric.highlight ? "text-primary" : "text-white"
            }`}
          >
            {metric.value}
          </div>

          <div className="text-white font-bold text-sm mt-1 font-display">
            {metric.title}
          </div>

          <div className="text-zinc-400 text-xs sm:text-sm mt-1.5 font-sans leading-relaxed">
            {metric.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
);
