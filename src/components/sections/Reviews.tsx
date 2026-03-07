import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-primary-800 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Відгуки клієнтів"
          subtitle="Що кажуть про мою роботу"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-primary-900 p-6"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < review.rating
                        ? "fill-accent-400 text-accent-400"
                        : "text-primary-700"
                    }
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mb-4 text-text-300">{review.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-500/20" />
                <div>
                  <p className="font-medium text-text-50">{review.name}</p>
                  <p className="text-xs text-text-400">
                    {new Date(review.date).toLocaleDateString("uk-UA", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
