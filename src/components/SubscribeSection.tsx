"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Music, Ticket, Users, ChevronDown, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-neutral-800" />,
    title: "Tour Announcements",
    description: "Be the first to know about upcoming concerts and tour dates.",
  },
  {
    icon: <Music className="h-6 w-6 text-neutral-800" />,
    title: "New Releases",
    description: "Get notified when we drop new songs and music videos.",
  },
  {
    icon: <Ticket className="h-6 w-6 text-neutral-800" />,
    title: "Exclusive Merchandise",
    description:
      "Early access to limited edition merchandise and special offers.",
  },
  {
    icon: <Users className="h-6 w-6 text-neutral-800" />,
    title: "Behind the Scenes",
    description: "Exclusive content, studio updates, and personal stories.",
  },
];

export default function SubscribeSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setOpenSection("form");
    }
  }, []);
  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

  return (
    <section id="subscribe" className="scroll-mt-32 mx-auto h-full w-full max-w-[85vw] py-12">
      <div className="w-full mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="font-bold text-neutral-500 tracking-wider uppercase text-xs mb-2">
            Stay Connected
          </p>
          <h2 className="text-4xl md:text-4xl font-bold text-black mb-2">
            Join the SANAM Community
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600 font-light leading-relaxed">
            Be part of our musical journey. Get exclusive access to tour
            announcements, new releases, and behind-the-scenes content.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black border-b border-neutral-200 pb-4 inline-block">
              What You'll Get:
            </h3>
            
            <div className="grid grid-cols-1 gap-5">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 pt-1 p-2 bg-neutral-100 rounded-full group-hover:bg-neutral-200 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-lg group-hover:text-neutral-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-neutral-600 font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Subscribe Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 border border-neutral-100 shadow-2xl">
            <h3 className="text-2xl font-bold text-black">Subscribe now</h3>
            <p className="mt-2 text-neutral-600 font-light">
              Join our fans who never miss an update.
            </p>

            <form action="#" method="POST" className="mt-8 space-y-5">
              <div className="relative group">
                <input
                  type="email"
                  id="email-address-desktop"
                  placeholder=" "
                  className="peer block w-full rounded-lg bg-neutral-100 border-transparent py-3 px-4 text-neutral-900 placeholder-transparent focus:border-black focus:ring-0 transition-all duration-300"
                  required
                />
                <label
                  htmlFor="email-address-desktop"
                  className="absolute left-3 top-3 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white bg-transparent px-1"
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-sm font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-all duration-300"
              >
                Don't miss a beat
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-4 text-xs text-neutral-400 text-center">
              By subscribing, you agree to receive marketing emails from SANAM.
              You can unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden mt-12 border-t border-neutral-200">
          {/* Accordion: Features */}
          <div className="border-b border-neutral-200 py-4">
            <button
              onClick={() => toggleSection("features")}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-xl font-bold text-black">What You'll Get:</h3>
              <motion.div
                animate={{ rotate: openSection === "features" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-6 w-6 text-neutral-500" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openSection === "features" && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "24px" },
                    collapsed: { opacity: 0, height: 0, marginTop: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6">
                    {features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 pt-1 text-black">
                            {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-black">
                            {feature.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion: Subscribe Form */}
          <div className="border-b border-neutral-200 py-4">
            <button
              onClick={() => toggleSection("form")}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-xl font-bold text-black">Subscribe now</h3>
              <motion.div
                animate={{ rotate: openSection === "form" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-6 w-6 text-neutral-500" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openSection === "form" && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "24px" },
                    collapsed: { opacity: 0, height: 0, marginTop: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white p-5 rounded-lg shadow-xl border border-neutral-100">
                    <p className="text-neutral-600 mb-4 font-light text-sm">
                        Join our fans who never miss an update.
                    </p>

                    <form action="#" method="POST" className="space-y-4">
                        <div className="relative group">
                        <input
                            type="email"
                            id="email-address-mobile"
                            placeholder=" "
                            className="peer block w-full rounded-md bg-neutral-100 border-transparent py-3 px-3 text-sm text-neutral-900 placeholder-transparent focus:border-black focus:outline-none transition-all duration-300"
                            required
                        />
                        <label
                            htmlFor="email-address-mobile"
                            className="absolute left-3 top-3 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white bg-transparent px-1"
                        >
                            Email Address
                        </label>
                        </div>

                        <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-sm font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-all"
                        >
                        Don't miss a beat
                        <ArrowRight className="h-4 w-4" />
                        </button>
                    </form>

                    <p className="mt-4 text-[10px] text-neutral-400 text-center">
                        By subscribing, you agree to receive marketing emails from
                        SANAM.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
