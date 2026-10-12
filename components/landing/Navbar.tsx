import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Markets", href: "#markets" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  return (
    <header className="glass sticky top-0 z-50 border-x-0 border-t-0">
      <nav
        aria-label="Main navigation"
        className="container flex min-h-[76px] items-center justify-between gap-4"
      >
        {/* Brand */}
        <Link
          href="#home"
          aria-label="Boarvest homepage"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/image/boarvest-logo.png"
            alt="Boarvest boar logo"
            width={44}
            height={44}
            priority
            className="h-10 w-10 shrink-0 object-contain"
          />

          <span className="text-xl font-bold tracking-tight text-white">
            Boar<span className="text-emerald-400">vest</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 text-sm text-gray-400 lg:flex xl:gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <Link
          href="#get-started"
          className="button button-primary min-h-10 shrink-0 px-3 py-2 text-sm sm:px-4"
        >
          <span className="hidden sm:inline">Explore Boarvest</span>
          <span className="sm:hidden">Explore</span>

          <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}