import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const contactInfo = [
  {
    icon: MapPin,
    label: "Адреса",
    value: "м. Ужгород",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+380 (99) 123-45-67",
    href: "tel:+380991234567",
  },
  {
    icon: Clock,
    label: "Графік роботи",
    value: "Пн-Сб: 10:00 - 20:00",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/natali.brows.art/",
    username: "@natali.brows.art",
  },
  // {
  //   icon: Send,
  //   label: "Telegram",
  //   href: "https://t.me/browart_kyiv",
  //   username: "@browart_kyiv",
  // },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-primary-800 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Контакти"
          subtitle="Зв'яжіться зі мною зручним способом"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Info Cards */}
          {contactInfo.map((item) => (
            <div key={item.label} className="rounded-2xl bg-primary-900 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20">
                <item.icon className="h-6 w-6 text-accent-400" />
              </div>
              <h3 className="mb-2 font-medium text-text-50">{item.label}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-text-300 transition-colors hover:text-accent-400"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-text-300">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 flex flex-col items-center">
          <h3 className="mb-6 text-lg font-medium text-text-50">
            Слідкуйте за мною в соцмережах
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full bg-primary-900 px-6 py-3 text-text-300 transition-colors hover:bg-primary-700 hover:text-accent-400"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.username}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
