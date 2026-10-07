"use client";

import Image, { StaticImageData } from "next/image";
import {
  ArrowRight,
  Box,
  Container,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

interface TeaserItem {
  badge: string;
  priceBadge: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
}

interface ProductTeasersProps {
  caseImg: StaticImageData | string;
  containerImg: StaticImageData | string;
  badge: string;
  title: string;
  description: string;
  cases: TeaserItem;
  containers: TeaserItem;
}

interface TeaserCardProps {
  item: TeaserItem;
  image: StaticImageData | string;
  icon: LucideIcon;
  id: string;
  href: string;
  priority?: boolean;
}

export const ProductTeasers: React.FC<ProductTeasersProps> = ({
  caseImg,
  containerImg,
  badge,
  title,
  description,
  cases,
  containers,
}) => {
  const teasersData = [
    {
      id: "teaser-card-skrzynie",
      item: cases,
      image: caseImg,
      icon: Box,
      priority: true,
      href: "/offer#section-boxes",
    },
    {
      id: "teaser-card-kontenery",
      item: containers,
      image: containerImg,
      icon: Container,
      priority: false,
      href: "/offer#section-containers",
    },
  ];

  return (
    <section className="py-16" id="product-teasers">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <Badge variant="ghost">{badge}</Badge>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
          {description}
        </p>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teasersData.map((teaser) => (
          <TeaserCard
            key={teaser.id}
            id={teaser.id}
            item={teaser.item}
            image={teaser.image}
            icon={teaser.icon}
            href={teaser.href}
            priority={teaser.priority}
          />
        ))}
      </div>
    </section>
  );
};

const TeaserCard: React.FC<TeaserCardProps> = ({
  item,
  image,
  icon: Icon,
  id,
  href,
  priority = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const [, hash] = href.split("#");
    if (hash && window.location.pathname.includes("/offer")) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <div
      id={id}
      className="group relative rounded-2xl overflow-hidden bg-zinc-900/80 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="h-52 overflow-hidden relative">
        <Image
          src={image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          priority={priority}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
        <div className="absolute top-4 right-4 z-20">
          <Badge variant="dark" className="font-mono text-xs">
            {item.priceBadge}
          </Badge>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-primary shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="p-0 text-[11px] font-mono uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
            {item.description}
          </p>

          <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/60 space-y-2.5 mb-8 font-sans text-xs sm:text-sm text-zinc-300">
            {item.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href={href} onClick={handleClick} className="block w-full">
          <Button
            variant="secondary"
            className="w-full"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {item.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};
