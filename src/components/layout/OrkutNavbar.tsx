"use client";

import { useI18n } from "@/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function OrkutNavbar() {
  const { t, locale, toggleLocale } = useI18n();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const otherLocaleLabel = locale === "pt-BR" ? "EN" : "PT-BR";

  const navItems = [
    { path: "/perfil", label: t("nav.home") },
    { path: "/depoimentos", label: t("nav.testimonials") },
    { path: "/comunidades", label: t("nav.communities") },
    { path: "/albuns", label: t("nav.albums") },
    { path: "/contato", label: t("nav.contact") },
  ];

  return (
    <nav className="bg-white border-b border-[#D8DFEA] px-2 py-[6px]">
      <div className="max-w-[960px] mx-auto flex items-center justify-between">
        {/* Left: logo + nav pills */}
        <div className="flex items-center gap-[10px]">
          {/* Logo */}
          <Link href="/perfil" className="no-underline shrink-0">
            <span className="text-[#ED008C] font-bold text-[28px] leading-none">
              orkut
            </span>
          </Link>

          {/* Nav pills - desktop */}
          <div className="hidden md:flex items-center gap-[4px]">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-[10px] py-[3px] rounded-[4px] text-[11px] no-underline ${
                    isActive
                      ? "bg-[#6D84B4] text-white font-bold"
                      : "bg-[#D1E1F5] text-[#315B9E] hover:bg-[#B9CDE5]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: lang toggle + search */}
        <div className="hidden md:flex items-center gap-[6px] text-[10px]">
          <button
            onClick={toggleLocale}
            className="text-[#315B9E] bg-transparent border-none cursor-pointer hover:underline text-[10px]"
          >
            [{otherLocaleLabel}]
          </button>
          <input
            type="text"
            placeholder={t("sidebar.searchPlaceholder")}
            className="w-[130px] border border-[#C3D1E0] rounded-[3px] px-[4px] py-[2px] text-[10px] bg-white focus:outline-none"
            readOnly
          />
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="md:hidden flex items-center gap-[8px]">
          <button
            onClick={toggleLocale}
            className="text-[#315B9E] text-[10px] bg-transparent border-none cursor-pointer"
          >
            {otherLocaleLabel}
          </button>
          <button
            className="text-[#333] text-[20px] cursor-pointer bg-transparent border-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-[6px] flex flex-wrap gap-[4px]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-[10px] py-[4px] rounded-[4px] text-[12px] no-underline ${
                  isActive
                    ? "bg-[#6D84B4] text-white font-bold"
                    : "bg-[#D1E1F5] text-[#315B9E]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
