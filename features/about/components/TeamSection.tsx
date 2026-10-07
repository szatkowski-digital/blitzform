"use client";

import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export const TeamSection = ({ members }: TeamSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 mt-16 border-t border-zinc-200">
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <Badge variant="light">02 • Kadra Inżynieryjna</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 uppercase tracking-tight">
          BlitzForm Team
        </h2>
        <p className="text-zinc-600 font-sans text-sm sm:text-base mt-3 leading-relaxed">
          The people behind the concept, technology, and field deployments of
          BlitzForm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
        {members.map((member, index) => {
          const circleDuration = 0.5;
          const avatarDuration = circleDuration + 0.6;
          const staggerDelay = isMobile ? 0 : index * 0.12;

          return (
            <motion.div
              key={member.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                variants={{
                  hidden: { scale: 0.25, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      duration: circleDuration,
                      delay: staggerDelay,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-zinc-200 border-2 border-zinc-300 group-hover:border-zinc-950 transition-colors duration-300 shadow-xl mb-6"
              >
                <motion.div
                  variants={{
                    hidden: { scale: 1.8 },
                    visible: {
                      scale: 1,
                      transition: {
                        duration: avatarDuration,
                        delay: staggerDelay,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 pointer-events-none z-10" />
              </motion.div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
                {member.name}
              </h3>
              <div className="font-sans text-xs sm:text-sm font-semibold text-zinc-800 mt-1 mb-2.5">
                {member.role}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed max-w-xs">
                {member.bio}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSection;
