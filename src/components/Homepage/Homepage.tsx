"use client";

import React, { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper"; // Import Type
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCreative, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import type { SwiperProps } from "swiper/react";

import HeroCarousel from "../HeroCarousel/HeroCarousel";
import DesktopBandSection from "../DesktopBandSection";
import SubscribeSection from "../SubscribeSection";
import Footer from "../Footer";
import InteractiveMobileSlide from "../InteractiveMobileSlide";
import { bandMembers } from "../data/bandMembers";

import { desktopSlideStyles, mobileSlideStyles } from "../config/slide-styles";
import { useNavbar } from "@/context/NavbarContext";

import "swiper/css";
import "swiper/css/pagination";
import "./Homepage.css";

export default function Homepage() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null); // 1. Store Swiper Instance
  const { setNavbarStyle } = useNavbar();

  // --- RESIZE HANDLER ---
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- NAVBAR STYLE UPDATER ---
  useEffect(() => {
    const styles = isDesktop ? desktopSlideStyles : mobileSlideStyles;
    const currentStyle = styles[activeSlide] || styles[0];
    setNavbarStyle(currentStyle.navbar);
  }, [activeSlide, isDesktop, setNavbarStyle]);

  // --- 2. LISTEN FOR SUBSCRIBE EVENT ---
  useEffect(() => {
    const handleSubscribeScroll = () => {
      if (!swiperInstance) return;

      // CALCULATE THE SUBSCRIBE SLIDE INDEX
      // Desktop: 0(Hero) -> 1(Band) -> 2(Insta) -> 3(Subscribe)
      // Mobile: 0(Hero) -> 1..N(Band) -> N+1(Insta) -> N+2(Subscribe)
      let subscribeIndex = 3; 

      if (!isDesktop) {
        subscribeIndex = 1 + bandMembers.length + 1; 
      }

      // Smoothly slide to the calculated index
      swiperInstance.slideTo(subscribeIndex);
    };

    // Listen for the custom event dispatched by Navbar
    window.addEventListener("triggerSubscribeScroll", handleSubscribeScroll);

    return () => {
      window.removeEventListener("triggerSubscribeScroll", handleSubscribeScroll);
    };
  }, [swiperInstance, isDesktop]);

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
    onSlideChange: (swiper) => setActiveSlide(swiper.realIndex),
    onSwiper: (swiper) => setSwiperInstance(swiper), // 3. Capture Instance
  };

  return (
    <Swiper {...swiperParameters} className="h-screen w-screen">
      {/* Hero section (Index 0) */}
      <SwiperSlide>
        <HeroCarousel />
      </SwiperSlide>

      {/* Band Members (Index 1 on Desktop / 1..N on Mobile) */}
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
        {/* ADD ID FOR FALLBACK, BUT SWIPER WILL HANDLE NAV */}
        <div id="subscribe" className="h-full w-full">
           <SubscribeSection />
        </div>
      </SwiperSlide>

      {/* Footer */}
      <SwiperSlide>
        <Footer />
      </SwiperSlide>
    </Swiper>
  );
}