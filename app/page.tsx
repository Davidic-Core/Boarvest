import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const marketIndicators = [
  {
    number: "01",
    title: "ASSET PRICES",
    description:
      "A place for cryptocurrency prices from a reliable market data provider.",
  },
  {
    number: "02",
    title: "MARKET MOVEMENTS",
    description:
      "A clearer view of price changes using verified market information.",
  },
  {
    number: "03",
    title: "MARKET INSIGHTS",
    description:
      "Additional market indicators as suitable data integrations become available.",
  },
];

export default function Home() {
  return (
    <main id="home" className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* About Boarvest */}
      <AboutSection />

      {/* Features */}
      <FeaturesSection />

      {/* Market Overview */}
      <section id="markets" className="section">
        <div className="container">
          {/* Section heading */}
          <div className="section-heading">
            <p className="section-eyebrow">MARKET AWARENESS</p>

            <h2 className="section-title">
              A Clearer View of{" "}
              <span className="text-gradient">the Market.</span>
            </h2>

            <p className="section-description">
              Digital asset decisions deserve reliable information.
              Boarvest is being developed with the goal of presenting
              market information in a clear and organized format.
              Live data will appear when a suitable provider has been
              integrated and verified.
            </p>
          </div>

          {/* Market information panel */}
          <div className="surface overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                  BOARVEST MARKETS
                </p>

                <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Digital Asset Market Overview
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Market data integration is not available yet.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-200">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-amber-300"
                />
                Coming Soon
              </span>
            </div>

            {/* Market information cards */}
            <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
              {marketIndicators.map((indicator) => (
                <article
                  key={indicator.number}
                  className="bg-[#111a15] p-6 transition-colors duration-200 hover:bg-[#152119] sm:p-7"
                >
                  <p className="text-xs font-extrabold tracking-[0.18em] text-emerald-400">
                    {indicator.number}
                  </p>

                  <h3 className="mt-5 text-sm font-bold tracking-wide text-white">
                    {indicator.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium text-gray-500">
                    Not Available Yet
                  </p>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {indicator.description}
                  </p>
                </article>
              ))}
            </div>

            {/* Transparency notice */}
            <div className="border-t border-white/[0.06] px-5 py-4 sm:px-7">
              <p className="text-xs leading-6 text-gray-500">
                Market information is not currently connected. No live
                prices, market movements, or investment performance
                are represented by these placeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="pb-20 pt-8 sm:pb-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.10] via-[#101a14] to-[#11100d] p-7 sm:p-10 lg:p-14">
            {/* Background accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-400/[0.08] blur-3xl"
            />

            <div className="relative z-10 max-w-2xl">
              <p className="section-eyebrow">
                THE BOARVEST VISION
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your Digital Asset Journey.{" "}
                <span className="text-gradient">
                  A Clearer Direction.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                Explore our approach to digital asset management
                and discover the features planned for the Boarvest
                platform.
              </p>

              <a
                href="#features"
                className="button button-primary mt-8 inline-flex items-center justify-center gap-3"
              >
                Explore Features

                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}