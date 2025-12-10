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
  const touchStartY = useRef(0); // To track finger direction

  const swiperParams = {
    direction: "vertical" as const,
    modules: [Mousewheel, Keyboard, Pagination],
    slidesPerView: 1,
    speed: 800,
    // CRITICAL: Let browser handle the initial touch for native scrolling
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

    // 1. Record where the finger landed
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      // Default to "Locked" (Native Scroll) to be safe
      if (swiperRef.current) {
        swiperRef.current.allowTouchMove = false;
      }
    };

    // 2. Determine intent when the finger moves
    const handleTouchMove = (e: TouchEvent) => {
      if (!swiperRef.current) return;
      const swiper = swiperRef.current;

      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY.current; // Positive = Pulling Down, Negative = Pulling Up
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atTop = scrollTop <= 1; // 1px buffer
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2; // 2px buffer

      // LOGIC: Only unlock Swiper if we are at an edge AND pulling away from the content
      
      if (atTop && diff > 0) {
        // At Top + Pulling Down -> Go to Banner
        swiper.allowTouchMove = true;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = false; // Block Footer
      } 
      else if (atBottom && diff < 0) {
        // At Bottom + Pulling Up -> Go to Footer
        swiper.allowTouchMove = true;
        swiper.allowSlidePrev = false; // Block Banner
        swiper.allowSlideNext = true;
      } 
      else {
        // All other cases: Scrolling through the list
        // Disable Swiper so the browser scrolls the text naturally
        swiper.allowTouchMove = false;
      }
    };

    // 3. Handle MouseWheel (Desktop/Laptop Trackpads)
    const handleWheel = (e: WheelEvent) => {
       if (!swiperRef.current) return;
       const swiper = swiperRef.current;
       const { scrollTop, scrollHeight, clientHeight } = container;
       const atTop = scrollTop <= 0;
       const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

       // If scrolling UP at the Top OR scrolling DOWN at the Bottom -> Enable Swiper
       if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
           swiper.allowTouchMove = true;
           if(swiper.mousewheel) swiper.mousewheel.enable();
       } else {
           // Otherwise, lock it for native scroll
           swiper.allowTouchMove = false;
           if(swiper.mousewheel) swiper.mousewheel.disable();
       }
    };

    // Attach Listeners
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    // 'passive: false' allows us to intervene if necessary, though we mostly use logic locks
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
        className="vertical-swiper h-full w-full"
      >
        {/* SLIDE 1: BANNER */}
        <SwiperSlide className="h-full w-full bg-black">
          <TourBanner />
        </SwiperSlide>

        {/* SLIDE 2: TOUR LIST */}
        <SwiperSlide className="h-full w-full bg-black">
          <div 
            ref={scrollContainerRef}
            // 'overscroll-y-contain' prevents the whole page from bouncing, keeping the scroll inside
            className="h-full w-full overflow-y-auto custom-scrollbar relative overscroll-y-contain touch-pan-y"
          >
            <TourList />
          </div>
        </SwiperSlide>

        {/* SLIDE 3: FOOTER */}
        <SwiperSlide className="h-full w-full bg-neutral-900">
          <div className="h-full w-full flex items-center justify-center">
            <Footer />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}