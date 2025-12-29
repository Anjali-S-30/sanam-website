"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { bandMembers } from "./data/bandMembers";
import { LinkIcon } from "lucide-react";

type BandMember = (typeof bandMembers)[0];

export default function DesktopBandSection() {
  const [activeMember, setActiveMember] = useState<BandMember>(bandMembers[0]);

  return (
    // We remove the flexbox centering from this parent div
    <section className="mx-auto h-full max-w-[80vw]">
      <div className="grid w-full grid-cols-1 items-start gap-[2vw] md:grid-cols-12 md:gap-[3vw] lg:gap-[4vw]">
        <div className="w-full md:col-span-5 md:sticky md:top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex h-full flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={activeMember.imgDetail}
                  alt={activeMember.name}
                  fill
                  priority={activeMember.id === 1}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 42vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <h2 className="text-3xl font-bold bg-gradient-to-b from-neutral-600 to-black bg-clip-text text-transparent">
                  {activeMember.name}
                </h2>
                <h3 className="text-lg text-neutral-600">
                  {activeMember.title}
                </h3>
                <p className="mt-2 text-neutral-700">
                  {activeMember.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-7">
          {bandMembers.map((member) => (
            <motion.div
              key={member.id}
              onMouseEnter={() => setActiveMember(member)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={member.img}
                alt={member.name}
                fill
                sizes="30vw"
                className={`object-cover object-top transition-all duration-300 ${
                  activeMember.id === member.id
                    ? "grayscale-0"
                    : "grayscale group-hover:grayscale-0"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-2 sm:p-4">
                <h3 className="text-sm font-bold text-white sm:text-base">
                  {member.name}
                </h3>
                <p className="text-xs text-white/80 sm:text-sm">
                  {member.title}
                </p>
              </div>
              <a
                href={member.instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 text-white">
                    <LinkIcon className="h-4 w-4" />
                    <p className="text-sm font-semibold">
                      Tap to see {member.name}'s profile
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
