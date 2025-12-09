"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper"; // Import Type
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./MySwiper.css"; 

import TourBanner from "@/components/Tour/TourBanner";
import TourList from "@/components/Tour/TourList";
import Footer from "@/components/Footer";

export default function VerticalSwiper() {
  // 1. Create refs for the Swiper instance and the scrollable container
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const swiperParams = {
    direction: "vertical" as const,
    modules: [Mousewheel, Keyboard, Pagination],
    slidesPerView: 1,
    speed: 800,
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true,
    },
    keyboard: { enabled: true },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    // REMOVED "noSwipingClass" to allow touch logic to work
  };

  // 2. Logic to Handle Scroll Trapping
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!swiperRef.current) return;

      const atTop = container.scrollTop === 0;
      // Allow a small buffer (1px) for calculation errors
      const atBottom = Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) <= 1;

      if (atTop || atBottom) {
        // If at edges, allow the Main Swiper to move
        swiperRef.current.allowTouchMove = true;
      } else {
        // If in the middle of the list, LOCK the Main Swiper
        swiperRef.current.allowTouchMove = false;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen w-full bg-black">
      <Swiper 
        {...swiperParams} 
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Capture Swiper instance
        className="vertical-swiper h-full w-full"
      >
        
        {/* --- SLIDE 1: BANNER --- */}
        <SwiperSlide className="h-full w-full bg-black">
          <TourBanner />
        </SwiperSlide>

        {/* --- SLIDE 2: TOUR LIST --- */}
        <SwiperSlide className="h-full w-full bg-black">
          {/* REMOVED 'swiper-no-swiping'. 
             ADDED ref={scrollContainerRef} to track scrolling.
          */}
          <div 
            ref={scrollContainerRef}
            className="h-full w-full overflow-y-auto custom-scrollbar relative"
          >
            <TourList />
          </div>
        </SwiperSlide>

        {/* --- SLIDE 3: FOOTER --- */}
        <SwiperSlide className="h-full w-full bg-neutral-900">
          <div className="h-full w-full flex items-center justify-center">
            <Footer />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}