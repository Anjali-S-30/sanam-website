"use client";

import React, { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCreative, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import type { SwiperProps } from "swiper/react";
import { motion } from "framer-motion";

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

const getSubscribeIndex = (isDesktop: boolean, totalSlides?: number) => {
  if (typeof totalSlides === "number" && totalSlides > 0) {
    return Math.max(totalSlides - 2, 0);
  }
  // Fallback to known layout: hero + (band or member slides) + subscribe + footer
  return isDesktop ? 2 : bandMembers.length + 1;
};

export default function Homepage() {
  const [isDesktop, setIsDesktop] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth >= 1024 : true),
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [pendingSubscribe, setPendingSubscribe] = useState(false);

  // Start at subscribe if hash/flag present
  const [initialSlide] = useState(() => {
    if (typeof window === "undefined") return 0;
    const shouldGoSubscribe =
      window.location.hash === "#subscribe" ||
      sessionStorage.getItem("goToSubscribe") === "true";

    if (!shouldGoSubscribe) return 0;

    try {
      sessionStorage.removeItem("goToSubscribe");
    } catch {
      /* ignore */
    }

    const desktopNow = window.innerWidth >= 1024;
    return getSubscribeIndex(desktopNow);
  });

  const { setNavbarStyle } = useNavbar();

  // --- RESIZE HANDLER ---
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- CHECK HASH/FLAG ON LOAD ---
  useEffect(() => {
    const shouldGoSubscribe =
      typeof window !== "undefined" &&
      (window.location.hash === "#subscribe" ||
        sessionStorage.getItem("goToSubscribe") === "true");
    if (shouldGoSubscribe) {
      setPendingSubscribe(true);
      try {
        sessionStorage.removeItem("goToSubscribe");
      } catch {
        /* ignore */
      }
    }
  }, []);

  // --- NAVBAR STYLE UPDATER ---
  useEffect(() => {
    const styles = isDesktop ? desktopSlideStyles : mobileSlideStyles;
    const currentStyle = styles[activeSlide] || styles[0];
    setNavbarStyle(currentStyle.navbar);
    
    // Cleanup on unmount
    return () => {
      setNavbarStyle({
        background: "bg-transparent",
        logo: "text-neutral-900",
        text: "text-neutral-800",
        hamburger: "text-black",
      });
    };
  }, [activeSlide, isDesktop, setNavbarStyle]);

  // --- INTERNAL NAV LISTENER ---
  useEffect(() => {
    const handleSubscribeScroll = () => {
      if (!swiperInstance) return;
      const totalSlides = swiperInstance.slides?.length;
      const subscribeIndex = getSubscribeIndex(isDesktop, totalSlides);
      swiperInstance.slideTo(subscribeIndex, isDesktop ? 900 : 0);
    };
    const handleHomeScroll = () => {
      if (swiperInstance) {
        swiperInstance.slideTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("triggerSubscribeScroll", handleSubscribeScroll);
    window.addEventListener("triggerHomeScroll", handleHomeScroll);

    return () => {
      window.removeEventListener("triggerSubscribeScroll", handleSubscribeScroll);
      window.removeEventListener("triggerHomeScroll", handleHomeScroll);
    };
  }, [swiperInstance, isDesktop]);

  // --- HASH CHANGE LISTENER (SPA NAV) ---
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#subscribe") {
        setPendingSubscribe(true);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // --- PROCESS PENDING SUBSCRIBE ---
  useEffect(() => {
    if (!pendingSubscribe || !swiperInstance) return;
    const subscribeIndex = getSubscribeIndex(isDesktop, swiperInstance.slides?.length);
    swiperInstance.slideTo(subscribeIndex, isDesktop ? 900 : 0);
    setPendingSubscribe(false);
  }, [pendingSubscribe, swiperInstance, isDesktop]);


  const swiperParameters: SwiperProps = {
    modules: [A11y, EffectCreative, Keyboard, Mousewheel, Pagination],
    direction: "vertical",
    speed: 800,
    grabCursor: true,
    preventClicks: false,
    preventClicksPropagation: false,
    effect: "creative",
    creativeEffect: {
      prev: { translate: [0, "0%", -1] },
      next: { translate: [0, "100%", 0] },
    },
    keyboard: { enabled: true },
    mousewheel: { enabled: true, forceToAxis: true },
    pagination: { clickable: true },
    watchSlidesProgress: true,
    initialSlide, // Starts at calculated index directly
    onSlideChange: (swiper) => setActiveSlide(swiper.realIndex),
    onSwiper: (swiper) => setSwiperInstance(swiper),
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

      {/* Subscribe section */}
      <SwiperSlide className="bg-white overflow-y-auto">
        <div id="subscribe" className="h-full w-full">
          {isDesktop ? (
            <motion.div
              key="subscribe-desktop"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "circOut" }}
              className="h-full w-full"
            >
              <SubscribeSection />
            </motion.div>
          ) : (
            <SubscribeSection />
          )}
        </div>
      </SwiperSlide>

      {/* Footer */}
      <SwiperSlide>
        <Footer />
      </SwiperSlide>
    </Swiper>
  );
}
