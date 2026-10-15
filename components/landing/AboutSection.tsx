export default function AboutSection() {
  return (
    <section
      id="about"
      className="section border-y border-white/[0.06] bg-white/[0.015]"
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* About content */}
          <div>
            <p className="section-eyebrow">About Boarvest</p>

            <h2 className="section-title mt-3">
              A Clearer View of Your Digital Assets.
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-400">
              Boarvest is being developed as a digital asset and crypto
              investment management platform designed to bring portfolio
              information, market awareness, and investment activity
              together in one organized experience.
            </p>

            <p className="mt-5 text-base leading-8 text-gray-400">
              Our goal is to make it easier for users to navigate their
              digital asset information through a thoughtful interface
              built around clarity, usability, and transparency.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              Boarvest is a work in progress. Account services, live market
              data, deposits, withdrawals, and investment functionality
              should not be considered available until they have been
              implemented and verified.
            </p>
          </div>

          {/* Brand principles */}
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="surface p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl text-emerald-300"
              >
                ◈
              </span>

              <h3 className="mt-5 text-lg font-semibold">
                Clarity
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Present portfolio information in a structured,
                understandable, and easy-to-navigate interface.
              </p>
            </article>

            <article className="surface p-6 sm:mt-10 sm:p-7">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.08] text-2xl text-amber-200"
              >
                ◎
              </span>

              <h3 className="mt-5 text-lg font-semibold">
                Transparency
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Communicate platform capabilities, limitations, and
                digital asset risks honestly.
              </p>
            </article>

            <article className="surface p-6 sm:col-span-2 sm:p-7">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl text-emerald-300"
              >
                ↗
              </span>

              <h3 className="mt-5 text-lg font-semibold">
                An Investor-Focused Experience
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
                Build toward an organized digital asset experience that
                helps users review supported portfolio information and
                monitor activity without unnecessary complexity.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}