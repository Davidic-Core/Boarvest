import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Account registration will become available when Boarvest's authentication system is implemented.",
  },
  {
    number: "02",
    title: "Explore Your Dashboard",
    description:
      "Discover the portfolio tools, account information, and market features planned for the Boarvest platform.",
  },
  {
    number: "03",
    title: "Monitor Your Activity",
    description:
      "Review supported portfolio information and account activity when the relevant platform features become available.",
  },
];

const marketIndicators = [
  {
    title: "Asset Prices",
    description: "Current prices from a verified market data provider.",
  },
  {
    title: "Market Movements",
    description: "Price changes calculated from reliable market data.",
  },
  {
    title: "Market Indicators",
    description: "Additional market information as integrations become available.",
  },
];

const faqs = [
  {
    question: "What is Boarvest?",
    answer:
      "Boarvest is being developed as a digital asset and cryptocurrency investment management platform. Its planned features include portfolio visibility, market information, account management, and an investor-focused dashboard.",
  },
  {
    question: "Does Boarvest guarantee investment returns?",
    answer:
      "No. Cryptocurrency markets are volatile, and investment returns cannot be guaranteed. You could lose some or all of your invested capital. Be cautious of any claim promising guaranteed profits.",
  },
  {
    question: "Does the website display live cryptocurrency prices?",
    answer:
      "Not currently. Live prices and market indicators will be displayed only after a reliable market data provider has been integrated and the information can be presented accurately.",
  },
  {
    question: "Can I deposit or withdraw cryptocurrency?",
    answer:
      "Deposit and withdrawal functionality has not yet been established by this homepage prototype. Do not send cryptocurrency or money to an address claiming to belong to Boarvest based solely on this website.",
  },
  {
    question: "Can I create a Boarvest account now?",
    answer:
      "The public homepage is being developed first. Registration and account access will become available after the necessary authentication and account-management features have been implemented and tested.",
  },
  {
    question: "Is Boarvest financial advice?",
    answer:
      "No. Website content is provided for general informational purposes and is not personalized financial, investment, tax, or legal advice. Make independent decisions and seek qualified professional advice when appropriate.",
  },
];

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="section-eyebrow">{children}</p>;
}

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen overflow-hidden"
    >
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* About Boarvest */}
      <AboutSection />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <section
        id="how-it-works"
        className="section border-y border-white/[0.06] bg-white/[0.015]"
      >
        <div className="container">
          <div className="section-heading">
            <SectionLabel>A Simpler Experience</SectionLabel>

            <h2 className="section-title">
              Three Steps Toward Better Visibility.
            </h2>

            <p className="section-description">
              Boarvest is being designed to make digital asset
              management more organized and easier to navigate.
              The steps below describe the planned experience,
              not features currently available.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number}>
                <p className="text-sm font-semibold tracking-widest text-emerald-400">
                  STEP {step.number}
                </p>

                <div className="my-5 h-px w-full bg-gradient-to-r from-emerald-400/50 to-transparent" />

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section
        id="markets"
        className="section"
      >
        <div className="container">
          <div className="section-heading">
            <SectionLabel>Market Awareness</SectionLabel>

            <h2 className="section-title">
              Information Before Assumptions.
            </h2>

            <p className="section-description">
              Market information should be clear, timely, and
              traceable to reliable sources. Live prices and
              market indicators will appear here only after
              a suitable data provider has been integrated.
            </p>
          </div>

          <div className="surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="font-semibold">
                  Digital Asset Market Overview
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Live market data is not connected yet.
                </p>
              </div>

              <span className="w-fit rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-3 py-1 text-xs text-amber-200">
                Coming Later
              </span>
            </div>

            <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
              {marketIndicators.map((indicator) => (
                <article
                  key={indicator.title}
                  className="bg-[#111a15] p-6"
                >
                  <p className="text-sm text-gray-400">
                    {indicator.title}
                  </p>

                  <p className="mt-3 text-lg font-semibold">
                    Not Available Yet
                  </p>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    {indicator.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security and Risk */}
      <section
        id="security"
        className="section border-y border-white/[0.06] bg-white/[0.015]"
      >
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>
              Security and Responsibility
            </SectionLabel>

            <h2 className="section-title">
              Confidence Starts with Transparency.
            </h2>

            <p className="section-description">
              Digital assets require careful decisions. Boarvest
              is being developed with the goal of communicating
              product capabilities clearly and treating user data
              responsibly. Security measures must be implemented
              and tested before they can be claimed as protections
              offered by the platform.
            </p>
          </div>

          <div className="space-y-4">
            <article className="surface flex gap-4 p-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-lg text-emerald-300"
              >
                ✓
              </span>

              <div>
                <h3 className="font-semibold">
                  Transparency First
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-400">
                  Product capabilities, fees, and security
                  information should be communicated accurately
                  and supported by evidence.
                </p>
              </div>
            </article>

            <article className="surface flex gap-4 p-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-lg text-amber-200"
              >
                !
              </span>

              <div>
                <h3 className="font-semibold">
                  Understand the Risks
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-400">
                  Cryptocurrency values can change significantly.
                  No investment return is guaranteed, and you may
                  lose some or all of your invested capital.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section
        id="faq"
        className="section"
      >
        <div className="container">
          <div className="section-heading">
            <SectionLabel>
              Frequently Asked Questions
            </SectionLabel>

            <h2 className="section-title">
              Good Questions Deserve Clear Answers.
            </h2>

            <p className="section-description">
              Learn about the Boarvest vision, planned features,
              and the current limitations of this website.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="surface group p-5 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium marker:hidden">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-emerald-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section
        id="get-started"
        className="pb-20 sm:pb-24"
      >
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.12] via-[#101a14] to-[#11100d] p-7 sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-400/[0.08] blur-3xl"
            />

            <div className="relative z-10 max-w-2xl">
              <SectionLabel>
                The Journey Starts Here
              </SectionLabel>

              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                A Clearer View of Your Digital Asset Journey.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                Explore the Boarvest vision and follow the
                development of an investor-focused crypto
                management experience.
              </p>

              <a
                href="#features"
                className="button button-primary mt-8"
              >
                Explore Our Features
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black/20">
        <div className="container py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <a
                href="#home"
                aria-label="Boarvest homepage"
                className="inline-flex items-center gap-3"
              >
                <Image
                  src="/image/boarvest-logo.png"
                  alt="Boarvest boar logo"
                  width={44}
                  height={44}
                  className="h-10 w-10 shrink-0 object-contain"
                />

                <span className="text-xl font-bold tracking-tight">
                  Boar<span className="text-emerald-400">vest</span>
                </span>
              </a>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                A developing digital asset management experience
                built around visibility, clarity, and responsible
                decision-making.
              </p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400"
            >
              <a
                href="#about"
                className="transition-colors hover:text-white"
              >
                About
              </a>

              <a
                href="#features"
                className="transition-colors hover:text-white"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="transition-colors hover:text-white"
              >
                How It Works
              </a>

              <a
                href="#markets"
                className="transition-colors hover:text-white"
              >
                Markets
              </a>

              <a
                href="#security"
                className="transition-colors hover:text-white"
              >
                Security
              </a>

              <a
                href="#faq"
                className="transition-colors hover:text-white"
              >
                FAQ
              </a>
            </nav>
          </div>

          <hr className="divider my-8" />

          <div className="flex flex-col gap-3 text-xs leading-6 text-gray-500 sm:flex-row sm:items-start sm:justify-between">
            <p>
              © 2026 Boarvest. All rights reserved.
            </p>

            <p className="max-w-xl sm:text-right">
              Cryptocurrency investments involve risk and may result
              in the loss of capital. Nothing on this page constitutes
              personalized financial advice or a guarantee of returns.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}