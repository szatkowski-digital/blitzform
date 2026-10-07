import Badge from "@/components/ui/Badge";

export interface ContactHeroProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
}

export const ContactHero: React.FC<ContactHeroProps> = ({
  badgeText,
  title,
  subtitle,
}) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <Badge variant="ghost">{badgeText}</Badge>
      <h1 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
        {title}
      </h1>
      <p className="text-zinc-400 text-sm sm:text-base mt-3 font-sans leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default ContactHero;
