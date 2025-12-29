"use client";

import { useState } from "react";
import Image from "next/image";
import { bandMembers } from "@/components/data/bandMembers";

export default function LayoutStepFinal() {
  const [activeMember, setActiveMember] = useState(bandMembers[0]);

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 md:px-12 lg:px-16">
      {/* MAIN LAYOUT — FLEX */}
      <div className="mx-auto flex h-[min(80vh,80vw)] w-full max-w-screen-xl gap-6 sm:gap-10 lg:gap-16">

        {/* LEFT — BIG PORTRAIT IMAGE (≈30%) */}
        <div className="flex-[0.9] flex items-center">
          <a
            href={activeMember.instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[3/4] h-full overflow-hidden rounded-2xl"
          >

            {/* IMAGE */}
            <Image
              src={activeMember.imgDetail}
              alt={activeMember.name}
              fill
              priority
              className="object-cover object-top"
            />

            {/* TEXT OVERLAY */}
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl font-semibold">
                {activeMember.name}
              </h2>
              <p className="mt-1 text-sm text-white/80">
                {activeMember.title}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                {activeMember.description}
              </p>
            </div>

            {/* HOVER CTA */}
            <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Go to {activeMember.name}'s Insta →
            </div>

          </a>
        </div>

        {/* RIGHT — IMAGE GROUP (≈70%) */}
        <div className="flex-[2.1] flex items-center">
          <div className="aspect-square h-full w-full">
            <div className="grid h-full w-full grid-cols-2 gap-12">

              {bandMembers.map((member) => (
                <a
                  key={member.id}
                  href={member.instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveMember(member)}
                  className="group relative block cursor-pointer overflow-hidden rounded-2xl"
                >
                  {/* THUMB IMAGE */}
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className={`object-cover object-top transition-all duration-300 ${
                      activeMember.id === member.id
                        ? "grayscale-0"
                        : "grayscale group-hover:grayscale-0"
                    }`}
                  />

                  {/* DARK OVERLAY */}
                  {activeMember.id !== member.id && (
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                  )}

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="text-lg font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {member.title}
                    </p>
                  </div>
                </a>
              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
