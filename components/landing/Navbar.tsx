"use client";

import Image from "next/image";
import { useState } from "react";
import "./Navbar.css";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Overview", href: "#features" },
  { label: "Markets", href: "#markets" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="boarvest-header">
      <nav className="boarvest-navbar">
        <a
          href="#home"
          className="boarvest-brand"
          aria-label="Boarvest home"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/image/boarvest-logo.png"
            alt="Boarvest logo"
            width={42}
            height={42}
            priority
          />

          <span>
            Boar<span className="boarvest-brand-accent">vest</span>
          </span>
        </a>

        <button
          type="button"
          className="boarvest-menu-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="boarvest-dropdown"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className={isOpen ? "menu-line line-one open" : "menu-line line-one"} />
          <span className={isOpen ? "menu-line line-two open" : "menu-line line-two"} />
          <span className={isOpen ? "menu-line line-three open" : "menu-line line-three"} />
        </button>

        {isOpen && (
          <div id="boarvest-dropdown" className="boarvest-dropdown">
            <p className="boarvest-dropdown-heading">NAVIGATION</p>

            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="boarvest-dropdown-link"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div className="boarvest-dropdown-divider" />

            <a
              href="#login"
              className="boarvest-dropdown-login"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </a>

            <a
              href="#signup"
              className="boarvest-dropdown-signup"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}