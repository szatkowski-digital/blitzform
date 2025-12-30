import { useState } from "react";
import { Card, MobileCard } from "../ui/Card";
import Reveal from "../ui/Reveal";
import { TechBackground } from "../design/HeroBackground";
import { techIcons } from "@/config/icons";
import { useTranslations } from "next-intl";

const TechCardsGroup = () => {
  const [activeCard, setActiveCard] = useState(0);
  const t = useTranslations("home");
  const cards = t.raw("techCards");

  return (
    <section id="tech" className="w-full relative">
      {/* Mobile version */}
      <div className="flex flex-col gap-6 px-4 py-10 lg:hidden">
        {cards.map((item, i) => {
          const Icon = techIcons[i];

          return (
            <Reveal key={i}>
              <MobileCard item={item} icon={Icon} />
            </Reveal>
          );
        })}
      </div>

      {/* Desktop version */}
      <div className="container-lg hidden lg:flex w-full h-dvh py-32 xl:py-42 justify-center items-center">
        <div className="relative w-full h-full gap-6 flex">
          {cards.map((item, i) => {
            const Icon = techIcons[i];

            return (
              <Card
                key={i}
                icon={Icon}
                item={item}
                active={activeCard === i}
                onClick={() => setActiveCard(i)}
              />
            );
          })}
        </div>
      </div>

      <TechBackground />
    </section>
  );
};

export default TechCardsGroup;
