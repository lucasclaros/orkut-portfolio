import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "Lucas Claros - Portfolio",
  description:
    "Software Engineer portfolio - Flutter, Kotlin, React, TypeScript",
  openGraph: {
    title: "Lucas Claros - Software Engineer",
    description:
      "Portfolio com tema Orkut. Flutter, Kotlin/Spring Boot, React/TypeScript. 4+ anos de experiência.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    siteName: "Lucas Claros Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Claros - Software Engineer",
    description:
      "Portfolio com tema Orkut. Flutter, Kotlin/Spring Boot, React/TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full bg-orkut-bg font-orkut text-orkut-text text-[12px]">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
