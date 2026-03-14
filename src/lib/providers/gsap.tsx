"use client";

import { createContext, useContext, useLayoutEffect, useEffect, useState, ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Register plugins immediately
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Configure GSAP defaults immediately
  gsap.config({
    autoSleep: 60,
    force3D: true,
  });

  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
  });

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

interface GSAPContextValue {
  isReady: boolean;
  prefersReducedMotion: boolean;
  lenis: Lenis | null;
}

const GSAPContext = createContext<GSAPContextValue>({
  isReady: false,
  prefersReducedMotion: false,
  lenis: null,
});

export function useGSAPContext() {
  return useContext(GSAPContext);
}

interface GSAPProviderProps {
  children: ReactNode;
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function GSAPProvider({ children }: GSAPProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      // Disable/enable Lenis based on motion preference
      if (lenisRef.current) {
        if (e.matches) {
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    // Initialize Lenis smooth scroll (skip if reduced motion preferred)
    if (!mediaQuery.matches) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Mark as ready immediately
    setIsReady(true);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <GSAPContext.Provider value={{ isReady, prefersReducedMotion, lenis: lenisRef.current }}>
      {children}
    </GSAPContext.Provider>
  );
}
