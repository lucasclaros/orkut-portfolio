"use client";

import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";

const experience = [
  {
    role: { "pt-BR": "Software Engineer", en: "Software Engineer" },
    company: "Cobli",
    period: { "pt-BR": "2022 – presente", en: "2022 – present" },
    description: {
      "pt-BR":
        "Fullstack com Flutter, Kotlin/Spring Boot e React/TypeScript. Referência em Flutter na empresa. Features usadas por centenas de frotas e milhares de motoristas.",
      en: "Fullstack with Flutter, Kotlin/Spring Boot and React/TypeScript. Company-wide Flutter reference. Shipped features used by hundreds of fleets and thousands of drivers.",
    },
    icon: "🚛",
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
    icon: "📱",
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
    icon: "🎓",
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
    icon: "⚙️",
  },
];

export default function PerfilPage() {
  const { t, locale } = useI18n();

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
    { label: t("profile.style"), value: t("profile.styleValue") },
    { label: t("profile.passion"), value: t("profile.passionValue") },
    { label: t("profile.music"), value: t("profile.musicValue") },
    { label: t("profile.movies"), value: t("profile.moviesValue") },
    { label: t("profile.books"), value: t("profile.booksValue") },
    { label: t("profile.country"), value: t("profile.countryValue") },
    { label: t("profile.city"), value: t("profile.cityValue") },
  ];

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <>
            {/* Welcome banner */}
            <div className="bg-white border border-[#C3D1E0] rounded-[5px] p-[8px] text-[11px] text-[#666]">
              {t("sidebar.welcomeTo")}{" "}
              <span className="font-bold text-[#315B9E]">Lucas Claros</span>!
            </div>

            {/* About me */}
            <OrkutCard title={t("profile.aboutMe")}>
              <p className="text-[11px] leading-[1.6] text-[#333]">
                {t("profile.aboutText")}
              </p>
            </OrkutCard>

            {/* Professional info */}
            <OrkutCard title={t("profile.professionalInfo")}>
              <table className="w-full text-[11px]">
                <tbody>
                  {professionalInfo.map((item, i) => (
                    <tr
                      key={item.label}
                      className={i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"}
                    >
                      <td className="py-[4px] px-[6px] font-bold text-[#666] w-[130px] align-top">
                        {item.label}:
                      </td>
                      <td className="py-[4px] px-[6px] text-[#333]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </OrkutCard>

            {/* Social info */}
            <OrkutCard title={t("profile.socialInfo")}>
              <table className="w-full text-[11px]">
                <tbody>
                  {socialInfo.map((item, i) => (
                    <tr
                      key={item.label}
                      className={i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"}
                    >
                      <td className="py-[4px] px-[6px] font-bold text-[#666] w-[130px] align-top">
                        {item.label}:
                      </td>
                      <td className="py-[4px] px-[6px] text-[#333]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </OrkutCard>

            {/* Experience timeline */}
            <OrkutCard title={t("profile.experience")}>
              <div className="divide-y divide-[#E8E8E8]">
                {experience.map((exp, i) => (
                  <div
                    key={exp.company + exp.period[locale]}
                    className={`flex gap-[8px] p-[8px] ${
                      i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"
                    }`}
                  >
                    <div className="w-[40px] h-[40px] rounded-[3px] bg-gradient-to-br from-[#E8F0FE] to-[#C5D7F1] flex items-center justify-center shrink-0 border border-[#D8DFEA]">
                      <span className="text-[20px]">{exp.icon}</span>
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
            </OrkutCard>
          </>
        }
        right={<QuickStats />}
      />
    </>
  );
}
