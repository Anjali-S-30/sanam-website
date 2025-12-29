"use client";

import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";

export default function MusicComingSoon() {
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
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_50%_75%,rgba(236,72,153,0.16),transparent_35%)] blur-3xl" aria-hidden />

        <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:p-12">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-purple-200/70">
              Music
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Coming soon
            </h1>
            <p className="text-sm text-slate-200/80">
              New drops are being mixed. Stay close.
            </p>

            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-purple-200/40 bg-purple-500/10 px-3 py-1.5 text-purple-100">
                Studio mode
              </span>
              <span className="rounded-full border border-blue-200/40 bg-blue-500/10 px-3 py-1.5 text-blue-100">
                Live cuts
              </span>
              <span className="rounded-full border border-pink-200/40 bg-pink-500/10 px-3 py-1.5 text-pink-100">
                Collabs
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-400/15 via-blue-400/10 to-fuchsia-400/12 p-5 sm:p-6 shadow-inner">
            <div className="absolute -right-14 -top-14 h-36 w-36 sm:h-40 sm:w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="absolute -left-10 bottom-0 h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white/5 blur-xl" aria-hidden />
            <div className="relative space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/70">
                <span>Preview</span>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.18),transparent_38%)]" />
                <div className="relative aspect-video">
                  <video
                    className="h-full w-full object-cover"
                    src="/music_coming_soon.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/80">
                    Studio cut
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
