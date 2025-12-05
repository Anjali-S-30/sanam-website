"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Parallax, EffectFade } from "swiper/modules";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import your data
import { tourBannerEvents } from "@/components/data/tourData";

const TourBanner = () => {
    // State to track if we are on a mobile device
    const [isMobile, setIsMobile] = useState(false);

    // Refs for custom navigation arrows
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to update mobile state based on screen width
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        // Run immediately on mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Safety check: if no data, don't render anything
    if (!tourBannerEvents || tourBannerEvents.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Parallax, EffectFade]}
                effect="fade"
                speed={1500}
                fadeEffect={{ crossFade: true }}
                parallax={true}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // Assign the custom navigation buttons to Swiper params
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                pagination={{ clickable: true, dynamicBullets: false }}

                className="w-full aspect-[3/4] md:aspect-[16/9] lg:aspect-[21/9] md:min-h-[500px]"
            >
                {tourBannerEvents.map((event, index) => (
                    <SwiperSlide key={event.id} className="relative w-full h-full overflow-hidden">

                        {/* --- LAYER 1: BACKGROUND IMAGE (Parallax Effect) --- */}
                        <div
                            className="absolute inset-0 w-full h-full"
                            data-swiper-parallax="10%"
                        >
                            <Image
                                // Switch between mobile and desktop images if available
                                src={isMobile && event.mobileBannerImageUrl ? event.mobileBannerImageUrl : event.bannerImageUrl}
                                alt={event.eventTitle}
                                fill
                                className="object-cover"
                                priority={index === 0} // Load first image immediately
                            />
                            {/* Dark Overlay to make text readable */}
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        {/* --- LAYER 2: TEXT CONTENT (Parallax Effect) --- */}
                        <div
                            // ADDED: 'items-start' and 'text-left' to force alignment
                            // ADDED: 'w-full' to ensure the container stretches across the screen
                            className="relative z-10 w-full h-full flex flex-col justify-end items-start text-left pb-16 px-6 md:pb-16 md:px-16 lg:pb-20 lg:px-20"
                            data-swiper-parallax="-300"
                        >
                            <div className="max-w-4xl text-white">

                                {/* Subtitle */}
                                <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-sm md:text-base lg:text-xl">
                                    {event.eventCity}
                                </h3>

                                {/* Bottom Row: Date | Button */}
                                <div className="flex flex-row items-center gap-4 md:gap-8">
                                    <span className="text-lg sm:text-xl md:text-3xl font-bold text-white tracking-tight uppercase whitespace-nowrap">
                                        {event.eventDate}
                                    </span>

                                    <div className="h-6 md:h-8 w-px bg-white/40" />

                                    <a
                                        href={event.ticketLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-6 py-2 md:px-8 md:py-3 border-2 border-white text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 text-sm md:text-base whitespace-nowrap bg-transparent"
                                    >
                                        Buy Tickets
                                    </a>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* --- CUSTOM NAVIGATION ARROWS (Hidden on Mobile) --- */}
                <div
                    ref={prevRef}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white transition-opacity hidden md:block"
                >
                    <ChevronLeft className="w-10 h-10 drop-shadow-lg" />
                </div>
                <div
                    ref={nextRef}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white transition-opacity hidden md:block"
                >
                    <ChevronRight className="w-10 h-10 drop-shadow-lg" />
                </div>

            </Swiper>
        </section>
    );
};

// --- ICON COMPONENTS ---
const ChevronLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export default TourBanner;