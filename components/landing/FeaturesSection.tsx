const features = [
  {
    number: "01",
    icon: "◫",
    title: "PORTFOLIO VISIBILITY",
    description:
      "A structured view of digital asset holdings, designed to make portfolio information easier to navigate as account integrations become available.",
    accent: "emerald",
  },
  {
    number: "02",
    icon: "↗",
    title: "MARKET AWARENESS",
    description:
      "A dedicated space for cryptocurrency prices and market movements, with live information planned after a reliable market data provider is integrated.",
    accent: "gold",
  },
  {
    number: "03",
    icon: "◎",
    title: "ACTIVITY MONITORING",
    description:
      "A planned overview of supported account activity and portfolio changes, bringing relevant information together in one organized experience.",
    accent: "emerald",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section border-y border-white/[0.06] bg-white/[0.015]"
    >
      <div className="container">
        {/* Section heading */}
        <div className="section-heading">
          <p className="section-eyebrow">
            THE BOARVEST APPROACH
          </p>

          <h2 className="section-title">
            Designed for a{" "}
            <span className="text-gradient">
              Clearer Crypto Journey.
            </span>
          </h2>

          <p className="section-description">
            Explore the core capabilities planned for Boarvest.
            Our goal is to bring digital asset information,
            market awareness, and portfolio monitoring together
            in a clear and organized interface.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="surface group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 sm:p-8"
            >
              {/* Subtle card accent */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-px ${
                  feature.accent === "gold"
                    ? "bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
                    : "bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                }`}
              />

              {/* Card header */}
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl transition-transform duration-300 group-hover:scale-105 ${
                    feature.accent === "gold"
                      ? "border-amber-300/20 bg-amber-300/[0.08] text-amber-200"
                      : "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                  }`}
                >
                  {feature.icon}
                </span>

                <span className="text-xs font-extrabold tracking-[0.18em] text-gray-600">
                  {feature.number}
                </span>
              </div>

              {/* Feature details */}
              <h3 className="mt-7 text-lg font-extrabold leading-snug tracking-wide text-white sm:text-xl">
                {feature.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
                {feature.description}
              </p>

              {/* Planned feature indicator */}
              <div className="mt-7 flex items-center gap-2 border-t border-white/[0.07] pt-5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-amber-300"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  Planned Capability
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Supporting note */}
        <p className="mt-6 text-xs leading-6 text-gray-500">
          These descriptions outline the intended platform experience.
          They do not indicate that account integrations, live market
          data, or investment monitoring are currently operational.
        </p>
      </div>
    </section>
  );
}