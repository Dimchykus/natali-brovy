"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems } from "@/data/gallery";
import { useGSAPContext } from "@/lib/providers/gsap";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      // Animate heading
      gsap.fromTo(
        ".gallery-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate gallery items with stagger
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] }
  );

  const initialClass = prefersReducedMotion ? "" : "opacity-0";

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-primary-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className={`gallery-heading ${initialClass}`}>
          <SectionHeading title="Галерея робіт" />
        </div>

        <div className="gallery-grid grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item relative aspect-square overflow-hidden rounded-xl bg-primary-800 ${initialClass}`}
            >
              <Image
                src={item.afterImage}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
