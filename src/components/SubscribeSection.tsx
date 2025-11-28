"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Music, Ticket, Users, ChevronDown } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-neutral-600" />,
    title: "Tour Announcements",
    description: "Be the first to know about upcoming concerts and tour dates.",
  },
  {
    icon: <Music className="h-6 w-6 text-neutral-600" />,
    title: "New Releases",
    description: "Get notified when we drop new songs and music videos.",
  },
  {
    icon: <Ticket className="h-6 w-6 text-neutral-600" />,
    title: "Exclusive Merchandise",
    description:
      "Early access to limited edition merchandise and special offers.",
  },
  {
    icon: <Users className="h-6 w-6 text-neutral-600" />,
    title: "Behind the Scenes",
    description: "Exclusive content, studio updates, and personal stories.",
  },
];

export default function SubscribeSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

  return (
    <section id="subscribe" className="mx-auto h-full max-w-[80vw] pt-16">
      <div className="w-full mx-auto">
        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold text-neutral-600 tracking-wider">
            STAY CONNECTED
          </p>
          <h2 className="mt-2 text-4xl font-bold text-black md:text-5xl">
            Join the SANAM Community
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-700">
            Be part of our musical journey and get exclusive access to tour
            announcements, new releases, and behind-the-scenes content.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start mt-8">
          {/* Left: Features */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-black">What You'll Get:</h3>
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-black">{feature.title}</h4>
                  <p className="mt-1 text-neutral-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Subscribe Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl lg:p-10 border border-neutral-100">
            <h3 className="text-2xl font-bold text-black">Subscribe Now</h3>
            <p className="mt-2 text-neutral-600">
              Join our fans who never miss an update.
            </p>

            <form action="#" method="POST" className="mt-8 space-y-6">
              <div className="relative group">
                <input
                  type="email"
                  id="email-address-desktop"
                  placeholder=" "
                  className="peer block w-full rounded-md bg-neutral-100/60 py-3 px-3 text-sm text-neutral-900 placeholder-transparent focus:bg-neutral-200 focus:outline-none transition-all duration-300"
                  required
                />
                <label
                  htmlFor="email-address-desktop"
                  className="absolute left-3 top-3 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black"
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-black hover:bg-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Subscribe to Newsletter
              </button>
            </form>

            <p className="mt-4 text-xs text-neutral-500">
              By subscribing, you agree to receive marketing emails from SANAM.
              You can unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden mt-12 border-t border-neutral-200">
          {/* Accordion: Features */}
          <div className="border-b border-neutral-200 py-6">
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
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <div>
                          <h4 className="font-semibold text-black">
                            {feature.title}
                          </h4>
                          {/* --- DESCRIPTION <p> TAG REMOVED FROM HERE --- */}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion: Subscribe Form */}
          <div className="border-b border-neutral-200 py-6">
            <button
              onClick={() => toggleSection("form")}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-xl font-bold text-black">Subscribe Now</h3>
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
                  <p className="text-neutral-600">
                    Join our fans who never miss an update.
                  </p>

                  <form action="#" method="POST" className="mt-6 space-y-6">
                    <div className="relative group">
                      <input
                        type="email"
                        id="email-address-mobile"
                        placeholder=" "
                        className="peer block w-full rounded-md bg-neutral-100/60 py-3 px-3 text-sm text-neutral-900 placeholder-transparent focus:bg-neutral-200 focus:outline-none transition-all duration-300"
                        required
                      />
                      <label
                        htmlFor="email-address-mobile"
                        className="absolute left-3 top-3 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black"
                      >
                        Email Address
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-black hover:bg-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Subscribe to Newsletter
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-neutral-500">
                    By subscribing, you agree to receive marketing emails from
                    SANAM. You can unsubscribe at any time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}