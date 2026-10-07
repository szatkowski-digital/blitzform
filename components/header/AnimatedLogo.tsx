import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface LogoAnimationProps {
  scrolled: boolean;
}

export const LogoAnimation = ({ scrolled }: LogoAnimationProps) => {
  return (
    <motion.div
      className="cursor-pointer select-none origin-left flex items-center"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: scrolled ? 0.85 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <Link href="/" className="relative block w-28 lg:w-35 h-12">
        {/* Desktop Logo */}
        <Image
          src="/logo.svg"
          alt="Blitzform"
          className="hidden lg:block w-full h-full object-contain"
          width={102}
          height={62}
          priority
        />

        {/* Mobile Logo */}
        <Image
          src="/logo_m.svg"
          alt="Blitzform"
          className="block lg:hidden w-full h-full object-contain"
          width={209}
          height={28}
          priority
        />
      </Link>
    </motion.div>
  );
};

export default LogoAnimation;
