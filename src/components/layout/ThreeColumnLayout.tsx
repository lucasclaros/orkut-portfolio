"use client";

import { useI18n } from "@/i18n";

interface ThreeColumnLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export function ThreeColumnLayout({
  left,
  center,
  right,
}: ThreeColumnLayoutProps) {
  const { t } = useI18n();

  return (
    <>
      <div className="max-w-[960px] mx-auto px-[8px] py-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_220px] gap-[8px]">
          {/* Left sidebar */}
          <aside className="space-y-[8px]">{left}</aside>

          {/* Main content */}
          <main className="space-y-[8px] min-w-0">{center}</main>

          {/* Right sidebar */}
          <aside className="space-y-[8px]">{right}</aside>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[960px] mx-auto px-[8px] pb-[16px]">
        <div className="border-t border-[#B9CDE5] pt-[8px] text-center text-[10px] text-[#666]">
          <p>
            &copy; 2007 orkut.com |{" "}
            <span className="text-[#315B9E]">{t("sidebar.about")}</span> |{" "}
            <span className="text-[#315B9E]">{t("sidebar.privacy")}</span> |{" "}
            <span className="text-[#315B9E]">{t("sidebar.terms")}</span> |{" "}
            <span className="text-[#315B9E]">{t("nav.contact")}</span>
          </p>
          <p className="mt-[2px] text-[9px] text-[#999]">
            {t("sidebar.madeWith")}
          </p>
        </div>
      </div>
    </>
  );
}
