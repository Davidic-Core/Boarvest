const features = [
  {
    number: "01",
    icon: "◫",
    title: "Portfolio Visibility",
    description:
      "View digital asset information through an organized interface designed to make portfolio monitoring easier.",
  },
  {
    number: "02",
    icon: "↗",
    title: "Market Awareness",
    description:
      "Explore market information and asset movements once a reliable market data provider is connected.",
  },
  {
    number: "03",
    icon: "◎",
    title: "Investment Monitoring",
    description:
      "Keep track of supported investment activity and portfolio performance as the platform develops.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        {/* Section heading */}
        <div className="section-heading">
          <p className="section-eyebrow">
            Built Around Your Portfolio
          </p>

          <h2 className="section-title">
            Clarity for Your Crypto Journey.
          </h2>

          <p className="section-description">
            A considered approach to viewing digital assets,
            understanding market information, and monitoring supported
            investment activity.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="surface group p-6 transition-colors duration-200 hover:border-emerald-400/25 sm:p-8"
            >
              {/* Icon and number */}
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-2xl text-emerald-300"
                >
                  {feature.icon}
                </span>

                <span className="text-xs font-medium tracking-widest text-gray-600">
                  {feature.number}
                </span>
              </div>

              {/* Feature details */}
              <h3 className="mt-7 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                {feature.description}
              </p>

              {/* Decorative accent */}
              <div
                aria-hidden="true"
                className="mt-6 h-px w-12 bg-emerald-400/50 transition-all duration-300 group-hover:w-20"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}