"use client";

import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { OrkutButton } from "@/components/ui/OrkutButton";
import { useState } from "react";

export default function ContatoPage() {
  const { t } = useI18n();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <>
            <OrkutCard title={t("contact.title")}>
              <p className="text-[11px] text-[#666] mb-[8px]">
                {t("contact.cta")}
              </p>

              {/* Fake scrap form */}
              <div className="space-y-[6px]">
                <textarea
                  className="w-full border border-[#BDC7D8] rounded-[3px] p-[6px] text-[11px] resize-none focus:outline-none focus:border-[#315B9E] bg-white"
                  rows={3}
                  placeholder={t("contact.placeholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex items-center gap-[8px]">
                  <OrkutButton onClick={handleSend}>{t("contact.send")}</OrkutButton>
                  {sent && (
                    <span className="text-[10px] text-[#2E7D32] font-bold">
                      Scrap enviado!{" "}
                      <img src="/images/emoticons/smile.png" alt="" className="inline-block w-[14px] h-[14px] align-middle" />
                    </span>
                  )}
                </div>
              </div>
            </OrkutCard>

            <OrkutCard title={t("contact.orReachMe")}>
              <div className="space-y-[6px]">
                <a
                  href="mailto:lucas.claros11@gmail.com"
                  className="flex items-center gap-[6px] text-[11px] text-[#315B9E] hover:underline p-[4px] bg-[#F4F7FC] rounded-[3px]"
                >
                  <span className="text-[14px]">@</span>
                  lucas.claros11@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/lucas-claros-875945198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[6px] text-[11px] text-[#315B9E] hover:underline p-[4px] bg-white rounded-[3px]"
                >
                  <span className="text-[14px] font-bold">in</span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/lucasclaros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[6px] text-[11px] text-[#315B9E] hover:underline p-[4px] bg-[#F4F7FC] rounded-[3px]"
                >
                  <span className="text-[14px]">{'</>'}</span>
                  GitHub
                </a>
              </div>
            </OrkutCard>
          </>
        }
        right={<QuickStats />}
      />
    </>
  );
}
