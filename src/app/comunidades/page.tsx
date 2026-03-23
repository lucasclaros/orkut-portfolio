"use client";

import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { communities } from "@/data/communities";

export default function ComunidadesPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <OrkutCard title={`${t("communities.title")} (${communities.length})`}>
            <div className="divide-y divide-[#E8E8E8]">
              {communities.map((community, i) => (
                <div
                  key={community.id}
                  className={`flex gap-[8px] p-[8px] hover:bg-[#EDF2FA] cursor-pointer ${
                    i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"
                  }`}
                >
                  {/* Icon / Cover */}
                  <div className="w-[50px] h-[50px] rounded-[3px] overflow-hidden shrink-0 border border-[#C3D1E0]">
                    {community.cover ? (
                      <img src={community.cover} alt={community.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E8F0FE] to-[#C5D7F1] flex items-center justify-center">
                        <span className="text-[22px]">{community.icon}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[11px] text-[#315B9E] mb-[1px]">
                      {community.name}
                    </h4>
                    <p className="text-[10px] text-[#666] leading-[1.4]">
                      {community.description[locale]}
                      {community.emoticon && (
                        <img
                          src={community.emoticon}
                          alt=""
                          className="inline-block w-[15px] h-[15px] ml-[4px] align-middle"
                        />
                      )}
                    </p>
                    <div className="flex gap-[8px] mt-[3px] text-[9px] text-[#999]">
                      <span>
                        {community.members.toLocaleString()} {t("communities.members")}
                      </span>
                      {community.yearsExp && (
                        <>
                          <span>|</span>
                          <span>
                            {community.yearsExp} {t("communities.yearsExp")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </OrkutCard>
        }
        right={<QuickStats />}
      />
    </>
  );
}
