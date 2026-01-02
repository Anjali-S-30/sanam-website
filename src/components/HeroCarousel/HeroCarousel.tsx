// src/components/HeroCarousel/HeroCarousel.tsx

"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCreative, Pagination, Parallax } from "swiper/modules";
import EffectShutters from "./effect-shutters.js";

import type { SwiperProps } from "swiper/react";
import { heroSlides } from "../data/heroSlides";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "./shutters-effect.css";
import "./HeroCarousel.css";

export default function HeroCarousel() {
  const swiperParameters: SwiperProps = {
    nested: true,
    modules: [
      A11y,
      Autoplay,
      EffectCreative,
      Pagination,
      Parallax,
      EffectShutters,
    ],
    grabCursor: true,
    loop: true,
    effect: "shutters",
    creativeEffect: {
      limitProgress: 5,
      prev: { shadow: true },
      next: { shadow: true },
    },
    speed: 2400,
    pagination: { clickable: true },
    autoplay: {
      delay: 3200,
      disableOnInteraction: false,
    },
    parallax: true,
    watchSlidesProgress: true,
    slidesPerGroupAuto: false,
  };
  return (
    <>
      <Swiper {...swiperParameters} className="will-change-transform">
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.src} className="swiper-slide-4ffe">
            {slide.external ? (
              <a
                href={slide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-full w-full overflow-hidden"
              >
                <picture>
                  {slide.mobileSrc && (
                    <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
                  )}
                  <img src={slide.src} alt={slide.alt} className="slide-cover-image" />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                <div className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-white/80 via-white/70 to-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/85 shadow-xl shadow-black/30 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/70 shadow-[0_0_0_4px_rgba(255,255,255,0.6)]" />
                  <span>{slide.label}</span>
                  <span className="text-sm leading-none">↗</span>
                </div>
              </a>
            ) : (
              <Link href={slide.href} className="relative block h-full w-full overflow-hidden">
                <picture>
                  {slide.mobileSrc && (
                    <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
                  )}
                  <img src={slide.src} alt={slide.alt} className="slide-cover-image" />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                <div className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-white/80 via-white/70 to-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/85 shadow-xl shadow-black/30 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/70 shadow-[0_0_0_4px_rgba(255,255,255,0.6)]" />
                  <span>{slide.label}</span>
                  <span className="text-sm leading-none">↗</span>
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
