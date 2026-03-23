"use client";

import { useI18n } from "@/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileCard() {
  const { t } = useI18n();
  const pathname = usePathname();

  const sidebarNav = [
    { path: "/perfil", label: t("sidebar.profile"), icon: "/images/emoticons/sidebar-perfil.png" },
    { path: "/contato", label: t("sidebar.scraps"), icon: "/images/emoticons/sidebar-recados.png" },
    { path: "/projetos", label: t("sidebar.projects"), icon: "/images/emoticons/sidebar-videos.png" },
    { path: "/depoimentos", label: t("sidebar.testimonials"), icon: "/images/emoticons/sidebar-depoimentos.png" },
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
            <p className="text-[10px] text-[#666] mt-[1px]">
              {t("sidebar.male")}, 24
            </p>
            <p className="text-[10px] text-[#999]">Catanduva, SP, Brasil</p>
          </div>
        </div>

        {/* Action links */}
        <div className="px-[8px] py-[4px] border-t border-[#E8E8E8]">
          <p className="text-[10px] text-[#315B9E] cursor-pointer hover:underline">
            + {t("sidebar.addFriend")}
          </p>
          <p className="text-[10px] text-[#315B9E] cursor-pointer hover:underline mt-[2px]">
            {t("sidebar.more")} &raquo;
          </p>
        </div>

        {/* Icon menu - orkut style with bg-[#eff9ff] and border-[#dde9f8] */}
        <div className="border-t border-[#dde9f8]">
          {sidebarNav.map((link, i) => {
            const isActive = pathname === link.path;
            const isFirst = i === 0;
            const isLast = i === sidebarNav.length - 1;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-[6px] px-[8px] py-[3px] text-[12px] no-underline border border-[#dde9f8] border-t-0 leading-[22px] ${
                  isFirst ? "rounded-t-[2px]" : ""
                } ${isLast ? "rounded-b-[2px]" : ""} ${
                  isActive
                    ? "text-[#333] font-bold bg-[#d9e8fc]"
                    : "text-[#535c69] bg-[#eff9ff] hover:bg-[#e0edfa]"
                }`}
              >
                <img src={link.icon} alt="" className="w-[16px] h-[16px]" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden mb-[8px]">
        <div className="px-[8px] py-[6px]">
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
      </div>

      {/* Download resume */}
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden mb-[8px]">
        <div className="px-[8px] py-[6px]">
          <a
            href="/Lucas-Claros-Resume.pdf"
            download
            className="block text-center text-[10px] text-white bg-[#6D84B4] hover:bg-[#5A7199] rounded-[3px] py-[4px] px-[6px] no-underline font-bold"
          >
            {t("sidebar.downloadResume")}
          </a>
        </div>
      </div>

      {/* External links */}
      <div className="hidden md:block space-y-[3px]">
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
