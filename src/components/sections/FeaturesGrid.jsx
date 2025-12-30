import Reveal from "../ui/Reveal";
import { featureIcons } from "@/config/icons";
import { useTranslations } from "next-intl";

export const FeaturesGrid = () => {
  const t = useTranslations("home");
  const cards = t.raw("features.cards");

  return (
    <section id="features" className="pt-16 lg:pt-24 pb-6 lg:pb-16">
      <div className="pt-12 space-y-12 lg:space-y-16">
        {/* Heading */}
        <Reveal className="container flex max-lg:flex-col text-start justify-center items-start gap-3 lg:gap-12">
          <h2 className="h2 font-light text-n-1 lg:w-1/2">
            {t("features.header")}
          </h2>
          <h3 className="h3 lg:w-1/2">{t("features.description")}</h3>
        </Reveal>

        <div className="w-full border-b-1 border-n-3" />

        {/* Features grid */}
        <div
          className="container
            lg:gap-6
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-4
          "
        >
          {cards.map((item, index) => {
            const Icon = featureIcons[index];

            return (
              <Reveal key={index}>
                <FeatureCard
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 lg:p-8 flex flex-col items-start gap-3 hover:bg-white/5 rounded-xl transition">
      <div className="bg-white/5 p-3 rounded-xl">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      <h3 className="text-lg font-inter font-semibold text-n-1">{title}</h3>

      <p className="text-n-4 font-inter font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
};
