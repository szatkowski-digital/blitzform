"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export interface HeroVideoContainerProps {
  videoSrc?: string;
  posterSrc?: string;
  href?: string;
  cursorText?: string;
  className?: string;
  ariaLabel?: string;
  imageAlt?: string;
}

export const HeroVideoContainer: React.FC<HeroVideoContainerProps> = ({
  videoSrc = "/video/hero-video_short.webm",
  posterSrc = "/video/placeholder.webp",
  href = "/offer#section-boxes",
  cursorText = "Systemy Skrzyniowe",
  className = "",
  ariaLabel = "Prezentacja Systemów Skrzyniowych BlitzForm",
  imageAlt = "Systemy Skrzyniowe BlitzForm",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isInView, setIsInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Sprawdzony, precyzyjny kursor myszy na desktopie
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Natychmiastowe ustawienie współrzędnych w miejscu wjechania kursora
    mouseX.set(x);
    mouseY.set(y);

    // Snapowanie springa, żeby nie przelatywał z ostatniej zapamiętanej pozycji
    if (typeof cursorX.jump === "function") cursorX.jump(x);
    if (typeof cursorY.jump === "function") cursorY.jump(y);

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 2. Precyzyjne skalowanie oparte na CSS Variable
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 90%", "start 12vh"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.75, 1]);

  // 3. Intersection Observer do autoodtwarzania wideo
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isFullyInView =
          entry.isIntersecting && entry.intersectionRatio >= 0.5;

        if (isFullyInView) {
          setIsInView(true);
          setHasEnteredView(true);
        } else if (entry.intersectionRatio < 0.15) {
          setIsInView(false);
        }
      },
      {
        threshold: [0, 0.15, 0.5, 1.0],
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 4. Autoodtwarzanie wideo
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasEnteredView) return;

    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.debug("Autoplay interrupted:", err);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView, hasEnteredView]);

  const handleLoadedData = () => {
    setIsVideoReady(true);
    if (isInView && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <section
      ref={trackRef}
      aria-label={ariaLabel}
      className={`relative z-10 w-full select-none mt-2 sm:mt-4 md:mt-6 pb-12 md:pb-0 md:h-[140vh] ${className}`}
    >
      <div className="relative md:sticky md:top-[12vh] flex items-center justify-center w-full">
        <motion.div
          style={
            {
              "--scroll-scale": scale,
            } as React.CSSProperties
          }
          className="relative w-full max-w-[90rem] mx-auto origin-center px-0 sm:px-2 transform-gpu will-change-transform scale-100 md:scale-[var(--scroll-scale)]"
        >
          {/* Subtelny ambient glow */}
          <div
            className="absolute -inset-1.5 sm:-inset-2.5 bg-linear-to-b from-primary/25 via-primary/5 to-transparent rounded-2xl sm:rounded-3xl blur-2xl opacity-40 -z-10 pointer-events-none"
            aria-hidden="true"
          />

          <Link
            href={href}
            className="group block relative w-full h-full sm:cursor-none"
          >
            <div
              ref={cardRef}
              onMouseMove={updateMousePosition}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-video rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800/80 shadow-2xl shadow-black/80 overflow-hidden sm:cursor-none"
            >
              <Image
                src={posterSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1280px"
                priority={false}
                className={`object-cover transition-opacity duration-700 ease-out z-10 ${
                  isVideoReady && isPlaying
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />

              <video
                ref={videoRef}
                src={hasEnteredView ? videoSrc : undefined}
                autoPlay={false}
                muted
                loop
                playsInline
                preload="metadata"
                width={854}
                height={480}
                onLoadedData={handleLoadedData}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
                  isVideoReady && isPlaying ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Pływający kursor na desktopie ze sprawdzonym pozycjonowaniem */}
              <motion.div
                style={{
                  x: cursorX,
                  y: cursorY,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1 : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="pointer-events-none absolute top-0 left-0 z-30 hidden sm:flex w-28 h-28 md:w-32 md:h-32 rounded-full bg-zinc-950/90 border border-primary/60 text-white backdrop-blur-md shadow-2xl flex-col items-center justify-center p-3 select-none text-center"
              >
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-100 leading-tight">
                  {cursorText}
                </span>
                <ArrowUpRight className="w-4 h-4 text-primary mt-1 stroke-[2.5]" />
              </motion.div>

              {/* Pigułka mobilna */}
              <div className="sm:hidden absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-zinc-950/85 border border-primary/50 backdrop-blur-md flex items-center gap-1.5 shadow-xl pointer-events-none">
                <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                  {cursorText}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-primary stroke-[2.5]" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroVideoContainer;
