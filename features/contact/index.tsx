import { ContactFormContent } from "./components/ContactFormContent";
import { Suspense } from "react";
import { ContactHero } from "./components/ContactHero";
import { useTranslations } from "next-intl";
import {
  getCategorySelectorData,
  getContactFormContentData,
  getContactHeroData,
  getContactSidebarData,
} from "./data";
import ContactSidebar from "./components/ContactSidebar";

export const ContactPage: React.FC = () => {
  const t = useTranslations("contact");
  const heroData = getContactHeroData(t);
  const formData = getContactFormContentData(t);
  const sidebarData = getContactSidebarData(t);
  const categorySelectorProps = getCategorySelectorData(t);

  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ContactHero {...heroData} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <div className="w-full lg:w-7/12 order-1 lg:order-2">
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden min-h-[500px]">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full text-zinc-500 font-sans text-sm animate-pulse">
                    Loading...
                  </div>
                }
              >
                <ContactFormContent {...formData} {...categorySelectorProps} />
              </Suspense>
            </div>
          </div>

          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <ContactSidebar {...sidebarData} />
          </div>
        </div>
      </div>
    </div>
  );
};
