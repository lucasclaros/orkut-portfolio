"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { albums, type Album } from "@/data/albums";

export default function AlbunsPage() {
  const { t, locale } = useI18n();
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <OrkutCard title={`${t("albums.title")} (${albums.length})`}>
            {/* Album grid */}
            {!openAlbum && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-[8px]">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="border border-[#C3D1E0] rounded-[3px] overflow-hidden hover:shadow-md cursor-pointer bg-white group"
                    onClick={() =>
                      album.photos.length > 0
                        ? setOpenAlbum(album)
                        : album.githubUrl
                          ? window.open(album.githubUrl, "_blank")
                          : undefined
                    }
                  >
                    {/* Cover */}
                    <div className="w-full h-[90px] overflow-hidden">
                      {album.coverImage ? (
                        <img
                          src={album.coverImage}
                          alt={album.title[locale]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${album.coverGradient} flex items-center justify-center group-hover:opacity-90 transition-opacity`}
                        >
                          <span className="text-[36px] text-white drop-shadow">
                            {album.coverIcon}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-[6px] border-t border-[#E8E8E8]">
                      <h4 className="font-bold text-[10px] text-[#315B9E] truncate">
                        {album.title[locale]}
                      </h4>
                      <p className="text-[9px] text-[#666] mt-[2px] leading-[1.3] line-clamp-2">
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
                      <div className="flex items-center justify-between mt-[4px]">
                        <span className="text-[9px] text-[#999]">
                          {album.photos.length > 0
                            ? `${album.photos.length} ${t("albums.photos")}`
                            : album.githubUrl
                              ? "GitHub →"
                              : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Open album view */}
            {openAlbum && (
              <div>
                <button
                  onClick={() => setOpenAlbum(null)}
                  className="text-[10px] text-[#315B9E] hover:underline mb-[8px]"
                >
                  ← {t("albums.title")}
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
                    className="text-[10px] text-[#315B9E] hover:underline mb-[8px] block"
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
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-[16px]"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="bg-white rounded-[5px] max-w-[600px] w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-[8px]">
              <img
                src={openAlbum.photos[lightboxIndex].src}
                alt={openAlbum.photos[lightboxIndex].caption[locale]}
                className="w-full rounded-[3px]"
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
                  className="text-[10px] text-[#315B9E] hover:underline"
                >
                  {t("albums.previous")}
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="text-[10px] text-[#999] hover:underline"
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
                  className="text-[10px] text-[#315B9E] hover:underline"
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
