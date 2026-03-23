"use client";

import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { testimonials } from "@/data/testimonials";

export default function DepoimentosPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <OrkutCard title={`${t("testimonials.title")} (${testimonials.length})`}>
            <div className="divide-y divide-[#E8E8E8]">
              {testimonials.map((testimonial, i) => (
                <div
                  key={testimonial.id}
                  className={`flex gap-[8px] p-[8px] ${
                    i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-[50px] h-[50px] rounded-[3px] overflow-hidden shrink-0 border border-[#C3D1E0]">
                    <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-[4px] mb-[2px]">
                      <span className="font-bold text-[11px] text-[#315B9E]">
                        {testimonial.name}
                      </span>
                      <span className="text-[10px] text-[#999]">
                        ({testimonial.role})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#333] leading-[1.5]">
                      &ldquo;{testimonial.quote[locale]}&rdquo;{" "}
                      <img src={testimonial.emoticon} alt="" className="inline-block w-[16px] h-[16px] align-middle" />
                    </p>
                    <span className="text-[9px] text-[#999] mt-[2px] block">
                      {testimonial.date}
                    </span>
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
