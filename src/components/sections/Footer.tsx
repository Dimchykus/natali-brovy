"use client";

import { useRef } from "react";
import { Instagram } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useGSAPContext } from "@/lib/providers/gsap";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/natali.brows.art/",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    },
    { scope: footerRef, dependencies: [isReady, prefersReducedMotion] }
  );

  const initialClass = prefersReducedMotion ? "" : "opacity-0";

  return (
    <footer ref={footerRef} className="bg-primary-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`footer-content flex flex-col items-center justify-between gap-6 border-t border-primary-800 pt-8 md:flex-row ${initialClass}`}
        >
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-text-50">
            <span className="text-accent-500">Natali</span> Brows
          </a>

          {/* Copyright */}
          <p className="text-sm text-text-400">
            &copy; {currentYear} Natali Brows. Всі права захищено.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-text-300 transition-colors hover:bg-accent-500 hover:text-white"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
