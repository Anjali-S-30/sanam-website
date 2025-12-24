export default function MerchandiseComingSoon() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_50%_75%,rgba(34,211,238,0.16),transparent_35%)] blur-3xl" aria-hidden />

        <div className="relative grid gap-10 p-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-14">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              Merchandise
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Coming soon
            </h1>
            <p className="text-sm text-slate-200/80">
              Next capsule spans apparel, accessories, and music keepsakes.
            </p>

            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-amber-200/40 bg-amber-500/10 px-4 py-2 text-amber-100">
                Tees & outerwear
              </span>
              <span className="rounded-full border border-emerald-200/40 bg-emerald-500/10 px-4 py-2 text-emerald-100">
                Accessories
              </span>
              <span className="rounded-full border border-cyan-200/40 bg-cyan-500/10 px-4 py-2 text-cyan-100">
                CDs & vinyl
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/15 via-emerald-400/10 to-cyan-400/12 p-3 shadow-inner">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-white/5 blur-xl" aria-hidden />
            <div className="relative space-y-4">
              
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(74,222,128,0.18),transparent_38%)]" />
                <div className="relative aspect-[21/9] max-h-[320px]">
                  <video
                    className="h-full w-full object-contain"
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
