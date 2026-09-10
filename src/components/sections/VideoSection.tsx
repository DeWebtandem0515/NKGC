"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { siteSettings } from "@/content/settings";
import { homeImages } from "@/content/media";

/**
 * Privacyvriendelijke videocomponent: laadt pas een YouTube-embed
 * (youtube-nocookie.com) nadat de bezoeker zelf op play klikt. Tot die tijd
 * wordt er geen enkel verzoek naar YouTube gedaan. Bewust groot en centraal
 * opgezet — dit mag een visueel hoogtepunt van de homepage zijn, geen kleine
 * kaart naast een alinea tekst.
 */
export function VideoSection() {
  const t = useTranslations("home.video");
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-nkgc-blue-950 py-14 sm:py-20">
      <Container className="max-w-4xl text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70">
          {t("description")}
        </p>
      </Container>

      <Container className="mt-12 max-w-[1300px] sm:mt-16">
        <div className="relative aspect-video overflow-hidden shadow-premium">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${siteSettings.youtubeVideoId}?autoplay=1`}
              title={t("heading")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full"
              aria-label={t("play")}
            >
              <Image
                src={homeImages.videoThumbnail}
                alt="Klauwbehandeling in close-up — bekijk de introductievideo"
                fill
                sizes="(min-width: 1300px) 1300px, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-nkgc-blue-950/25 transition-colors group-hover:bg-nkgc-blue-950/35"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-nkgc-blue-900 transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
