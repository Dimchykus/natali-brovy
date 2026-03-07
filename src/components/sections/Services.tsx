import { Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="bg-primary-800 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Послуги та ціни"
          subtitle="Оберіть процедуру, яка підходить саме вам"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl bg-primary-900 p-6 transition-all hover:bg-primary-700"
            >
              <h3 className="mb-3 text-xl font-bold text-text-50">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-text-300">
                {service.description}
              </p>
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
            className="inline-block rounded-full bg-accent-500 px-8 py-3 font-medium text-white transition-colors hover:bg-accent-400"
          >
            Записатись на процедуру
          </a>
        </div>
      </div>
    </section>
  );
}
