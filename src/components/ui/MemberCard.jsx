"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useInMobile";
import { useEffect, useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

const imgVariants = {
  hidden: { scale: 1.4 },
  visible: (i) => ({
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

const MemberCard = ({ index, img, name, title, description, socials }) => {
  const isMobile = useIsMobile();
  const mainControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div className="flex flex-col items-start gap-6 group">
      {/* IMAGE FRAME */}
      <motion.div
        ref={ref}
        custom={isMobile ? 0 : index}
        variants={cardVariants}
        initial="hidden"
        animate={mainControls}
        className="w-full aspect-square rounded-3xl group-last:rounded-full bg-linear-to-br from-primary-soft/70 to-primary-dark/70 overflow-hidden flex items-center justify-center"
      >
        {img && (
          <motion.div
            className="w-full aspect-square"
            custom={isMobile ? 0 : index}
            initial={{ scale: 1.4 }}
            animate={mainControls}
            variants={imgVariants}
          >
            <Image
              src={img}
              alt={name}
              className="w-full h-full object-cover opacity-85"
              width={600}
              height={600}
            />
          </motion.div>
        )}
      </motion.div>

      {/* INFO */}
      <div className="flex flex-col gap-1">
        <p className="body-lg font-medium text-lg text-n-1">{name}</p>
        <p className="body-lg text-sm text-n-1">{title}</p>
        <p className="body-lg text-sm text-n-4">{description}</p>
      </div>

      {/* ICONS */}
      <div className="flex gap-4 mt-2">
        {socials?.map((social, i) => {
          const Icon = social.icon;

          return (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="opacity-80 hover:opacity-100 transition"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MemberCard;
