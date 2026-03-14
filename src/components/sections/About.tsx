"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useGSAPContext } from "@/lib/providers/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate heading first
      tl.fromTo(
        ".about-heading",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Image slides in from left
      tl.fromTo(
        ".about-image",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );

      // Animate title
      tl.fromTo(
        ".about-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );

      // Content paragraphs stagger in
      tl.fromTo(
        ".about-text p",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] }
  );

  const initialClass = prefersReducedMotion ? "" : "opacity-0";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-primary-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className={`about-heading ${initialClass}`}>
          <SectionHeading title="Про мене" subtitle="Познайомтесь з майстром" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className={`about-image relative ${initialClass}`}>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/post-photo.png"
                alt="Natali — Eyebrow Specialist"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -top-4 -left-4 -z-10 rounded-2xl border-2 border-accent-500/30" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h3 className={`about-title mb-6 text-2xl font-bold text-text-50 md:text-3xl ${initialClass}`}>
              Привіт, я Наталі!
            </h3>
            <div className="about-text space-y-4 text-text-300 leading-relaxed">
              <p className={initialClass}>
                За освітою я історик і археолог, а працюю копірайтером. Проте ще
                з підліткового віку мене приваблювала б&apos;юті-сфера — мабуть, не в
                останню чергу завдяки двом старшим сестрам
              </p>
              <p className={initialClass}>
                Пам&apos;ятаю, як у 14 років хотіла зробити собі перфектні броус… і
                в результаті просто їх постригла. Це був мій перший б&apos;юті-фейл.
                Болісний, але показовий: найкраще ми вчимося саме на своїх
                помилках.
              </p>
              <p className={initialClass}>
                З часом мій інтерес тільки ріс. Я дивилась туторіали, вивчала
                техніки, і в якийсь момент зрозуміла — хочу займатись цим більш
                серйозно. Було багато сумнівів: чи вийде, чи встигну поєднувати
                з основною роботою, чи це взагалі моє. Але одного дня сказала
                собі <em>just do it</em> — і почала.
              </p>
              <p className={initialClass}>
                Я пройшла інтенсивне навчання, набила практику і зараз роблю
                свої перші кроки як броу-майстер. Розумію, багато хто вже має
                свого спеціаліста. Але хтось ще в пошуках <em>the one</em> —
                уважного, відповідального й того, хто вміє підкреслити
                індивідуальність.
              </p>
              <p className={`text-accent-400 font-medium ${initialClass}`}>
                І, можливо, саме я стану тією, хто зробить твої бровки он флік
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
