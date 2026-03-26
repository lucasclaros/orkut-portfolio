"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { OrkutNavbar } from "@/components/layout/OrkutNavbar";
import { ThreeColumnLayout } from "@/components/layout/ThreeColumnLayout";
import { ProfileCard } from "@/components/sidebar/ProfileCard";
import { QuickStats } from "@/components/sidebar/QuickStats";
import { OrkutCard } from "@/components/ui/OrkutCard";
import { Lightbox } from "@/components/ui/Lightbox";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { projects } from "@/data/projects";

function AppsContent() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectedId = searchParams.get("id");
  const openProject = selectedId ? (projects.find((p) => p.id === selectedId) ?? null) : null;

  const handleOpen = (id: string) => {
    setLightboxIndex(null);
    router.push(`/apps?id=${id}`);
  };

  const handleClose = () => {
    setLightboxIndex(null);
    router.push("/apps");
  };

  return (
    <>
      <OrkutNavbar />
      <ThreeColumnLayout
        hideRightOnMobile
        left={<ProfileCard />}
        center={
          <>
          <Breadcrumb items={[
            { label: "início", href: "/perfil" },
            openProject
              ? { label: t("apps.title"), href: "/apps" }
              : { label: t("apps.title") },
            ...(openProject ? [{ label: openProject.title[locale] }] : []),
          ]} />
          <OrkutCard title={`${t("apps.title")} (${projects.length})`}>

            {/* App selected: iframe or gallery */}
            {openProject && (
              <div>
                <button
                  onClick={handleClose}
                  className="text-[10px] text-[#315B9E] hover:underline mb-[8px] bg-transparent border-none cursor-pointer p-0"
                >
                  &larr; {t("apps.title")}
                </button>

                {/* Iframe if appUrl exists */}
                {openProject.appUrl ? (
                  <div>
                    <h3 className="font-bold text-[12px] text-[#333] mb-[4px]">
                      {openProject.title[locale]}
                    </h3>
                    <iframe
                      src={openProject.appUrl}
                      className="w-full border border-[#C3D1E0] rounded-[3px]"
                      style={{ height: "600px" }}
                      title={openProject.title[locale]}
                    />
                  </div>
                ) : (
                  /* Gallery view */
                  <div>
                    <h3 className="font-bold text-[12px] text-[#333] mb-[2px]">
                      {openProject.title[locale]}
                    </h3>
                    <p className="text-[10px] text-[#666] mb-[8px]">
                      {openProject.description[locale]}
                    </p>
                    {openProject.githubUrl && (
                      <a
                        href={openProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#315B9E] hover:underline mb-[8px] block no-underline"
                      >
                        {t("albums.viewOnGithub")}
                      </a>
                    )}
                    {openProject.photos.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[6px]">
                        {openProject.photos.map((photo, i) => (
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
                    ) : (
                      <p className="text-[11px] text-[#999]">
                        {openProject.githubUrl ? "" : "—"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Apps list (default, no project selected) */}
            {!openProject && (
              <div className="divide-y divide-[#E8E8E8]">
                {projects.map((project, i) => (
                  <div
                    key={project.id}
                    className={`flex gap-[8px] p-[8px] ${i % 2 === 0 ? "bg-[#F4F7FC]" : "bg-white"}`}
                  >
                    {/* App icon */}
                    <div
                      className="w-[54px] h-[54px] rounded-[8px] shrink-0 border border-[#D8DFEA] overflow-hidden cursor-pointer shadow-sm"
                      onClick={() => handleOpen(project.id)}
                    >
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.title[locale]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${project.coverGradient} flex items-center justify-center`}
                        >
                          <span className="text-[22px] text-white drop-shadow">
                            {project.coverIcon}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-[6px] flex-wrap">
                        <span
                          className="font-bold text-[11px] text-[#315B9E] cursor-pointer hover:underline"
                          onClick={() => handleOpen(project.id)}
                        >
                          {project.title[locale]}
                        </span>
                        <span className="text-[8px] text-[#4CAF50] border border-[#4CAF50] rounded-[2px] px-[3px] leading-[14px]">
                          ✓ {t("apps.installed")}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#333] leading-[1.4] mt-[2px]">
                        {project.description[locale]}
                      </p>
                      <div className="flex flex-wrap gap-[3px] mt-[4px]">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[8px] bg-[#E8F0FE] text-[#315B9E] px-[4px] py-[1px] rounded-[2px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-[8px] mt-[4px]">
                        {project.photos.length > 0 && (
                          <button
                            onClick={() => handleOpen(project.id)}
                            className="text-[9px] text-[#315B9E] hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            {project.photos.length} {t("apps.screenshots")}
                          </button>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-[#315B9E] hover:underline no-underline"
                          >
                            {t("albums.viewOnGithub")}
                          </a>
                        )}
                        {project.appUrl && (
                          <button
                            onClick={() => handleOpen(project.id)}
                            className="text-[9px] text-white bg-[#6D84B4] hover:bg-[#5A7199] rounded-[2px] px-[5px] py-[1px] border-none cursor-pointer"
                          >
                            ▶ abrir app
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </OrkutCard>
          </>
        }
        right={<QuickStats />}
      />

      {lightboxIndex !== null && openProject && (
        <Lightbox
          photos={openProject.photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}

export default function AppsPage() {
  return (
    <Suspense>
      <AppsContent />
    </Suspense>
  );
}
