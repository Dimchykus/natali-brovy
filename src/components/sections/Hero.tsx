import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-800 to-primary-900 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />

        {/* Animated floating orbs */}
        <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-accent-500/5 blur-3xl" style={{ animation: 'drift 10s ease-in-out infinite' }} />
        <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl" style={{ animation: 'drift 14s ease-in-out infinite 2s' }} />
        <div className="absolute top-2/3 left-1/2 h-48 w-48 rounded-full bg-accent-400/8 blur-2xl" style={{ animation: 'drift 12s ease-in-out infinite 4s' }} />

        {/* Moving particles */}
        {[
          { top: '15%', left: '10%', delay: '0s',   size: 'h-1.5 w-1.5', drift: 'particle-drift-1', dur: '8s' },
          { top: '25%', left: '85%', delay: '1s',   size: 'h-2 w-2',     drift: 'particle-drift-2', dur: '11s' },
          { top: '60%', left: '5%',  delay: '2s',   size: 'h-1 w-1',     drift: 'particle-drift-3', dur: '9s' },
          { top: '75%', left: '90%', delay: '0.5s', size: 'h-1.5 w-1.5', drift: 'particle-drift-4', dur: '13s' },
          { top: '40%', left: '20%', delay: '3s',   size: 'h-1 w-1',     drift: 'particle-drift-5', dur: '10s' },
          { top: '50%', left: '75%', delay: '1.5s', size: 'h-2 w-2',     drift: 'particle-drift-1', dur: '7s' },
          { top: '80%', left: '40%', delay: '2.5s', size: 'h-1.5 w-1.5', drift: 'particle-drift-3', dur: '12s' },
          { top: '10%', left: '60%', delay: '0.8s', size: 'h-1 w-1',     drift: 'particle-drift-2', dur: '9s' },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.size} rounded-full bg-accent-400/60`}
            style={{
              top: p.top,
              left: p.left,
              animation: `${p.drift} ${p.dur} ease-in-out infinite ${p.delay}, twinkle 3s ease-in-out infinite ${p.delay}`,
            }}
          />
        ))}
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
