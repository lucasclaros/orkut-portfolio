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
  { name: "Alan Turing", photo: "/images/friends/alan-turing.jpg" },
  { name: "Ada Lovelace", photo: "/images/friends/ada-lovelace.png" },
  { name: "Linus Torvalds", photo: "/images/friends/linus-torvalds.jpg" },
  { name: "Grace Hopper", photo: "/images/friends/grace-hopper.jpg" },
  { name: "Dennis Ritchie", photo: "/images/friends/dennis-ritchie.jpg" },
  { name: "Margaret Hamilton", photo: "/images/friends/margaret-hamilton.jpg" },
  { name: "Guido van Rossum", photo: "/images/friends/guido-van-rossum.jpg" },
  { name: "Tim Berners-Lee", photo: "/images/friends/tim-berners-lee.jpg" },
  { name: "Brendan Eich", photo: "/images/friends/brendan-eich.jpg" },
];

const communityThumbs = [
  { name: "Flutter Devs", logo: "/images/communities/flutter.png" },
  { name: "Kotlin", logo: "/images/communities/kotlin.png" },
  { name: "React", logo: "/images/communities/react.png" },
  { name: "Docker", logo: "/images/communities/docker.png" },
  { name: "Clean Arch", logo: "/images/communities/clean-arch.png" },
  { name: "Firebase", logo: "/images/communities/firebase.png" },
  { name: "Spring Boot", logo: "/images/communities/spring-boot.png" },
  { name: "TypeScript", logo: "/images/communities/typescript.png" },
  { name: "Git", logo: "/images/communities/git.png" },
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
                <p className="text-[8px] text-[#315B9E] mt-[2px] truncate leading-tight">
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
                <div className="w-full aspect-square rounded-[2px] overflow-hidden border border-[#D8DFEA] bg-white flex items-center justify-center p-[4px]">
                  <img
                    src={comm.logo}
                    alt={comm.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="text-[8px] text-[#315B9E] mt-[2px] truncate leading-tight">
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
