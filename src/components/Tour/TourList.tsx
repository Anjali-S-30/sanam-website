"use client";

import React from "react";
import Image from "next/image";
import { tourListEvents, TourListEvent } from "@/components/data/tourData";

const getDayName = (dateString: string) => {
    // Split "13/12/2025" into [13, 12, 2025]
    const [day, month, year] = dateString.split('/').map(Number);

    // Create Date object (Month is 0-indexed in JS, so subtract 1)
    const date = new Date(year, month - 1, day);

    // Return full day name (e.g., "Saturday")
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

const TourList = () => {
  return (
    <section className="relative w-full text-white px-4 md:px-0 py-12">

      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="/images/tour.jpg"
          alt="Tour Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center uppercase tracking-widest text-white">
          Tour Dates
        </h2>

        {/* List Container - Changed to gap-6 for separated tickets */}
        <div className="flex flex-col gap-6">
          {tourListEvents.map((event: TourListEvent) => (

            /* --- TICKET SHAPE WRAPPER --- */
            <div
              key={event.id}
              className="relative w-full group transition-transform duration-300 hover:scale-[1.01]"
              style={{
                // 1. White/Glass Background for the ticket
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(2px)",
                // 2. THE TICKET MASK: 
                // Creates 20px radius circles at the vertical center of left (0%) and right (100%) edges
                maskImage: `
                  radial-gradient(circle 20px at 0% 50%, transparent 20px, black 21px),
                  radial-gradient(circle 20px at 100% 50%, transparent 20px, black 21px)
                `,
                WebkitMaskImage: `
                  radial-gradient(circle 20px at 0% 50%, transparent 20px, black 21px),
                  radial-gradient(circle 20px at 100% 50%, transparent 20px, black 21px)
                `,
                // 3. Combine the masks using intersection (shows only where BOTH are black)
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in"
              }}
            >

              {/* --- TICKET CONTENT --- */}
              {/* Added horizontal padding (px-12/px-16) to ensure text doesn't touch the cutouts */}
              <div className="flex flex-col md:flex-row items-center justify-between py-8 px-12 md:px-16 gap-6 md:gap-0 border border-white/10 rounded-lg">

                {/* 1. Date & Day Column */}
                <div className="w-full md:w-1/4 text-center md:text-left flex flex-col justify-center">
                  {/* The Day Name (e.g. SATURDAY) */}
                  <span className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">
                    {getDayName(event.date)}
                  </span>

                  {/* The Date (e.g. 13/12/2025) */}
                  <span className="text-lg md:text-xl text-white tracking-wide font-medium">
                    {event.date}
                  </span>
                </div>

                {/* 2. Venue */}
                <div className="w-full md:w-1/4 text-center md:text-left text-neutral-300 group-hover:text-white transition-colors uppercase tracking-wider text-base md:text-lg font-normal">
                  {event.venue}
                </div>

                {/* 3. City */}
                <div className="w-full md:w-1/4 text-center md:text-left uppercase tracking-widest text-white text-base md:text-lg font-normal">
                  {event.city}
                </div>

                {/* 4. Button */}
                <div className="w-full md:w-1/4 flex justify-center md:justify-end">
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

        {/* Footer Link */}
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
    </section>
  );
};

export default TourList;