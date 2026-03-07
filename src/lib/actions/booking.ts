"use server";

import { bookingSchema, type BookingFormData } from "@/lib/schemas/booking";
import { services } from "@/data/services";

export async function createBooking(data: BookingFormData): Promise<{ success: true }> {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const d = parsed.data;

  const service = services.find((s) => s.id === d.service);
  const serviceName = service ? `${service.title} — ${service.price} грн` : d.service;

  const text = [
    "📋 *Нова заявка на процедуру*",
    "",
    `👤 *Ім'я:* ${d.name}`,
    `📞 *Телефон:* ${d.phone}`,
    `📧 *Email:* ${d.email}`,
    `💆 *Послуга:* ${serviceName}`,
    d.message ? `💬 *Повідомлення:* ${d.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram error:", err);
    throw new Error("Помилка відправки. Спробуйте ще раз.");
  }

  return { success: true };
}
