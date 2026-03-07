"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "Про мене" },
  { href: "#services", label: "Послуги" },
  { href: "#gallery", label: "Галерея" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contact", label: "Контакти" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-primary-700/50 bg-primary-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <a href="#" className="text-xl font-bold text-text-50">
              <span className="text-accent-500">Natali</span> Brows
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-300 transition-colors hover:text-accent-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <a
              href="#booking"
              className="hidden rounded-full bg-accent-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-400 md:block"
            >
              Записатись
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                console.log("isMenuOpen", isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-text-50 md:hidden"
              aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="border-t border-primary-700/50 pb-4 md:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-text-300 transition-colors hover:text-accent-400"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 block rounded-full bg-accent-500 px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-400"
              >
                Записатись
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
