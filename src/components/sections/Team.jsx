"use client";

import MemberCard from "@/components/ui/MemberCard";
import { useTranslations } from "next-intl";
import { teamConfig } from "@/config/icons";

const Team = () => {
  const t = useTranslations("about");
  const members = t.raw("team.members");

  return (
    <section className="container xl:px-24 space-y-24">
      <h2 className="h1 text-center">{t("team.header")}</h2>

      <div className="grid grid-cols-1 max-sm:px-8 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {members.map((member, index) => {
          const config = teamConfig[member.id];

          return (
            <MemberCard
              index={index}
              key={member.id}
              img={config.image}
              name={member.name}
              title={member.title}
              description={member.description}
              socials={config.socials}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Team;
