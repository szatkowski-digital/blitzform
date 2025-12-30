"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

export default function ClientWrapper({ children }) {
  return (
    <div className="min-h-dvh overscroll-none">
      <Header />

      <LazyMotion features={domAnimation}>{children}</LazyMotion>

      <Footer />
    </div>
  );
}
