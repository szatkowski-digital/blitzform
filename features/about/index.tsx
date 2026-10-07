import { AboutHero } from "./components/AboutHero";
import { TransitionDarkToLight } from "./components/GeometricTransitions";
import { AboutManifest } from "./components/AboutManifest";
import { AboutCta } from "./components/AboutCta";
import { useTranslations } from "next-intl";
import {
  getAboutCtaData,
  getAboutHeroData,
  getAboutManifestData,
} from "./data";

export const AboutPage: React.FC = () => {
  const t = useTranslations("about");
  const aboutHeroData = getAboutHeroData(t);
  const aboutManifestData = getAboutManifestData(t);
  const aboutCtaData = getAboutCtaData(t);

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-0 overflow-hidden">
      <AboutHero {...aboutHeroData} />
      <TransitionDarkToLight />
      <AboutManifest {...aboutManifestData} />
      <AboutCta {...aboutCtaData} />
    </div>
  );
};
