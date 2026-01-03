"use client";

import React, { useRef, useEffect } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./MySwiper.css"; 

import TourBanner from "@/components/Tour/TourBanner";
import TourList from "@/components/Tour/TourList";
import Footer from "@/components/Footer";

export default function VerticalSwiper() {
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0); 

  const swiperParams = {
    direction: "vertical" as const,
    modules: [Mousewheel, Keyboard, Pagination],
    slidesPerView: 1,
    speed: 800,
    preventClicks: false,
    preventClicksPropagation: false,
    touchStartPreventDefault: false,
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
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swiperRef.current) return;
      const swiper = swiperRef.current;

      // Only run this logic if we are on the Tour List slide (Index 1)
      if (swiper.activeIndex !== 1) return;

      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY.current;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atTop = scrollTop <= 1; 
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2; 

      if (atTop && diff > 0) {
        // At Top + Pulling Down -> Go to Banner
        swiper.allowTouchMove = true;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = false; 
      } 
      else if (atBottom && diff < 0) {
        // At Bottom + Pulling Up -> Go to Footer
        swiper.allowTouchMove = true;
        swiper.allowSlidePrev = false; 
        swiper.allowSlideNext = true;
      } 
      else {
        // Middle of list -> Native Scroll only
        swiper.allowTouchMove = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
       if (!swiperRef.current) return;
       const swiper = swiperRef.current;
       if (swiper.activeIndex !== 1) return;

       const { scrollTop, scrollHeight, clientHeight } = container;
       const atTop = scrollTop <= 0;
       const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

       if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
           swiper.allowTouchMove = true;
           if(swiper.mousewheel) swiper.mousewheel.enable();
       } else {
           swiper.allowTouchMove = false;
           if(swiper.mousewheel) swiper.mousewheel.disable();
       }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false }); 
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black">
      <Swiper 
        {...swiperParams} 
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        // --- THE FIX IS HERE ---
        // Whenever the slide changes (e.g. landing on Footer), reset all locks.
        onSlideChange={(swiper) => {
            swiper.allowTouchMove = true;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            if(swiper.mousewheel) swiper.mousewheel.enable();
        }}
        className="vertical-swiper h-full w-full"
      >
        <SwiperSlide className="h-full w-full bg-black">
          <TourBanner />
        </SwiperSlide>

        <SwiperSlide className="h-full w-full bg-black">
          <div 
            ref={scrollContainerRef}
            className="h-full w-full overflow-y-auto custom-scrollbar relative overscroll-y-contain touch-pan-y"
          >
            <TourList />
          </div>
        </SwiperSlide>

        <SwiperSlide className="h-full w-full bg-neutral-900">
          <div className="h-full w-full flex items-center justify-center">
            <Footer />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
