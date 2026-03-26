"use client";

import { useI18n } from "@/i18n";

interface LightboxPhoto {
  src: string;
  caption: { "pt-BR": string; en: string };
}

interface LightboxProps {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}

export function Lightbox({ photos, index, onClose, onNav }: LightboxProps) {
  const { t, locale } = useI18n();
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-[16px] outline-none"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onNav(index < photos.length - 1 ? index + 1 : 0);
        else if (e.key === "ArrowLeft") onNav(index > 0 ? index - 1 : photos.length - 1);
        else if (e.key === "Escape") onClose();
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
            src={photo.src}
            alt={photo.caption[locale]}
            className="max-h-[70vh] mx-auto rounded-[3px]"
          />
          <p className="text-[10px] text-[#666] mt-[6px] text-center">
            {photo.caption[locale]}
          </p>
          <div className="flex justify-between mt-[8px]">
            <button
              onClick={() => onNav(index > 0 ? index - 1 : photos.length - 1)}
              className="text-[10px] text-[#315B9E] hover:underline bg-transparent border-none cursor-pointer"
            >
              {t("albums.previous")}
            </button>
            <button
              onClick={onClose}
              className="text-[10px] text-[#999] hover:underline bg-transparent border-none cursor-pointer"
            >
              {t("albums.close")}
            </button>
            <button
              onClick={() => onNav(index < photos.length - 1 ? index + 1 : 0)}
              className="text-[10px] text-[#315B9E] hover:underline bg-transparent border-none cursor-pointer"
            >
              {t("albums.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
