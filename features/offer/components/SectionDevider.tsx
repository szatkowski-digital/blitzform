export interface SectionDividerProps {
  leftText?: string;
  centerText?: string;
  rightText?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  leftText = "BlitzForm",
  centerText = "Specyfikacja 2026",
  rightText = "Mobilne Systemy Druku 3D",
  className = "",
}) => {
  // Pomocniczy zestaw elementów dla pętli mobilnej
  const renderTickerContent = () => (
    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wide shrink-0 pr-8">
      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      <span className="text-zinc-300 font-medium">{leftText}</span>
      <span className="text-zinc-600">•</span>
      <span className="text-zinc-400">{centerText}</span>
      <span className="text-zinc-600">•</span>
      <span className="text-zinc-400 tracking-wider">{rightText}</span>
    </div>
  );

  return (
    <div
      className={`relative w-full select-none border-t border-b border-zinc-800/80 py-3 overflow-hidden ${className}`}
    >
      {/* Animacja CSS nieskończonego paska (nie wymaga zmian w tailwind.config.js) */}
      <style>{`
        @keyframes section-divider-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-divider-marquee {
          display: flex;
          width: max-content;
          animation: section-divider-marquee 18s linear infinite;
        }
        .animate-divider-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. WERSJA MOBILNA (< sm): Pływający Marquee bez rozpychania ekranu */}
      <div className="sm:hidden flex w-full overflow-hidden">
        <div className="animate-divider-marquee">
          {renderTickerContent()}
          {renderTickerContent()}
        </div>
      </div>

      {/* 2. WERSJA DESKTOPOWA (>= sm): Statyczny układ flex */}
      <div className="hidden sm:block mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between gap-4 text-xs font-mono uppercase tracking-wide">
          {/* Left + Center Items */}
          <div className="flex items-center gap-2 sm:gap-3 text-zinc-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-zinc-300 font-medium">{leftText}</span>
            <span>•</span>
            <span className="hidden lg:inline">{centerText}</span>
          </div>

          {/* Right Item with Subtle Divider Line */}
          <div className="flex items-center gap-2 sm:gap-3 text-right text-zinc-400 shrink-0">
            <span className="hidden sm:inline-block w-6 h-px bg-zinc-800" />
            <span className="tracking-wider">{rightText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
