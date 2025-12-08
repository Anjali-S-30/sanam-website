"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./MySwiper.css"; // Ensure this file exists for custom scrollbar/pagination styles

import TourBanner from "@/components/Tour/TourBanner";
import TourList from "@/components/Tour/TourList";
import Footer from "@/components/Footer";

export default function VerticalSwiper() {
  const swiperParams = {
    direction: "vertical" as const,
    modules: [Mousewheel, Keyboard, Pagination],
    slidesPerView: 1,
    speed: 800,
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true, // Allows internal scrolling of TourList before switching slides
    },
    keyboard: { enabled: true },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    noSwipingClass: "swiper-no-swiping",
  };

  return (
    <div className="h-screen w-full bg-black">
      <Swiper {...swiperParams} className="vertical-swiper h-full w-full">
        
        {/* --- SLIDE 1: BANNER --- */}
        <SwiperSlide className="h-full w-full bg-black">
          {/* Ensure TourBanner has h-full w-full in its root element */}
          <TourBanner />
        </SwiperSlide>

        {/* --- SLIDE 2: TOUR LIST --- */}
        <SwiperSlide className="h-full w-full bg-black">
          {/* Wrapper for internal scrolling */}
          <div className="h-full w-full overflow-y-auto swiper-no-swiping custom-scrollbar relative">
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