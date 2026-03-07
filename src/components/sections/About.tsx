import { Award, Users, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { icon: Calendar, value: "5+", label: "Років досвіду" },
  { icon: Users, value: "2000+", label: "Задоволених клієнтів" },
  { icon: Award, value: "15+", label: "Сертифікатів" },
];

export default function About() {
  return (
    <section id="about" className="bg-primary-900 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Про мене"
          subtitle="Познайомтесь з майстром"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800">
              <div className="flex h-full items-center justify-center text-text-400">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-accent-500/20" />
                  <p className="text-sm">Фото майстра</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-accent-500/30" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-text-50 md:text-3xl">
              Привіт, я Natali!
            </h3>
            <div className="space-y-4 text-text-300">
              <p>
                Я сертифікований бровіст з понад 5-річним досвідом роботи.
                Моя пристрасть — створювати брови, які ідеально підходять
                саме вам, враховуючи форму обличчя та індивідуальні особливості.
              </p>
              <p>
                Постійно вдосконалюю свої навички, відвідуючи майстер-класи
                та курси від провідних спеціалістів галузі. Використовую
                тільки професійну косметику преміум-класу.
              </p>
              <p>
                Мій підхід — це не просто процедура, а повний догляд та
                консультація. Я допоможу вам підібрати ідеальну форму
                та колір брів, навчу правильному догляду вдома.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-primary-800 p-4 text-center"
                >
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-accent-400" />
                  <div className="text-2xl font-bold text-text-50">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
