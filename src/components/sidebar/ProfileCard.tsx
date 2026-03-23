"use client";

import { useI18n } from "@/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarRating } from "@/components/ui/StarRating";

export function ProfileCard() {
  const { t } = useI18n();
  const pathname = usePathname();

  const sidebarNav = [
    { path: "/perfil", label: t("sidebar.profile") },
    { path: "/contato", label: t("sidebar.scraps") },
    { path: "/albuns", label: t("sidebar.photos") },
    { path: "/depoimentos", label: t("nav.testimonials") },
  ];

  return (
    <div>
      {/* Profile card */}
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden mb-[8px]">
        {/* Mobile: horizontal layout */}
        <div className="flex md:block">
          {/* Photo */}
          <div className="p-[6px] w-[100px] shrink-0 md:w-full">
            <div className="w-full aspect-square rounded-[3px] border border-[#C3D1E0] overflow-hidden">
              <img src="/images/pfp.png" alt="Lucas Claros" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Name and info */}
          <div className="px-[8px] py-[6px] md:pb-[4px] md:pt-0 flex-1 min-w-0">
            <h2 className="font-bold text-[12px] text-[#315B9E]">Lucas Claros</h2>
            <p className="text-[10px] text-[#ED008C] font-bold mt-[1px]">
              {t("sidebar.software_engineer")}
            </p>
            <p className="text-[10px] text-[#666] mt-[1px]">
              {t("sidebar.male")}, 24
            </p>
            <p className="text-[10px] text-[#999]">Catanduva, SP, Brasil</p>

            {/* Star ratings - inline on mobile */}
            <div className="mt-[4px] md:hidden">
              <StarRating label={t("sidebar.reliable")} rating={3} />
              <StarRating label={t("sidebar.cool")} rating={3} />
              <StarRating label={t("sidebar.sexy")} rating={2} />
            </div>
          </div>
        </div>

        {/* Star ratings - desktop only */}
        <div className="hidden md:block px-[8px] py-[6px] border-t border-[#E8E8E8]">
          <StarRating label={t("sidebar.reliable")} rating={3} />
          <StarRating label={t("sidebar.cool")} rating={3} />
          <StarRating label={t("sidebar.sexy")} rating={2} />
        </div>

        {/* Stats */}
        <div className="px-[8px] py-[6px] border-t border-[#E8E8E8]">
          <div className="grid grid-cols-3 gap-[4px] text-center">
            <div>
              <p className="font-bold text-[13px] text-[#315B9E]">4+</p>
              <p className="text-[8px] text-[#666]">{t("sidebar.yearsExp")}</p>
            </div>
            <div>
              <p className="font-bold text-[13px] text-[#315B9E]">5</p>
              <p className="text-[8px] text-[#666]">{t("sidebar.projects")}</p>
            </div>
            <div>
              <p className="font-bold text-[13px] text-[#315B9E]">2</p>
              <p className="text-[8px] text-[#666]">{t("sidebar.companies")}</p>
            </div>
          </div>
        </div>

        {/* Download resume */}
        <div className="px-[8px] py-[6px] border-t border-[#E8E8E8]">
          <a
            href="/Lucas-Claros-Resume.pdf"
            download
            className="block text-center text-[10px] text-white bg-[#6D84B4] hover:bg-[#5A7199] rounded-[3px] py-[4px] px-[6px] no-underline font-bold"
          >
            {t("sidebar.downloadResume")}
          </a>
        </div>
      </div>

      {/* Action link - hidden on mobile (redundant with navbar) */}
      <p className="hidden md:block text-[10px] text-[#315B9E] mb-[6px] cursor-pointer hover:underline">
        + {t("sidebar.addFriend")}
      </p>

      {/* More link */}
      <p className="hidden md:block text-[10px] text-[#315B9E] mb-[8px] cursor-pointer hover:underline">
        {t("sidebar.more")} ▸
      </p>

      {/* Navigation links - hidden on mobile (redundant with navbar) */}
      <div className="hidden md:block space-y-[3px] border-t border-[#D8DFEA] pt-[6px]">
        {sidebarNav.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`block text-[11px] no-underline hover:underline ${
                isActive ? "text-[#333] font-bold" : "text-[#315B9E]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* External links */}
      <div className="hidden md:block space-y-[3px] border-t border-[#D8DFEA] pt-[6px] mt-[8px]">
        <a
          href="https://github.com/lucasclaros"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[10px] text-[#315B9E] hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/lucas-claros-875945198/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[10px] text-[#315B9E] hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="mailto:lucas.claros11@gmail.com"
          className="block text-[10px] text-[#315B9E] hover:underline"
        >
          Email
        </a>
      </div>
    </div>
  );
}
