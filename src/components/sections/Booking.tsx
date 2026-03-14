"use client";

import { useState, useRef } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { BookingFormData } from "@/types";
import { createBooking } from "@/lib/actions/booking";
import { useGSAPContext } from "@/lib/providers/gsap";

export default function Booking() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useGSAPContext();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      // Animate heading
      gsap.fromTo(
        ".booking-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".booking-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate form
      gsap.fromTo(
        ".booking-form",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".booking-form",
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] }
  );

  const initialClass = prefersReducedMotion ? "" : "opacity-0";

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введіть ваше ім'я";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введіть номер телефону";
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Введіть email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.service) {
      newErrors.service = "Оберіть послугу";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      await createBooking(formData);
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Помилка відправки. Спробуйте ще раз."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="bg-primary-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <div className={`booking-heading ${initialClass}`}>
          <SectionHeading
            title="Записатись на процедуру"
            subtitle="Заповніть форму і я зв'яжусь з вами для підтвердження"
          />
        </div>

        {isSuccess ? (
          <div className="rounded-2xl bg-green-500/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-text-50">
              Заявку відправлено!
            </h3>
            <p className="text-text-300">
              Дякую за звернення! Я зв&apos;яжусь з вами найближчим часом.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`booking-form space-y-6 ${initialClass}`}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-text-300"
              >
                Ваше ім&apos;я *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-primary-800 px-4 py-3 text-text-50 placeholder-text-400 outline-none transition-colors focus:border-accent-500 ${
                  errors.name ? "border-red-500" : "border-primary-700"
                }`}
                placeholder="Анна"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-text-300"
              >
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-primary-800 px-4 py-3 text-text-50 placeholder-text-400 outline-none transition-colors focus:border-accent-500 ${
                  errors.phone ? "border-red-500" : "border-primary-700"
                }`}
                placeholder="+380 XX XXX XX XX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text-300"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-primary-800 px-4 py-3 text-text-50 placeholder-text-400 outline-none transition-colors focus:border-accent-500 ${
                  errors.email ? "border-red-500" : "border-primary-700"
                }`}
                placeholder="anna@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-text-300"
              >
                Оберіть послугу *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-primary-800 px-4 py-3 text-text-50 outline-none transition-colors focus:border-accent-500 ${
                  errors.service ? "border-red-500" : "border-primary-700"
                } ${!formData.service ? "text-text-400" : ""}`}
              >
                <option value="">Оберіть послугу</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title} - {service.price} грн
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-red-400">{errors.service}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-text-300"
              >
                Повідомлення (необов&apos;язково)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-xl border border-primary-700 bg-primary-800 px-4 py-3 text-text-50 placeholder-text-400 outline-none transition-colors focus:border-accent-500"
                placeholder="Додаткова інформація або побажання..."
              />
            </div>

            {/* Submit error */}
            {submitError && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {submitError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-4 font-medium text-white transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Відправляю...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Відправити заявку
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
