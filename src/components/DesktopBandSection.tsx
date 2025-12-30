"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { bandMembers } from "@/components/data/bandMembers";

export default function LayoutStepFinal() {
  const [activeMember, setActiveMember] = useState(bandMembers[0]);
  const [prevMember, setPrevMember] = useState<typeof bandMembers[0] | null>(null);

  const handleHover = (member: (typeof bandMembers)[number]) => {
    if (member.id === activeMember.id) return;
    setPrevMember(activeMember);
    setActiveMember(member);
  };

  useEffect(() => {
    if (!prevMember) return;
    const timeout = setTimeout(() => setPrevMember(null), 500);
    return () => clearTimeout(timeout);
  }, [prevMember]);

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto flex h-[min(80vh,80vw)] w-full max-w-screen-xl gap-6 sm:gap-10 lg:gap-16">

        {/* LEFT — BIG PORTRAIT IMAGE */}
        <div className="flex-[0.9] flex items-center">
          <div className="relative block aspect-[3/4] h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            {prevMember && (
              <>
                <Image
                  key={`prev-${prevMember.id}`}
                  src={prevMember.imgDetail}
                  alt={prevMember.name}
                  fill
                  priority
                  className="absolute inset-0 object-cover object-top image-fade-out"
                />
                <div
                  key={`prev-${prevMember.id}-text`}
                  className="absolute bottom-0 left-0 z-20 p-6 text-white text-fade-out"
                >
                  <h2 className="text-2xl font-semibold">{prevMember.name}</h2>
                  <p className="mt-1 text-sm text-white/80">{prevMember.title}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                    {prevMember.description}
                  </p>
                </div>
              </>
            )}

            <Image
              key={activeMember.id}
              src={activeMember.imgDetail}
              alt={activeMember.name}
              fill
              priority
              className="absolute inset-0 object-cover object-top image-fade-in"
            />

            <div
              key={`${activeMember.id}-text`}
              className="absolute bottom-0 left-0 z-20 p-6 text-white text-fade-in"
            >
              <h2 className="text-2xl font-semibold">{activeMember.name}</h2>
              <p className="mt-1 text-sm text-white/80">{activeMember.title}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                {activeMember.description}
              </p>
            </div>

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* RIGHT — IMAGE GROUP (Unchanged) */}
        <div className="flex-[2.1] flex items-center">
          <div className="aspect-square h-full w-full">
            <div className="grid h-full w-full grid-cols-2 gap-12">
              {bandMembers.map((member) => (
                <div
                  key={member.id}
                  onMouseEnter={() => handleHover(member)}
                  className="group relative block overflow-hidden rounded-2xl bg-gray-200 cursor-pointer"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className={`object-cover object-top transition-all duration-300 ${
                      activeMember.id === member.id
                        ? "grayscale-0 scale-105"
                        : "grayscale group-hover:grayscale-0"
                    }`}
                  />
                  {activeMember.id !== member.id && (
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                  )}
                  <div className="absolute bottom-0 left-0 p-5 z-10">
                    <h3 className="text-lg font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {member.title}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <a
                    href={member.instaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-1 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:scale-120 hover:bg-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* IMAGE ANIMATION */
        .image-delayed-fade {
          opacity: 0; /* Important: Start hidden or you won't see the delay */
          animation: simpleFadeIn 0.3s ease-out forwards;
          animation-delay: 0.1s; /* <--- HERE IS YOUR DELAY */
        }

        /* TEXT ANIMATION */
        .text-slide-up {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
          animation-delay: 0.2s; 
        }

        @keyframes simpleFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <style jsx>{`
        .image-fade-in {
          opacity: 0;
          animation: fadeIn 1.9s ease-out forwards;
        
        }
        .image-fade-out {
          animation: fadeOut 2.9s ease-in forwards;
        }
        .text-fade-in {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 0.05s;
        }
        .text-fade-out {
          animation: fadeOut 0.3s ease-in forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.01);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.995);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
