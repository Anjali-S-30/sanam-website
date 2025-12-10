"use client";

import React from "react";
import Image from "next/image";
import { tourListEvents, TourListEvent } from "@/components/data/tourData";

// --- Helper Functions ---
const getDayName = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const getFormattedDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString('en-US', { month: 'short' });

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return 'th'; 
    switch (n % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${monthName} ${year}`;
};

const TourList = () => {
  return (
    <section className="relative w-full text-white">
      
      {/* --- STICKY BACKGROUND --- */}
      <div className="sticky top-0 left-0 w-full h-screen -z-10 overflow-hidden">
        <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src="/images/tour.jpg" 
              alt="Tour Background Desktop"
              fill
              className="object-cover"
              priority
            />
        </div>
        <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/tour-mobile.jpg" 
              alt="Tour Background Mobile"
              fill
              className="object-cover"
              priority
            />
        </div>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="relative z-10 -mt-[100vh] px-4 md:px-0 py-12">
        <div className="container mx-auto max-w-5xl">
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center uppercase tracking-widest text-white">
            Tour Dates
          </h2>

          <div className="flex flex-col gap-6">
            {tourListEvents.map((event: TourListEvent) => (
              
              <div 
                key={event.id}
                className="relative w-full group transition-transform duration-300 hover:scale-[1.01]"
                style={{
                  background: "rgba(255, 255, 255, 0.1)", 
                  backdropFilter: "blur(1px)",
                  maskImage: `
                    radial-gradient(circle 20px at 0% 50%, transparent 20px, black 21px),
                    radial-gradient(circle 20px at 100% 50%, transparent 20px, black 21px)
                  `,
                  WebkitMaskImage: `
                    radial-gradient(circle 20px at 0% 50%, transparent 20px, black 21px),
                    radial-gradient(circle 20px at 100% 50%, transparent 20px, black 21px)
                  `,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in"
                }}
              >
                
                {/* --- GRID LAYOUT (4 Equal Columns on Desktop) --- */}
                {/* Changed from 'flex justify-between' to 'grid grid-cols-4' */}
                <div className="flex flex-col md:grid md:grid-cols-4 items-center py-8 px-12 md:px-16 gap-6 md:gap-0 border border-white/10 rounded-lg">
                  
                  {/* --- 1. DATE SECTION --- */}
                  {/* items-center centers the Day over Date. justify-self-start aligns the block to the left of the col */}
                  <div className="w-full flex flex-col items-center justify-center md:items-start">
                     {/* Wrapper to center text stack but keep block alignment */}
                     <div className="flex flex-col items-center">
                        <span className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">
                          {getDayName(event.date)}
                        </span>
                        <span className="text-base md:text-lg text-white font-normal uppercase tracking-widest whitespace-nowrap">
                          {getFormattedDate(event.date)}
                        </span>
                     </div>
                  </div>

                  {/* --- 2. VENUE SECTION --- */}
                  {/* Starts at 25% width mark. Fixed width container inside ensures wrapping. */}
                  <div className="w-full flex justify-center md:justify-start">
                    <div className="w-[200px] text-center md:text-left text-neutral-300 group-hover:text-white transition-colors uppercase tracking-widest text-base md:text-lg font-normal leading-snug">
                      {event.venue}
                    </div>
                  </div>

                  {/* --- 3. CITY --- */}
                  {/* Starts at 50% width mark. */}
                  <div className="w-full text-center md:text-left uppercase tracking-widest text-white text-base md:text-lg font-normal">
                    {event.city}
                  </div>

                  {/* --- 4. BUTTON --- */}
                  {/* Starts at 75% width mark. Aligned to the end (right). */}
                  <div className="w-full flex justify-center md:justify-end">
                    {event.status === "sold_out" ? (
                      <span className="px-6 py-2 text-red-500 font-bold uppercase tracking-widest text-sm border border-red-500/30 bg-red-500/10 rounded">
                        Sold Out
                      </span>
                    ) : (
                      <a
                        href={event.ticketLink}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`
                          px-8 py-3 rounded-full font-medium text-sm md:text-base uppercase tracking-widest transition-all duration-300 border border-white whitespace-nowrap
                          text-white bg-transparent hover:scale-105 hover:bg-transparent
                        `}
                      >
                        {event.status === "low_tickets" ? "Low Tickets" : "Book Ticket"}
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center pb-8">
            <a 
              href="https://in.bookmyshow.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border-b-2 border-white pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-bold"
            >
              View All Dates
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TourList;