import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const LogoAnimation = ({ scrolled }) => {
  // const maskVariants = {
  //   hidden: { x: 0 },
  //   visible1: {
  //     x: "-110%",
  //     transition: { duration: 0.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] },
  //   },
  //   visible2: {
  //     x: "110%",
  //     transition: { duration: 0.3, delay: 0.25, ease: [0.4, 0, 0.2, 1] },
  //   },
  //   visible3: {
  //     x: "-110%",
  //     transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  //   },
  // };

  return (
    <motion.div
      initial="false"
      className="cursor-pointer select-none overflow-hidden"
      animate={{ scale: scrolled ? 0.8 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="relative block w-28 lg:w-35 h-12">
        {/* LOGO – Static */}
        <Image
          src="/logo.svg"
          alt="Blitzform"
          className="hidden lg:block w-full h-full object-contain"
          width={102}
          height={62}
        />

        <Image
          src="/logo_m.svg"
          alt="Blitzform"
          className="block lg:hidden w-full h-full object-contain"
          width={209}
          height={28}
        />

        {/* {!scrolled && (
          <>
            <motion.div
              className="absolute inset-0 bg-n-8"
              variants={maskVariants}
              initial="hidden"
              animate="visible1"
              style={{ clipPath: "inset(-5% 0% 70% 0%)" }}
            />
            <motion.div
              className="absolute inset-0 bg-n-8"
              variants={maskVariants}
              initial="hidden"
              animate="visible2"
              style={{ clipPath: "inset(25% 0% 25% 0%)" }}
            />
            <motion.div
              className="absolute inset-0 bg-n-8"
              variants={maskVariants}
              initial="hidden"
              animate="visible3"
              style={{ clipPath: "inset(30% 0% -5% 0%)" }}
            />
          </>
        )} */}
      </Link>
    </motion.div>
  );
};
