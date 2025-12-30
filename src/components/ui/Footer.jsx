import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-n-3 bg-n-8 py-10 text-neutral-400">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="relative block w-28 lg:w-35 h-12">
            {/* LOGO – Static */}
            <Image
              src="/logo_m.svg"
              alt="Blitzform"
              className="block w-full h-full object-contain"
              width={209}
              height={28}
            />
          </Link>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:text-neutral-200 transition"
            >
              Privacy Notice
            </Link>

            <span className="text-neutral-600">|</span>
            <p>© {new Date().getFullYear()} BlitzForm</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
