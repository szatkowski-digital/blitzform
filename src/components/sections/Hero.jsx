import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { HeroBackground } from "../design/HeroBackground";
import { Button } from "../ui/Buttons";
import { useTranslations } from "next-intl";

const Hero = () => {
  const scrollDown = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };
  const t = useTranslations("home");

  return (
    <section
      id="hero"
      className="relative w-full h-svh lg:h-dvh flex flex-col items-center justify-center pt-16 lg:pt-28"
    >
      {/* CONTENT WRAPPER */}
      <div className="container w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE - TEXT */}
        <div className="space-y-8">
          <h1 className="h1 text-5xl md:text-7xl leading-tight max-lg:text-center">
            {t("hero.header")}
          </h1>

          <h2 className="h4 opacity-80 max-w-md max-lg:text-center">
            {t("hero.description")}
          </h2>

          {/* BUTTON */}
          <div className="flex w-full items-center justify-start max-lg:justify-center">
            <Button onClick={scrollDown}>{t("hero.button")}</Button>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="flex justify-center items-center relative w-full">
          <Image
            src="/images/mobile_container.webp"
            alt="Mobilna Fabryka Druku 3D"
            className="object-contain"
            width={1485}
            height={1013}
            priority
          />
        </div>
      </div>

      {/* SCROLL DOWN BUTTON */}
      <motion.button
        onClick={scrollDown}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center pt-0.75 cursor-pointer"
      >
        <ChevronDown className="w-10 h-10 text-n-1" />
      </motion.button>

      <div className="absolute inset-0 -z-10">
        <HeroBackground />
      </div>
    </section>
  );
};

export default Hero;
