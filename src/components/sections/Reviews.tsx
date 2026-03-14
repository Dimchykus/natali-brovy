"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import { useGSAPContext } from "@/lib/providers/gsap";

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      // Animate heading
      gsap.fromTo(
        ".reviews-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reviews-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate cards with stagger
      gsap.fromTo(
        ".review-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reviews-grid",
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
      id="reviews"
      className="bg-primary-800 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className={`reviews-heading ${initialClass}`}>
          <SectionHeading
            title="Відгуки клієнтів"
            subtitle="Що кажуть про мою роботу"
          />
        </div>

        <div className="reviews-grid grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`review-card rounded-2xl bg-primary-900 p-6 ${initialClass}`}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < review.rating
                        ? "fill-accent-400 text-accent-400"
                        : "text-primary-700"
                    }
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mb-4 text-text-300">{review.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-500/20" />
                <div>
                  <p className="font-medium text-text-50">{review.name}</p>
                  <p className="text-xs text-text-400">
                    {new Date(review.date).toLocaleDateString("uk-UA", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
