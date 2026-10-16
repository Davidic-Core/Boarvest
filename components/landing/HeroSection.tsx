import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="hero-glow grid-background relative isolate overflow-hidden"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-400/[0.08] blur-[100px] sm:h-[38rem] sm:w-[38rem]" />

        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-500/[0.04] blur-[100px]" />

        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-amber-400/[0.025] blur-[100px]" />
      </div>

      <div className="container relative z-10 flex min-h-[600px] flex-col items-center justify-center py-24 text-center sm:min-h-[660px] sm:py-28 lg:min-h-[720px] lg:py-32">
        {/* Eyebrow badge */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2.5 sm:px-5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
          />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:text-xs sm:tracking-[0.22em]">
            A New Perspective on Digital Assets
          </span>
        </div>

        {/* Main headline */}
        <h1 className="max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Build Your Digital Asset Journey with{" "}
          <span className="text-gradient">Boarvest.</span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:mt-8 sm:text-lg sm:leading-9 lg:text-xl">
          A fresh approach to the crypto experience, bringing portfolio
          visibility, market awareness, and digital asset management
          together in one thoughtfully designed platform.
        </p>

        {/* Call-to-action buttons */}
        <div
          id="get-started"
          className="mt-9 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <Link
            href="#features"
            className="button button-primary flex min-h-12 items-center justify-center gap-3 px-7 py-3.5 text-sm font-bold"
          >
            Explore the Platform

            <span aria-hidden="true" className="text-lg">
              →
            </span>
          </Link>

          <Link
            href="#how-it-works"
            className="button button-secondary flex min-h-12 items-center justify-center gap-3 px-7 py-3.5 text-sm font-bold"
          >
            Discover Boarvest

            <span aria-hidden="true" className="text-lg">
              ↗
            </span>
          </Link>
        </div>

        {/* Brand values */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 border-t border-white/[0.08] pt-7 sm:gap-x-10">
          <span className="flex items-center gap-2.5 text-xs font-medium text-gray-400 sm:text-sm">
            <span
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-[11px] text-emerald-400"
            >
              ✓
            </span>
            Built Around Clarity
          </span>

          <span className="flex items-center gap-2.5 text-xs font-medium text-gray-400 sm:text-sm">
            <span
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-[11px] text-emerald-400"
            >
              ✓
            </span>
            Designed for Investors
          </span>
        </div>

        {/* Bottom brand accent */}
        <div
          aria-hidden="true"
          className="mt-16 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent sm:mt-20"
        />
      </div>
    </section>
  );
}