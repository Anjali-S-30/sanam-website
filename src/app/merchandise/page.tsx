"use client";

import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";

export default function MerchandiseComingSoon() {
  const { setNavbarStyle } = useNavbar();

  useEffect(() => {
    setNavbarStyle({
      background: "bg-transparent",
      logo: "text-white",
      text: "text-white",
      hamburger: "text-white",
    });

    return () => {
      setNavbarStyle({
        background: "bg-transparent",
        logo: "text-neutral-900",
        text: "text-neutral-800",
        hamburger: "text-black",
      });
    };
  }, [setNavbarStyle]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4 py-12 sm:px-6 sm:py-14 md:py-16">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_50%_75%,rgba(34,211,238,0.16),transparent_35%)] blur-3xl" aria-hidden />

        <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-12">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              Merchandise
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Coming soon
            </h1>
            <p className="text-sm text-slate-200/80">
              Next capsule spans apparel, accessories, and music keepsakes.
            </p>

            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-amber-200/40 bg-amber-500/10 px-3 py-1.5 text-amber-100">
                Tees & outerwear
              </span>
              <span className="rounded-full border border-emerald-200/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-100">
                Accessories
              </span>
              <span className="rounded-full border border-cyan-200/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-100">
                CDs & vinyl
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/15 via-emerald-400/10 to-cyan-400/12 p-4 sm:p-5 shadow-inner">
            <div className="absolute -right-14 -top-14 h-36 w-36 sm:h-40 sm:w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="absolute -left-10 bottom-0 h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white/5 blur-xl" aria-hidden />
            <div className="relative space-y-3 sm:space-y-4">
              
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(74,222,128,0.18),transparent_38%)]" />
                <div className="relative aspect-[21/10] sm:aspect-[21/9] max-h-[320px]">
                  <video
                    className="h-full w-full object-cover sm:object-contain"
                    src="/marchandise_coming_soon.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
