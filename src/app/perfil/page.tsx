"use client";

import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { scraps } from "@/data/scraps";
import { albums } from "@/data/albums";
import { useState } from "react";
import Link from "next/link";

const experience = [
  {
    role: { "pt-BR": "Software Engineer I", en: "Software Engineer I" },
    company: "Cobli",
    period: { "pt-BR": "2023 – presente", en: "2023 – present" },
    description: {
      "pt-BR":
        "Fullstack com Flutter, Kotlin/Spring Boot e React/TypeScript. Referência em Flutter na empresa. Features usadas por centenas de frotas e milhares de motoristas.",
      en: "Fullstack with Flutter, Kotlin/Spring Boot and React/TypeScript. Company-wide Flutter reference. Shipped features used by hundreds of fleets and thousands of drivers.",
    },
    icon: "/images/companies/cobli.png",
  },
  {
    role: { "pt-BR": "Estagiário de Software", en: "Software Intern" },
    company: "Cobli",
    period: { "pt-BR": "2022 – 2023", en: "2022 – 2023" },
    description: {
      "pt-BR":
        "Desenvolvimento mobile com Flutter e participação em projetos fullstack. Transição de estagiário para engenheiro.",
      en: "Mobile development with Flutter and participation in fullstack projects. Transitioned from intern to engineer.",
    },
    icon: "/images/companies/cobli.png",
  },
  {
    role: { "pt-BR": "Estagiário Mobile", en: "Mobile Intern" },
    company: "Tokenlab",
    period: { "pt-BR": "2021 – 2022", en: "2021 – 2022" },
    description: {
      "pt-BR":
        "Desenvolvimento mobile com Flutter e Dart. Primeiro contato profissional com desenvolvimento de software.",
      en: "Mobile development with Flutter and Dart. First professional experience with software development.",
    },
    icon: "/images/companies/tokenlab.png",
  },
  {
    role: {
      "pt-BR": "Ciência da Computação – USP",
      en: "Computer Science – USP",
    },
    company: "USP",
    period: { "pt-BR": "2020 – 2024", en: "2020 – 2024" },
    description: {
      "pt-BR":
        "Universidade de São Paulo. Algoritmos, estruturas de dados, sistemas operacionais, computação gráfica.",
      en: "University of São Paulo. Algorithms, data structures, operating systems, computer graphics.",
    },
    icon: "/images/companies/icmc.jpg",
  },
  {
    role: {
      "pt-BR": "Técnico em Mecatrônica – IFSP",
      en: "Mechatronics Technician – IFSP",
    },
    company: "IFSP",
    period: { "pt-BR": "2016 – 2019", en: "2016 – 2019" },
    description: {
      "pt-BR":
        "Instituto Federal de São Paulo. Eletrônica, programação, automação. TCC: estufa automatizada com ESP32 e app mobile.",
      en: "Federal Institute of São Paulo. Electronics, programming, automation. Final project: automated greenhouse with ESP32 and mobile app.",
    },
    icon: "/images/companies/ifsp.png",
  },
];

type ProfileTab = "social" | "professional";

export default function PerfilPage() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<ProfileTab>("social");

  const professionalInfo = [
    { label: t("profile.role"), value: t("profile.roleValue") },
    { label: t("profile.company"), value: t("profile.companyValue") },
    { label: t("profile.stack"), value: t("profile.stackValue") },
    { label: t("profile.education"), value: t("profile.educationValue") },
    { label: t("profile.languages"), value: t("profile.languagesValue") },
    { label: t("profile.interests"), value: t("profile.interestsValue") },
  ];

  const socialInfo = [
    { label: t("profile.relationship"), value: t("profile.relationshipValue") },
    { label: t("profile.humor"), value: t("profile.humorValue") },
    { label: t("profile.children"), value: t("profile.childrenValue") },
    { label: t("profile.smoker"), value: t("profile.smokerValue") },
    { label: t("profile.livesWith"), value: t("profile.livesWithValue") },
    { label: t("profile.country"), value: t("profile.countryValue") },
    { label: t("profile.city"), value: t("profile.cityValue") },
    { label: t("profile.style"), value: t("profile.styleValue") },
    { label: t("profile.passion"), value: t("profile.passionValue") },
    { label: t("profile.music"), value: t("profile.musicValue") },
    { label: t("profile.movies"), value: t("profile.moviesValue") },
    { label: t("profile.books"), value: t("profile.booksValue") },
  ];

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "social", label: "social" },
    { key: "professional", label: locale === "pt-BR" ? "profissional" : "professional" },
  ];

  const currentTabData =
    activeTab === "professional"
      ? professionalInfo
      : socialInfo;

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <>
            {/* Profile header */}
            <div className="bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden">
              <div className="p-[10px]">
                {/* Name - hidden on mobile since ProfileCard already shows it */}
                <h1 className="hidden md:block text-[18px] font-bold text-[#333] mb-[6px]">Lucas Claros</h1>

                {/* Barra de avaliacoes */}
                <div className="grid grid-cols-3 md:flex md:items-start gap-[12px]">
                  {/* recados */}
                  <Link href="/contato" className="no-underline">
                    <p className="text-[10px] text-[#535c69]">recados</p>
                    <div className="flex items-center gap-[3px]">
                      <img src="/images/emoticons/sidebar-recados.png" alt="" className="w-[16px] h-[16px]" />
                      <span className="text-[12px] text-[#535c69]">{scraps.length}</span>
                    </div>
                  </Link>
                  {/* projetos */}
                  <Link href="/projetos" className="no-underline">
                    <p className="text-[10px] text-[#535c69]">{t("sidebar.projects")}</p>
                    <div className="flex items-center gap-[3px]">
                      <img src="/images/emoticons/sidebar-videos.png" alt="" className="w-[16px] h-[16px]" />
                      <span className="text-[12px] text-[#535c69]">{albums.length}</span>
                    </div>
                  </Link>

                  {/* fas */}
                  <span>
                    <p className="text-[10px] text-[#535c69]">fãs</p>
                    <div className="flex items-center gap-[3px]">
                      <img src="/images/emoticons/orkut-fas.png" alt="" className="w-[16px] h-[16px]" />
                      <span className="text-[12px] text-[#535c69]">15</span>
                    </div>
                  </span>

                  {/* confiavel */}
                  <span>
                    <p className="text-[10px] text-[#535c69]">{t("sidebar.reliable")}</p>
                    <div className="flex items-center">
                      <img src="/images/emoticons/orkut-confiavel.png" alt="" className="w-[18px] h-[18px]" />
                      <img src="/images/emoticons/orkut-confiavel.png" alt="" className="w-[18px] h-[18px]" />
                      <img src="/images/emoticons/orkut-confiavel.png" alt="" className="w-[18px] h-[18px]" />
                    </div>
                  </span>
                  {/* legal */}
                  <span>
                    <p className="text-[10px] text-[#535c69]">{t("sidebar.cool")}</p>
                    <div className="flex items-center">
                      <img src="/images/emoticons/orkut-legal.png" alt="" className="w-[18px] h-[18px]" />
                      <img src="/images/emoticons/orkut-legal.png" alt="" className="w-[18px] h-[18px]" />
                      <img src="/images/emoticons/orkut-legal.png" alt="" className="w-[18px] h-[18px]" />
                    </div>
                  </span>
                  {/* sexy */}
                  <span>
                    <p className="text-[10px] text-[#535c69]">sexy</p>
                    <div className="flex items-center">
                      <img src="/images/emoticons/orkut-sexy.png" alt="" className="w-[18px] h-[18px]" />
                      <img src="/images/emoticons/orkut-sexy.png" alt="" className="w-[18px] h-[18px]" />
                      <img src="/images/emoticons/orkut-sexy.png" alt="" className="w-[18px] h-[18px]" />
                    </div>
                  </span>
                </div>
              </div>

              {/* Divider line */}
              <div className="border-t border-[#C3D1E0]" />

              {/* About me */}
              <div className="px-[10px] py-[6px]">
                <h3 className="text-[11px] font-bold text-[#315B9E] mb-[4px]">{t("profile.aboutMe")}</h3>
                <p className="text-[11px] leading-[1.6] text-[#333]">
                  {t("profile.aboutText")}
                </p>
              </div>

              {/* Tabs: social | professional | personal */}
              <div className="flex gap-[2px] px-[6px] pt-[4px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-[10px] py-[3px] text-[12px] font-bold cursor-pointer border-none rounded-t-[7px] ${
                      activeTab === tab.key
                        ? "text-white"
                        : "bg-transparent text-[#315B9E] hover:bg-[#E8EEF7] rounded-t-[4px]"
                    }`}
                    style={activeTab === tab.key ? {
                      background: "linear-gradient(180deg, #517fc5 13%, rgba(81,127,197,0.75) 31%, rgba(81,127,197,0.75) 83%, #517fc5 96%)"
                    } : undefined}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content - info table */}
              <table className="w-full text-[11px] border-collapse">
                <tbody>
                  {currentTabData.map((item, i) => (
                    <tr
                      key={item.label}
                      className={i % 2 === 0 ? "bg-[#D1E1F5]" : "bg-[#E8F0FE]"}
                    >
                      <td className="py-[4px] px-[8px] font-bold text-[#666] w-[130px] align-top text-right">
                        {item.label}:
                      </td>
                      <td className="py-[4px] px-[8px] text-[#333]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Experience timeline - only in professional tab */}
              {activeTab === "professional" && (
                <>
                  <div className="border-t border-[#C3D1E0]" />
                  <div className="px-[10px] py-[6px]">
                    <h3 className="text-[11px] font-bold text-[#315B9E] mb-[4px]">{t("profile.experience")}</h3>
                  </div>
                  <div className="divide-y divide-[#E8E8E8]">
                    {experience.map((exp, i) => (
                      <div
                        key={exp.company + exp.period[locale]}
                        className={`flex gap-[8px] p-[8px] ${
                          i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"
                        }`}
                      >
                        <div className="w-[40px] h-[40px] rounded-[3px] bg-white flex items-center justify-center shrink-0 border border-[#D8DFEA] overflow-hidden">
                          <img src={exp.icon} alt={exp.company} className="w-[36px] h-[36px] object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-[4px] flex-wrap">
                            <span className="font-bold text-[11px] text-[#315B9E]">
                              {exp.role[locale]}
                            </span>
                            <span className="text-[10px] text-[#999]">
                              @ {exp.company}
                            </span>
                          </div>
                          <p className="text-[9px] text-[#999] mt-[1px]">
                            {exp.period[locale]}
                          </p>
                          <p className="text-[10px] text-[#333] leading-[1.4] mt-[2px]">
                            {exp.description[locale]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>

          </>
        }
        right={<QuickStats />}
      />
    </>
  );
}
