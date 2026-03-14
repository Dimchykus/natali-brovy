"use client";

import { useRef } from "react";
import { Clock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { useGSAPContext } from "@/lib/providers/gsap";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      // Animate heading
      gsap.fromTo(
        ".services-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate cards with stagger
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate CTA button
      gsap.fromTo(
        ".services-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-cta",
            start: "top 90%",
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
      id="services"
      className="bg-primary-800 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className={`services-heading ${initialClass}`}>
          <SectionHeading
            title="Послуги та ціни"
            subtitle="Оберіть процедуру, яка підходить саме вам"
          />
        </div>

        <div className="services-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card group rounded-2xl bg-primary-900 p-6 transition-all hover:bg-primary-700 ${initialClass}`}
            >
              <h3 className="mb-3 text-xl font-bold text-text-50">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-text-300">{service.description}</p>
              <div className="flex items-center justify-between border-t border-primary-700 pt-4 group-hover:border-primary-600">
                <div className="flex items-center gap-1.5 text-sm text-text-400">
                  <Clock size={16} />
                  <span>{service.duration}</span>
                </div>
                <div className="text-xl font-bold text-accent-400">
                  {service.price} <span className="text-sm">грн</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#booking"
            className={`services-cta inline-block rounded-full bg-accent-500 px-8 py-3 font-medium text-white transition-colors hover:bg-accent-400 ${initialClass}`}
          >
            Записатись на процедуру
          </a>
        </div>
      </div>
    </section>
  );
}
