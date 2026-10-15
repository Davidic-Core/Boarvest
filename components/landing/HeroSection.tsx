import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="hero-glow grid-background relative overflow-hidden"
    >
      <div className="container grid items-center gap-14 py-20 md:grid-cols-2 md:py-28 lg:py-32">
        {/* Hero content */}
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 text-xs font-medium text-emerald-300">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-400"
            />

            A New Perspective on Digital Assets
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
            Your Crypto Journey Starts with{" "}
            <span className="text-gradient">Boarvest.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
            Take a more informed approach to your digital assets with a
            platform designed around portfolio visibility, market
            awareness, and a clearer investment experience.
          </p>

          {/* Call-to-action buttons */}
          <div
            id="get-started"
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="#features" className="button button-primary">
              Explore the Platform
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="#how-it-works" className="button button-secondary">
              How It Works
            </Link>
          </div>

          {/* Key highlights */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="text-emerald-400">
                ✓
              </span>
              Investor-focused design
            </span>

            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="text-emerald-400">
                ✓
              </span>
              Clear portfolio visibility
            </span>
          </div>
        </div>

        {/* Illustrative dashboard preview */}
        <div className="relative mx-auto w-full max-w-xl">
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-full bg-emerald-400/[0.07] blur-3xl"
          />

          <div className="surface-elevated relative overflow-hidden p-5 shadow-2xl sm:p-7">
            {/* Preview heading */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-sm font-semibold">
                  Portfolio Overview
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Illustrative dashboard preview
                </p>
              </div>

              <span className="rounded-lg border border-amber-300/20 bg-amber-300/[0.08] px-3 py-1.5 text-xs text-amber-200">
                Preview
              </span>
            </div>

            {/* Portfolio value placeholder */}
            <div className="py-7">
              <p className="text-sm text-gray-400">
                Total Portfolio Value
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your Balance
              </p>

              <p className="mt-3 text-xs text-gray-500">
                Connect supported account data to display your balance.
              </p>
            </div>

            {/* Decorative chart */}
            <div
              role="img"
              aria-label="Illustrative portfolio chart, not real investment performance"
              className="relative h-36 overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 p-3"
            >
              <svg
                viewBox="0 0 420 110"
                className="h-full w-full"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="boarvest-chart-fill"
                    x1="210"
                    y1="0"
                    x2="210"
                    y2="110"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stopColor="#27D17F"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="1"
                      stopColor="#27D17F"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M0 26H420 M0 55H420 M0 84H420"
                  stroke="white"
                  strokeOpacity="0.07"
                  strokeDasharray="4 5"
                />

                <path
                  d="M0 88 C25 83 33 68 58 74 S94 90 117 61 S153 67 180 45 S222 57 249 36 S292 51 318 27 S360 42 385 18 S405 24 420 10 L420 110 L0 110 Z"
                  fill="url(#boarvest-chart-fill)"
                />

                <path
                  d="M0 88 C25 83 33 68 58 74 S94 90 117 61 S153 67 180 45 S222 57 249 36 S292 51 318 27 S360 42 385 18 S405 24 420 10"
                  stroke="#27D17F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Dashboard metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="surface p-4">
                <p className="text-xs text-gray-500">
                  Total Deposits
                </p>

                <p className="mt-2 text-lg font-semibold">
                  Account Data
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Not connected
                </p>
              </div>

              <div className="surface p-4">
                <p className="text-xs text-gray-500">
                  Investment Activity
                </p>

                <p className="mt-2 text-lg font-semibold">
                  Account Data
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Not connected
                </p>
              </div>
            </div>

            {/* Transparency notice */}
            <p className="mt-4 text-center text-[11px] leading-5 text-gray-500">
              Concept preview only. No live balances, transactions, or
              investment performance are displayed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}