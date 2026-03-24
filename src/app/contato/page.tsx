"use client";

import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { OrkutButton } from "@/components/ui/OrkutButton";
import { scraps, type Scrap } from "@/data/scraps";
import { useState, useRef, type ReactNode } from "react";

const PENDING_SCRAPS_KEY = "orkut-pending-scraps";
const PENDING_TTL_MS = 60 * 60 * 1000; // 1 hour

interface PendingScrap extends Scrap {
  savedAt: number;
}

function getPendingScraps(): PendingScrap[] {
  if (typeof window === "undefined") return [];
  try {
    const raw: PendingScrap[] = JSON.parse(localStorage.getItem(PENDING_SCRAPS_KEY) || "[]");
    const now = Date.now();
    return raw.filter((s) => now - (s.savedAt ?? 0) < PENDING_TTL_MS);
  } catch {
    return [];
  }
}

function savePendingScrap(scrap: Scrap) {
  const pending = getPendingScraps();
  pending.push({ ...scrap, savedAt: Date.now() });
  localStorage.setItem(PENDING_SCRAPS_KEY, JSON.stringify(pending));
}

function cleanupPendingScraps(staticIds: Set<string>) {
  const pending = getPendingScraps().filter((s) => !staticIds.has(s.id));
  if (pending.length > 0) {
    localStorage.setItem(PENDING_SCRAPS_KEY, JSON.stringify(pending));
  } else {
    localStorage.removeItem(PENDING_SCRAPS_KEY);
  }
}

// --- Emoticon config ---
const EMOTICON_MAP: Record<string, string> = {
  ":wink:": "/images/emoticons/msn-wink.gif",
  ":crying:": "/images/emoticons/msn-crying.gif",
  ":eyeroll:": "/images/emoticons/msn-eyeroll.gif",
  ":idk:": "/images/emoticons/msn-idk.gif",
  ":party:": "/images/emoticons/msn-party.gif",
  ":sleepy:": "/images/emoticons/msn-sleepy.gif",
  ":thinking:": "/images/emoticons/msn-thinking.gif",
  ":smile:": "/images/emoticons/msn-smile.png",
  ":laugh:": "/images/emoticons/msn-laugh.png",
  ":cool:": "/images/emoticons/msn-cool.png",
  ":devil:": "/images/emoticons/msn-devil.png",
  ":heart:": "/images/emoticons/msn-heart.png",
  ":nerd:": "/images/emoticons/msn-nerd.png",
  ":tongue:": "/images/emoticons/msn-tongue.png",
  ":angry:": "/images/emoticons/msn-angry.png",
  ":thumbsup:": "/images/emoticons/msn-thumbsup.png",
  ":blush:": "/images/emoticons/msn-blush.png",
  ":sad:": "/images/emoticons/msn-sad.png",
  ":surprised:": "/images/emoticons/msn-surprised.png",
  ":coffee:": "/images/emoticons/msn-coffee.png",
  ":star:": "/images/emoticons/msn-star.png",
};

const EMOTICON_CODES = Object.keys(EMOTICON_MAP);

function renderEmoticons(text: string): ReactNode[] {
  const pattern = /(:[a-z]+:)/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const src = EMOTICON_MAP[part];
    if (src) {
      return (
        <img
          key={i}
          src={src}
          alt={part}
          className="inline-block w-[18px] h-[18px] align-middle mx-[1px]"
        />
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ContatoPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [pendingScraps, setPendingScraps] = useState<Scrap[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load pending scraps from localStorage after hydration
  if (!hydrated && typeof window !== "undefined") {
    const staticIds = new Set(scraps.map((s) => s.id));
    cleanupPendingScraps(staticIds);
    setPendingScraps(getPendingScraps());
    setHydrated(true);
  }

  const allScraps = [...scraps, ...pendingScraps.filter((s) => !scraps.some((e) => e.id === s.id))];

  const insertEmoticon = (code: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newValue = message.slice(0, start) + code + message.slice(end);
    setMessage(newValue);
    // restore cursor after React re-render
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + code.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  const handleSend = async () => {
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/submit-scrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        const data = await res.json() as { scrap: Scrap };
        savePendingScrap(data.scrap);
        setPendingScraps((prev) => [...prev, data.scrap]);
        setStatus("sent");
        setName("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 4500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const showPreview = name.trim() || message.trim();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        left={<ProfileCard />}
        center={
          <>
            {/* Scraps listing */}
            <OrkutCard title={`${t("contact.title")} (${allScraps.length})`}>
              {allScraps.length === 0 ? (
                <p className="text-[11px] text-[#999] p-[8px]">
                  {t("contact.noScraps")}
                </p>
              ) : (
                <div className="divide-y divide-[#E8E8E8]">
                  {allScraps.map((scrap, i) => (
                    <div
                      key={scrap.id}
                      className={`flex gap-[8px] p-[8px] ${
                        i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"
                      }`}
                    >
                      {/* Generic avatar */}
                      <div className="w-[50px] h-[50px] rounded-[3px] bg-gradient-to-br from-[#E8F0FE] to-[#C5D7F1] flex items-center justify-center shrink-0 border border-[#C3D1E0]">
                        <span className="text-[20px]">👤</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[4px] mb-[2px]">
                          <span className="font-bold text-[11px] text-[#315B9E]">
                            {scrap.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#333] leading-[1.5]">
                          {renderEmoticons(scrap.message)}
                        </p>
                        <span className="text-[9px] text-[#999] mt-[2px] block">
                          {scrap.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </OrkutCard>

            {/* Leave a scrap */}
            <OrkutCard title={t("contact.leaveScrap")}>
              {status === "sent" ? (
                <div className="p-[8px] text-center">
                  <img
                    src="/images/gifs/obrigado-scrap.gif"
                    alt="Seu scrap deixou meu dia mais feliz! Obrigado(a)!"
                    className="mx-auto max-w-full h-auto"
                  />
                </div>
              ) : (
                <div className="p-[8px] space-y-[6px]">
                  {/* Name input */}
                  <input
                    type="text"
                    className="w-full border border-[#BDC7D8] rounded-[3px] p-[6px] text-[11px] focus:outline-none focus:border-[#315B9E] bg-white"
                    placeholder={t("contact.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                  />

                  {/* Message textarea */}
                  <textarea
                    ref={textareaRef}
                    className="w-full border border-[#BDC7D8] rounded-[3px] p-[6px] text-[11px] resize-none focus:outline-none focus:border-[#315B9E] bg-white"
                    rows={3}
                    placeholder={t("contact.placeholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                  />

                  {/* Emoticon picker */}
                  <div className="flex flex-wrap gap-[4px] p-[4px] bg-[#F4F7FC] rounded-[3px] border border-[#E8E8E8]">
                    {EMOTICON_CODES.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => insertEmoticon(code)}
                        className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[#D1E1F5] rounded-[2px] cursor-pointer"
                        title={code}
                      >
                        <img
                          src={EMOTICON_MAP[code]}
                          alt={code}
                          className="w-[18px] h-[18px]"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Live preview */}
                  {showPreview && (
                    <div className="border border-[#E8E8E8] rounded-[3px] bg-[#F4F7FC]">
                      <div className="text-[9px] text-[#999] px-[8px] pt-[4px] uppercase font-bold">
                        {t("contact.preview")}
                      </div>
                      <div className="flex gap-[8px] p-[8px]">
                        <div className="w-[50px] h-[50px] rounded-[3px] bg-gradient-to-br from-[#E8F0FE] to-[#C5D7F1] flex items-center justify-center shrink-0 border border-[#C3D1E0]">
                          <span className="text-[20px]">👤</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-[11px] text-[#315B9E]">
                            {name || "???"}
                          </span>
                          <p className="text-[11px] text-[#333] leading-[1.5] mt-[2px]">
                            {renderEmoticons(message || "...")}
                          </p>
                          <span className="text-[9px] text-[#999] mt-[2px] block">
                            {today}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Send button */}
                  <div className="flex items-center gap-[8px]">
                    <OrkutButton
                      onClick={handleSend}
                      disabled={status === "sending" || !name.trim() || !message.trim()}
                    >
                      {status === "sending" ? t("contact.sending") : t("contact.send")}
                    </OrkutButton>
                    {status === "error" && (
                      <span className="text-[10px] text-red-600 font-bold">
                        {t("contact.errorSending")}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </OrkutCard>

            {/* Or reach me at */}
            <OrkutCard title={t("contact.orReachMe")}>
              <div className="space-y-[6px]">
                <a
                  href="mailto:lucas.claros11@gmail.com"
                  className="flex items-center gap-[6px] text-[11px] text-[#315B9E] hover:underline p-[4px] bg-[#F4F7FC] rounded-[3px]"
                >
                  <span className="w-[20px] text-center text-[14px] shrink-0">@</span>
                  lucas.claros11@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/lucas-claros-875945198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[6px] text-[11px] text-[#315B9E] hover:underline p-[4px] bg-white rounded-[3px]"
                >
                  <span className="w-[20px] text-center text-[14px] font-bold shrink-0">in</span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/lucasclaros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[6px] text-[11px] text-[#315B9E] hover:underline p-[4px] bg-[#F4F7FC] rounded-[3px]"
                >
                  <span className="w-[20px] text-center text-[14px] shrink-0">{"</>"}</span>
                  GitHub
                </a>
              </div>
            </OrkutCard>
          </>
        }
        right={<QuickStats />}
      />
    </>
  );
}
