import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-800 to-primary-900 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <p className="mb-4 text-sm uppercase tracking-widest text-accent-400">
          Бровіст | Київ
        </p>
        <h1 className="mb-6 text-4xl font-bold text-text-50 md:text-6xl lg:text-7xl">
          <span className="text-accent-500">Natali</span>
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-lg text-text-300 md:text-xl">
          Створюю ідеальні брови, що підкреслюють вашу природну красу.
          Професійний підхід та увага до деталей.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#booking"
            className="rounded-full bg-accent-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-accent-400"
          >
            Записатись на процедуру
          </a>
          <a
            href="#services"
            className="rounded-full border border-text-300/30 px-8 py-3 text-lg font-medium text-text-50 transition-colors hover:border-accent-500 hover:text-accent-400"
          >
            Послуги та ціни
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-text-400 transition-colors hover:text-accent-400"
        aria-label="Прокрутити вниз"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
