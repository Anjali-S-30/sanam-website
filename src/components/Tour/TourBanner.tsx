"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { tourBannerEvents } from "@/components/data/tourData";

export default function TourBanner() {
  // Removed useState/useEffect for isMobile to prevent hydration mismatch/flash.
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        direction="horizontal"
        nested={true} 
        slidesPerView={1}
        loop={true}
        speed={900}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Initialize navigation buttons explicitly
          // @ts-ignore
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
             swiper.params.navigation.prevEl = prevRef.current;
             swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="inner-banner-swiper w-full h-full"
      >
        {tourBannerEvents.map((event, index) => (
          <SwiperSlide key={event.id} className="relative w-full h-full">
            
            {/* --- IMAGES (CSS Switching) --- */}
            
            {/* Desktop Image (Hidden on Mobile) */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
                <Image
                    src={event.bannerImageUrl}
                    alt={event.eventTitle}
                    fill
                    className="object-cover"
                    priority={index === 0}
                />
            </div>

            {/* Mobile Image (Hidden on Desktop) */}
            {/* Only renders if a mobile image URL exists, otherwise falls back to desktop image in this block too */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
                <Image
                    src={event.mobileBannerImageUrl || event.bannerImageUrl}
                    alt={event.eventTitle}
                    fill
                    className="object-cover"
                    priority={index === 0}
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* TEXT OVERLAY */}
            <div className="absolute bottom-10 left-6 md:left-10 z-20 text-white max-w-3xl pr-6">
              <h3 className="hidden md:block uppercase font-bold tracking-widest text-lg md:text-2xl mb-4 md:mb-6">
                {event.eventCity}
              </h3>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <span className="text-lg md:text-3xl font-bold">
                  {event.eventDate}
                </span>

                <a
                  href={event.ticketLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 md:px-8 md:py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-black transition text-sm md:text-base"
                >
                  Buy Tickets
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* --- CUSTOM NAVIGATION ARROWS (SVG) --- */}
        {/* Left Arrow */}
        <div
          ref={prevRef}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white cursor-pointer transition-transform hover:scale-110"
        >
          <svg className="w-10 h-10 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        {/* Right Arrow */}
        <div
          ref={nextRef}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white cursor-pointer transition-transform hover:scale-110"
        >
           <svg className="w-10 h-10 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

      </Swiper>
    </section>
  );
}
