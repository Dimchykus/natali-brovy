"use client";

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function getAnimationConfig(prefersReducedMotion: boolean) {
  return {
    duration: prefersReducedMotion ? 0 : 0.6,
    stagger: prefersReducedMotion ? 0 : 0.1,
    y: prefersReducedMotion ? 0 : 30,
  };
}
