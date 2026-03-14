"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useGSAPContext } from "@/lib/providers/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  // Entrance animation - runs immediately without waiting for isReady
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  // ScrollTrigger animations - wait for isReady
  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      // Layer 1: Fastest moving (furthest back)
      gsap.to(".hero-bg-layer-1", {
        y: -250,
        x: 50,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Layer 2: Medium speed
      gsap.to(".hero-bg-layer-2", {
        y: -150,
        x: -30,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Layer 3: Slowest (closest to viewer)
      gsap.to(".hero-bg-layer-3", {
        y: -80,
        x: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Sparkles scale up and fade as you scroll
      gsap.to(".hero-sparkle", {
        y: -120,
        scale: 1.5,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: 0.5,
        },
      });

      // Hero content parallax - moves up faster with scale
      gsap.to(".hero-content", {
        y: -120,
        scale: 0.95,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 0.3,
        },
      });

      // Scroll indicator fade out faster
      gsap.to(".hero-scroll", {
        y: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [isReady, prefersReducedMotion] }
  );

  const initialOpacity = prefersReducedMotion ? "opacity-100" : "opacity-0";

  // Sparkle dots configuration
  const sparkles = [
    { top: "12%", left: "8%", size: 4, layer: 1 },
    { top: "22%", left: "78%", size: 5, layer: 2 },
    { top: "45%", left: "92%", size: 3, layer: 3 },
    { top: "68%", left: "15%", size: 6, layer: 1 },
    { top: "82%", left: "65%", size: 4, layer: 2 },
    { top: "35%", left: "45%", size: 3, layer: 3 },
    { top: "18%", left: "55%", size: 4, layer: 1 },
    { top: "55%", left: "25%", size: 5, layer: 2 },
    { top: "75%", left: "85%", size: 3, layer: 3 },
    { top: "28%", left: "35%", size: 4, layer: 1 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-primary-800 to-primary-900 px-4"
    >
      {/* Background decoration - no overflow-hidden here to allow parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep background gradient orbs - fastest parallax */}
        <div className="hero-bg-layer-1 absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-3xl will-change-transform" />
        <div className="hero-bg-layer-1 absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-primary-600/30 blur-3xl will-change-transform" />
        <div className="hero-bg-layer-1 absolute top-1/2 left-1/2 h-[600px] w-[600px] -ml-[300px] -mt-[300px] rounded-full bg-accent-500/5 blur-3xl will-change-transform" />

        {/* Mid-layer floating orbs */}
        <div
          className="hero-bg-layer-2 absolute top-[20%] left-[25%] h-80 w-80 rounded-full bg-accent-500/8 blur-3xl will-change-transform"
          style={{ animation: "drift 10s ease-in-out infinite" }}
        />
        <div
          className="hero-bg-layer-2 absolute bottom-[25%] right-[20%] h-72 w-72 rounded-full bg-primary-600/15 blur-3xl will-change-transform"
          style={{ animation: "drift 14s ease-in-out infinite 2s" }}
        />
        <div
          className="hero-bg-layer-2 absolute top-[60%] left-[60%] h-56 w-56 rounded-full bg-accent-400/10 blur-2xl will-change-transform"
          style={{ animation: "drift 12s ease-in-out infinite 4s" }}
        />

        {/* Foreground orbs - slowest parallax */}
        <div
          className="hero-bg-layer-3 absolute top-[15%] right-[30%] h-40 w-40 rounded-full bg-accent-400/12 blur-2xl will-change-transform"
          style={{ animation: "drift 8s ease-in-out infinite 1s" }}
        />
        <div
          className="hero-bg-layer-3 absolute bottom-[35%] left-[15%] h-36 w-36 rounded-full bg-primary-500/15 blur-xl will-change-transform"
          style={{ animation: "drift 9s ease-in-out infinite 3s" }}
        />

        {/* Sparkle dots with layered parallax */}
        {sparkles.map((s, i) => (
          <div
            key={`sparkle-${i}`}
            className={`hero-bg-layer-${s.layer} hero-sparkle absolute rounded-full bg-accent-400 will-change-transform`}
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: `0 0 ${s.size * 2}px ${s.size}px rgba(252, 165, 165, 0.5)`,
            }}
          />
        ))}

      </div>

      {/* Hero content with scroll fade */}
      <div className="hero-content relative z-10 text-center will-change-transform">
        <p
          className={`hero-tagline mb-4 text-sm uppercase tracking-widest text-accent-400 ${initialOpacity}`}
        >
          Бровіст | Ужгород
        </p>
        <h1
          className={`hero-title mb-6 text-4xl font-bold text-text-50 md:text-6xl lg:text-7xl ${initialOpacity}`}
        >
          <span className="text-accent-500">Natali</span>
        </h1>
        <p
          className={`hero-description mx-auto mb-8 max-w-lg text-lg text-text-300 md:text-xl ${initialOpacity}`}
        >
          Створюю ідеальні брови, що підкреслюють вашу природну красу.
          Професійний підхід та увага до деталей.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#booking"
            className={`hero-cta rounded-full bg-accent-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-accent-400 ${initialOpacity}`}
          >
            Записатись на процедуру
          </a>
          <a
            href="#services"
            className={`hero-cta rounded-full border border-text-300/30 px-8 py-3 text-lg font-medium text-text-50 transition-colors hover:border-accent-500 hover:text-accent-400 ${initialOpacity}`}
          >
            Послуги та ціни
          </a>
        </div>
      </div>

      {/* Scroll indicator - use margin instead of translate to avoid GSAP conflict */}
      <a
        href="#about"
        className={`hero-scroll absolute bottom-8 left-1/2 -ml-4 animate-bounce text-text-400 transition-colors hover:text-accent-400 will-change-transform ${initialOpacity}`}
        aria-label="Прокрутити вниз"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
