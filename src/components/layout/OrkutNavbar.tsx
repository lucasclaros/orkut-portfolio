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
    { path: "/perfil", label: locale === "pt-BR" ? "início" : "home" },
    { path: "/contato", label: locale === "pt-BR" ? "página de recados" : "scrapbook" },
    { path: "/projetos", label: t("nav.projects") },
    { path: "/comunidades", label: t("nav.communities") },
  ];

  return (
    <nav className="px-2" style={{ background: "linear-gradient(180deg, #6D84B4 0%, #5B72A0 100%)" }}>
      <div className="max-w-[960px] mx-auto flex items-stretch justify-between">
        {/* Left: logo container + nav links */}
        <div className="flex items-stretch gap-[10px]">
          {/* Logo in white/gradient container - full height of navbar */}
          <Link href="/perfil" className="no-underline shrink-0 flex items-center justify-center px-[12px] -ml-2" style={{ background: "linear-gradient(180deg, #ebebeb 0%, #fff 33%, #fff 83%, #ccc 100%)" }}>
            <img src="/images/orkut-logo.png" alt="orkut" className="h-[18px] w-auto relative -top-[2px]" />
          </Link>

          {/* Nav links - desktop */}
          <div className="hidden md:flex items-center gap-[14px] text-[12px] py-[4px]">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`no-underline hover:underline whitespace-nowrap ${
                    isActive ? "font-bold" : ""
                  }`}
                  style={{ color: "white" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: email + sair + lang + search */}
        <div className="hidden md:flex items-center gap-[8px] text-[12px] py-[4px]">
          <span className="text-[#36527d] font-bold text-[12px]">lucas.claros11@gmail.com</span>
          <button
            onClick={toggleLocale}
            className="text-white bg-transparent border-none cursor-pointer hover:underline text-[12px]"
          >
            [{otherLocaleLabel}]
          </button>
          <div className="flex items-center">
            <input
              type="text"
              placeholder={t("sidebar.searchPlaceholder")}
              className="w-[130px] border border-[#C3D1E0] rounded-l-[3px] px-[6px] py-[3px] text-[11px] bg-white focus:outline-none"
              readOnly
            />
            <button className="bg-[#6D84B4] border border-[#5A7199] rounded-r-[3px] px-[4px] py-[3px] cursor-pointer flex items-center">
              <img src="/images/orkut-search.png" alt="search" className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="md:hidden flex items-center gap-[8px]">
          <button
            onClick={toggleLocale}
            className="text-white text-[10px] bg-transparent border-none cursor-pointer hover:underline"
          >
            {otherLocaleLabel}
          </button>
          <button
            className="text-white text-[20px] cursor-pointer bg-transparent border-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-[6px] flex flex-col gap-[2px] text-[12px]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`py-[4px] px-[8px] no-underline hover:underline ${
                  isActive ? "font-bold" : ""
                }`}
                style={{ color: "white" }}
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
