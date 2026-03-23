"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { albums, type Album } from "@/data/albums";

export default function ProjetosPage() {
  const { t, locale } = useI18n();
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <OrkutCard title={`${t("nav.projects")} (${albums.length})`}>
            {/* Project list */}
            {!openAlbum && (
              <div className="divide-y divide-[#E8E8E8]">
                {albums.map((album, i) => (
                  <div
                    key={album.id}
                    className={`flex gap-[8px] p-[8px] ${
                      i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"
                    }`}
                  >
                    {/* Cover thumbnail */}
                    <div
                      className="w-[60px] h-[60px] rounded-[3px] shrink-0 border border-[#D8DFEA] overflow-hidden cursor-pointer"
                      onClick={() =>
                        album.photos.length > 0
                          ? setOpenAlbum(album)
                          : album.githubUrl
                            ? window.open(album.githubUrl, "_blank")
                            : undefined
                      }
                    >
                      {album.coverImage ? (
                        <img
                          src={album.coverImage}
                          alt={album.title[locale]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${album.coverGradient} flex items-center justify-center`}
                        >
                          <span className="text-[24px] text-white drop-shadow">
                            {album.coverIcon}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-[4px] flex-wrap">
                        <span
                          className="font-bold text-[11px] text-[#315B9E] cursor-pointer hover:underline"
                          onClick={() =>
                            album.photos.length > 0
                              ? setOpenAlbum(album)
                              : album.githubUrl
                                ? window.open(album.githubUrl, "_blank")
                                : undefined
                          }
                        >
                          {album.title[locale]}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#333] leading-[1.4] mt-[2px]">
                        {album.description[locale]}
                      </p>
                      {/* Stack badges */}
                      <div className="flex flex-wrap gap-[3px] mt-[4px]">
                        {album.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[8px] bg-[#E8F0FE] text-[#315B9E] px-[4px] py-[1px] rounded-[2px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {/* Actions */}
                      <div className="flex gap-[8px] mt-[4px]">
                        {album.photos.length > 0 && (
                          <button
                            onClick={() => setOpenAlbum(album)}
                            className="text-[9px] text-[#315B9E] hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            {album.photos.length} {t("albums.photos")}
                          </button>
                        )}
                        {album.githubUrl && (
                          <a
                            href={album.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-[#315B9E] hover:underline no-underline"
                          >
                            {t("albums.viewOnGithub")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Open album gallery */}
            {openAlbum && (
              <div>
                <button
                  onClick={() => setOpenAlbum(null)}
                  className="text-[10px] text-[#315B9E] hover:underline mb-[8px] bg-transparent border-none cursor-pointer p-0"
                >
                  &larr; {t("nav.projects")}
                </button>
                <h3 className="font-bold text-[12px] text-[#333] mb-[4px]">
                  {openAlbum.title[locale]}
                </h3>
                <p className="text-[10px] text-[#666] mb-[8px]">
                  {openAlbum.description[locale]}
                </p>
                {openAlbum.githubUrl && (
                  <a
                    href={openAlbum.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#315B9E] hover:underline mb-[8px] block no-underline"
                  >
                    {t("albums.viewOnGithub")}
                  </a>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-[6px]">
                  {openAlbum.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="cursor-pointer group"
                      onClick={() => setLightboxIndex(i)}
                    >
                      <div className="border border-[#C3D1E0] rounded-[3px] overflow-hidden">
                        <img
                          src={photo.src}
                          alt={photo.caption[locale]}
                          className="w-full h-[120px] object-cover group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                      <p className="text-[9px] text-[#666] mt-[2px] text-center truncate">
                        {photo.caption[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </OrkutCard>
        }
        right={<QuickStats />}
      />

      {/* Lightbox */}
      {lightboxIndex !== null && openAlbum && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-[16px] outline-none"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              setLightboxIndex(lightboxIndex! < openAlbum.photos.length - 1 ? lightboxIndex! + 1 : 0);
            } else if (e.key === "ArrowLeft") {
              setLightboxIndex(lightboxIndex! > 0 ? lightboxIndex! - 1 : openAlbum.photos.length - 1);
            } else if (e.key === "Escape") {
              setLightboxIndex(null);
            }
          }}
          tabIndex={0}
          ref={(el) => el?.focus()}
        >
          <div
            className="bg-white rounded-[5px] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-[8px]">
              <img
                src={openAlbum.photos[lightboxIndex].src}
                alt={openAlbum.photos[lightboxIndex].caption[locale]}
                className="max-h-[70vh] mx-auto rounded-[3px]"
              />
              <p className="text-[10px] text-[#666] mt-[6px] text-center">
                {openAlbum.photos[lightboxIndex].caption[locale]}
              </p>
              <div className="flex justify-between mt-[8px]">
                <button
                  onClick={() =>
                    setLightboxIndex(
                      lightboxIndex > 0
                        ? lightboxIndex - 1
                        : openAlbum.photos.length - 1
                    )
                  }
                  className="text-[10px] text-[#315B9E] hover:underline bg-transparent border-none cursor-pointer"
                >
                  {t("albums.previous")}
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="text-[10px] text-[#999] hover:underline bg-transparent border-none cursor-pointer"
                >
                  {t("albums.close")}
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex(
                      lightboxIndex < openAlbum.photos.length - 1
                        ? lightboxIndex + 1
                        : 0
                    )
                  }
                  className="text-[10px] text-[#315B9E] hover:underline bg-transparent border-none cursor-pointer"
                >
                  {t("albums.next")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
