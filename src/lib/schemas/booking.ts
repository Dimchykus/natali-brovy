import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Введіть ваше ім'я"),
  phone: z
    .string()
    .min(10, "Введіть номер телефону")
    .regex(/^[\d\s+()-]{10,}$/, "Невірний формат телефону"),
  email: z.string().email("Невірний формат email"),
  service: z.string().min(1, "Оберіть послугу"),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
