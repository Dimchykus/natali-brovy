import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="bg-primary-900 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Про мене"
          subtitle="Познайомтесь з майстром"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/post-photo.png"
                alt="Natali — Eyebrow Specialist"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-accent-500/30" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-text-50 md:text-3xl">
              Привіт, я Наталі!
            </h3>
            <div className="space-y-4 text-text-300 leading-relaxed">
              <p>
                За освітою я історик і археолог, а працюю копірайтером. Проте ще
                з підліткового віку мене приваблювала б'юті-сфера — мабуть, не в
                останню чергу завдяки двом старшим сестрам 😅
              </p>
              <p>
                Пам'ятаю, як у 14 років хотіла зробити собі перфектні броус… і
                в результаті просто їх постригла. Це був мій перший б'юті-фейл.
                Болісний, але показовий: найкраще ми вчимося саме на своїх
                помилках.
              </p>
              <p>
                З часом мій інтерес тільки ріс. Я дивилась туторіали, вивчала
                техніки, і в якийсь момент зрозуміла — хочу займатись цим більш
                серйозно. Було багато сумнівів: чи вийде, чи встигну поєднувати
                з основною роботою, чи це взагалі моє. Але одного дня сказала
                собі <em>just do it</em> — і почала.
              </p>
              <p>
                Я пройшла інтенсивне навчання, набила практику і зараз роблю
                свої перші кроки як броу-майстер. Розумію, багато хто вже має
                свого спеціаліста. Але хтось ще в пошуках <em>the one</em> —
                уважного, відповідального й того, хто вміє підкреслити
                індивідуальність.
              </p>
              <p className="text-accent-400 font-medium">
                І, можливо, саме я стану тією, хто зробить твої бровки он флік ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
