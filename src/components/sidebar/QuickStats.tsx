"use client";

import { useI18n } from "@/i18n";
import Link from "next/link";
import { useSyncExternalStore, useCallback } from "react";

function getVisitorCount() {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem("orkut-visitors");
  return stored ? parseInt(stored, 10) : 0;
}

function incrementOnce() {
  if (typeof window === "undefined") return;
  const key = "orkut-visitors-counted";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  const count = getVisitorCount() + 1;
  localStorage.setItem("orkut-visitors", count.toString());
}

const friends = [
  { name: "Δlαη Tµяιηg.exe 🖥️", photo: "/images/friends/alan-turing.jpg" },
  { name: "Ada ♥ Lovelace [π]", photo: "/images/friends/ada-lovelace.png" },
  { name: "LiNuX †ØRvALDs 🐧", photo: "/images/friends/linus-torvalds.jpg" },
  { name: "oOo tααl dØ RØnALdiNhØ gAuChØ ⚽✨", photo: "/images/friends/ronaldinho.jpg" },
  { name: "Z!ZØu ⚽🏆", photo: "/images/friends/zidane.jpg" },
  { name: "R9 • Ø FєηôмєηØ ⚽🇧🇷", photo: "/images/friends/ronaldo-fenomeno.jpg" },
  { name: "Bob Marley ☮ Jah Bless 🌿🎶", photo: "/images/friends/bob-marley.jpg" },
  { name: "Justin Bieber ✨ baby baby ooo 🎵💜", photo: "/images/friends/justin-bieber.jpg" },
  { name: "Avril Lavigne † sk8er girl 🎸🖤", photo: "/images/friends/avril-lavigne.jpg" },
];

const communityThumbs = [
  { name: "Eu ❤ Flutter", logo: "/images/communities/flutter.png" },
  { name: "React & TypeScript Brasil", logo: "/images/communities/react.png" },
  { name: "Docker + Kubernetes na veia", logo: "/images/communities/docker.png" },
  { name: "Eu odeio acordar cedo", logo: "/images/communities/acordar-cedo.jpg" },
  { name: "Eu odeio segunda-feira", logo: "/images/communities/segunda-feira.jpg" },
  { name: "Só mais 5 minutinhos", logo: "/images/communities/5-minutinhos.jpg" },
  { name: "Eu abro a geladeira pra pensar", logo: "/images/communities/geladeira.jpg" },
  { name: "Eu tenho medo do Plantão da Globo", logo: "/images/communities/plantao.jpg" },
  { name: "Queria sorvete, mas era feijão", logo: "/images/communities/sorvete.jpg" },
];

export function QuickStats() {
  const { t } = useI18n();

  incrementOnce();

  const visitors = useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => getVisitorCount(),
    () => 0,
  );

  return (
    <>
      {/* Lucky day banner */}
      <div className="bg-[#FFF9C4] border border-[#E6D87C] rounded-[5px] text-center py-[6px] px-[8px]">
        <p className="text-[9px] text-[#996600] font-bold whitespace-nowrap">
          <img src="/images/emoticons/star.png" alt="" className="inline-block w-[14px] h-[14px] align-middle mr-[2px]" />
          {t("sidebar.luckyDay")}
          <img src="/images/emoticons/star.png" alt="" className="inline-block w-[14px] h-[14px] align-middle ml-[2px]" />
        </p>
      </div>

      {/* Friends */}
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden">
        <div className="bg-[#D1E1F5] px-[8px] py-[4px] border-b border-[#B9CDE5] flex items-center justify-between">
          <h3 className="font-bold text-[11px] text-[#333]">
            {t("sidebar.friends")} ({friends.length})
          </h3>
          <Link
            href="/depoimentos"
            className="text-[9px] text-[#315B9E] no-underline hover:underline"
          >
            {t("sidebar.seeAll")}
          </Link>
        </div>
        <div className="p-[6px]">
          <div className="grid grid-cols-3 gap-[4px]">
            {friends.map((friend) => (
              <div key={friend.name} className="text-center">
                <div className="w-full aspect-square rounded-[2px] overflow-hidden border border-[#D8DFEA]">
                  <img
                    src={friend.photo}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[8px] text-[#315B9E] mt-[2px] leading-tight line-clamp-2">
                  {friend.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communities */}
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden">
        <div className="bg-[#D1E1F5] px-[8px] py-[4px] border-b border-[#B9CDE5] flex items-center justify-between">
          <h3 className="font-bold text-[11px] text-[#333]">
            {t("sidebar.communities")} ({communityThumbs.length})
          </h3>
          <Link
            href="/comunidades"
            className="text-[9px] text-[#315B9E] no-underline hover:underline"
          >
            {t("sidebar.seeAllF")}
          </Link>
        </div>
        <div className="p-[6px]">
          <div className="grid grid-cols-3 gap-[4px]">
            {communityThumbs.map((comm) => (
              <div key={comm.name} className="text-center">
                <div className="w-full aspect-square rounded-[2px] overflow-hidden border border-[#D8DFEA] bg-white flex items-center justify-center">
                  <img
                    src={comm.logo}
                    alt={comm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[8px] text-[#315B9E] mt-[2px] leading-tight line-clamp-2">
                  {comm.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visitor counter */}
      <div className="bg-white border border-[#C3D1E0] rounded-[5px] p-[8px] text-center">
        <p className="text-[10px] text-[#666]">
          <span className="font-bold text-[14px] text-[#315B9E]">
            {visitors}
          </span>{" "}
          {t("sidebar.visitors")}
        </p>
      </div>
    </>
  );
}
