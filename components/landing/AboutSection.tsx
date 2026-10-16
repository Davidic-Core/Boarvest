export default function AboutSection() {
  return (
    <section
      id="about"
      className="section border-y border-white/[0.06] bg-white/[0.015]"
    >
      <div className="container">
        {/* Section heading */}
        <div className="mb-14 max-w-3xl">
          <p className="section-eyebrow">ABOUT BOARVEST</p>

          <h2 className="section-title mt-4">
            A Smarter Perspective on{" "}
            <span className="text-gradient">Digital Assets.</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
            Boarvest is being developed as a digital asset management
            platform with a focus on portfolio visibility, market
            awareness, and a more organized cryptocurrency experience.
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Our vision is to bring essential digital asset information
            into one thoughtfully designed interface, making it easier
            to navigate portfolio information and understand account
            activity as platform capabilities become available.
          </p>
        </div>

        {/* Brand principles */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Principle 1 */}
          <article className="surface group relative overflow-hidden p-6 transition-colors duration-300 hover:border-emerald-400/30 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/[0.04] blur-2xl transition-colors group-hover:bg-emerald-400/[0.09]"
            />

            <div className="relative">
              <span className="text-xs font-extrabold tracking-[0.2em] text-emerald-400">
                01
              </span>

              <div
                aria-hidden="true"
                className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl text-emerald-300"
              >
                ◈
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                CLARITY
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Make digital asset information easier to understand
                through an organized interface designed to reduce
                unnecessary complexity.
              </p>
            </div>
          </article>

          {/* Principle 2 */}
          <article className="surface group relative overflow-hidden p-6 transition-colors duration-300 hover:border-amber-300/30 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-300/[0.035] blur-2xl transition-colors group-hover:bg-amber-300/[0.08]"
            />

            <div className="relative">
              <span className="text-xs font-extrabold tracking-[0.2em] text-amber-200">
                02
              </span>

              <div
                aria-hidden="true"
                className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.08] text-2xl text-amber-200"
              >
                ◎
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                TRANSPARENCY
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Communicate platform capabilities, limitations,
                and digital asset risks honestly, without misleading
                promises or invented financial results.
              </p>
            </div>
          </article>

          {/* Principle 3 */}
          <article className="surface group relative overflow-hidden p-6 transition-colors duration-300 hover:border-emerald-400/30 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/[0.04] blur-2xl transition-colors group-hover:bg-emerald-400/[0.09]"
            />

            <div className="relative">
              <span className="text-xs font-extrabold tracking-[0.2em] text-emerald-400">
                03
              </span>

              <div
                aria-hidden="true"
                className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl text-emerald-300"
              >
                ↗
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                INVESTOR-FOCUSED
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Build toward a practical digital asset experience
                where supported portfolio information and account
                activity can be reviewed in one place.
              </p>
            </div>
          </article>
        </div>

        {/* Development notice */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-start sm:gap-4 sm:p-6">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
          >
            i
          </span>

          <div>
            <h3 className="text-sm font-bold text-white">
              A PLATFORM IN DEVELOPMENT
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-400">
              Boarvest is a work in progress. Account services, live
              market data, deposits, withdrawals, and investment
              functionality should not be considered available until
              they have been implemented and verified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}