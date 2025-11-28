// src/components/HeroCarousel/HeroCarousel.tsx

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectCreative,
  Pagination,
  Parallax,
} from "swiper/modules";
import EffectShutters from "./effect-shutters.js";

import type { SwiperProps } from "swiper/react";

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
      delay: 1200,
      disableOnInteraction: false,
    },
    parallax: true,
    watchSlidesProgress: true,
    slidesPerGroupAuto: false,
  };
  return (
    <>
      <Swiper {...swiperParameters} className="will-change-transform">
        <SwiperSlide className="swiper-slide-4ffe">
          <a
            href="https://www.instagram.com/sanamband?igsh=YnNleXFmaTk5aXFl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full block" // Important for making the link fill the slide
          >
            <img
              src="/HeroCarousel/hero1.png"
              alt="hero image 1"
              className="slide-cover-image"
            />
          </a>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide-4ffe">
          <img
            src="/HeroCarousel/hero2.jpg"
            alt="hero image 2"
            className="slide-cover-image"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide-4ffe">
          <img
            src="/HeroCarousel/hero3.jpg"
            alt="hero image 3"
            className="slide-cover-image"
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide-4ffe">
          <img
            src="/HeroCarousel/hero4.jpg"
            alt="hero image 4"
            className="slide-cover-image"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
