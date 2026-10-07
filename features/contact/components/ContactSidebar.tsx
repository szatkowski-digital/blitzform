import { Mail, MapPin, Clock } from "lucide-react";

export interface KontaktSidebarProps {
  badgeText: string;
  companyName: string;
  emailLabel: string;
  emailValue: string;
  locationLabel: string;
  locationValue: string;
  responseTimeLabel: string;
  responseTimeValue: string;
}

export const KontaktSidebar: React.FC<KontaktSidebarProps> = ({
  badgeText,
  companyName,
  emailLabel,
  emailValue,
  locationLabel,
  locationValue,
  responseTimeLabel,
  responseTimeValue,
}) => (
  <div className="lg:col-span-5 space-y-6">
    <div className="bg-zinc-900/80 rounded-3xl p-7 sm:p-8 space-y-6">
      <div>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide font-semibold">
          {badgeText}
        </span>
        <h3 className="font-display text-xl font-extrabold text-white mt-1">
          {companyName}
        </h3>
      </div>

      <div className="space-y-3 text-sm font-sans">
        <a
          href={`mailto:${emailValue}`}
          className="flex items-start gap-3.5 p-3.5 rounded-2xl transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-n-1/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-500 font-mono">{emailLabel}</div>
            <div className="text-white font-semibold group-hover:text-primary transition-colors">
              {emailValue}
            </div>
          </div>
        </a>

        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-n-1/20 flex items-center justify-center text-zinc-400 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-500 font-mono">
              {locationLabel}
            </div>
            <div className="text-zinc-200 font-medium">{locationValue}</div>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-n-1/20 flex items-center justify-center text-zinc-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-500 font-mono">
              {responseTimeLabel}
            </div>
            <div className="text-zinc-200 font-medium">{responseTimeValue}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default KontaktSidebar;
