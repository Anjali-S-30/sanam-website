"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCreative, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import type { SwiperProps } from "swiper/react";

import HeroCarousel from "../HeroCarousel/HeroCarousel";
import DesktopBandSection from "../DesktopBandSection";
import SubscribeSection from "../SubscribeSection";
import Footer from "../Footer";
import InteractiveMobileSlide from "../InteractiveMobileSlide";
import { bandMembers } from "../data/bandMembers";

// --- 1. IMPORT THE STYLES AND THE CONTEXT HOOK ---
import { desktopSlideStyles, mobileSlideStyles } from "../config/slide-styles";
import { useNavbar } from "@/context/NavbarContext";

import "swiper/css";
import "swiper/css/pagination";
import "./Homepage.css";

export default function Homepage() {
  const [isDesktop, setIsDesktop] = useState(true);
  // --- 2. ADD LOGIC TO TRACK SLIDES AND UPDATE THE NAVBAR ---
  const [activeSlide, setActiveSlide] = useState(0);
  const { setNavbarStyle } = useNavbar();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This effect runs whenever the slide or screen size changes
  useEffect(() => {
    const styles = isDesktop ? desktopSlideStyles : mobileSlideStyles;
    const currentStyle = styles[activeSlide] || styles[0];
    setNavbarStyle(currentStyle.navbar);
  }, [activeSlide, isDesktop, setNavbarStyle]);


  const swiperParameters: SwiperProps = {
    modules: [A11y, EffectCreative, Keyboard, Mousewheel, Pagination],
    direction: "vertical",
    speed: 800,
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: { translate: [0, "0%", -1] },
      next: { translate: [0, "100%", 0] },
    },
    keyboard: { enabled: true },
    mousewheel: { enabled: true, forceToAxis: true },
    pagination: { clickable: true },
    watchSlidesProgress: true,
    // --- 3. ADD THE onSlideChange HANDLER TO THE SLIDER ---
    onSlideChange: (swiper) => {
      setActiveSlide(swiper.realIndex);
    },
  };

  return (
    <Swiper {...swiperParameters} className="h-screen w-screen">
      {/* Hero section */}
      <SwiperSlide>
        <HeroCarousel />
      </SwiperSlide>

      {/* Band Members */}
      {isDesktop ? (
        <SwiperSlide className="bg-white overflow-y-auto pt-24">
          <DesktopBandSection />
        </SwiperSlide>
      ) : (
        bandMembers.map((member) => (
          <SwiperSlide key={member.id}>
            <InteractiveMobileSlide member={member} />
          </SwiperSlide>
        ))
      )}

      {/* Instagram feed placeholder */}
      <SwiperSlide className="bg-gray-200 flex items-center justify-center">
        <h2 className="text-4xl font-bold">THIS SLIDE IS FOR INSTAGRAM FEED</h2>
      </SwiperSlide>

      {/* Subscribe section */}
      <SwiperSlide className="bg-white overflow-y-auto">
        <SubscribeSection />
      </SwiperSlide>

      {/* Footer */}
      <SwiperSlide>
        <Footer />
      </SwiperSlide>
    </Swiper>
  );
}