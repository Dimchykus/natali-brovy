"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems } from "@/data/gallery";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAfter, setShowAfter] = useState(true);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setShowAfter(true);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? galleryItems.length - 1 : selectedIndex - 1,
      );
      setShowAfter(true);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === galleryItems.length - 1 ? 0 : selectedIndex + 1,
      );
      setShowAfter(true);
    }
  };

  return (
    <section id="gallery" className="bg-primary-900 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Галерея робіт"
          // subtitle="Результати моєї роботи: до та після"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-primary-800"
            >
              <Image
                src={item.afterImage}
                alt={item.title}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-primary-950/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="rounded-full bg-accent-500 px-4 py-2 text-sm font-medium text-white">
                  Переглянути
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/95 p-4">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 text-text-300 transition-colors hover:text-text-50"
            aria-label="Закрити"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-text-300 transition-colors hover:text-text-50"
            aria-label="Попереднє"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image container */}
          <div className="max-h-[80vh] max-w-4xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary-800">
              <Image
                src={showAfter ? galleryItems[selectedIndex].afterImage : galleryItems[selectedIndex].beforeImage}
                alt={galleryItems[selectedIndex].title}
                fill
                className="object-cover"
              />
            </div>

            {/* Toggle buttons */}
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowAfter(false)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  !showAfter
                    ? "bg-accent-500 text-white"
                    : "bg-primary-700 text-text-300 hover:bg-primary-600"
                }`}
              >
                До
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  showAfter
                    ? "bg-accent-500 text-white"
                    : "bg-primary-700 text-text-300 hover:bg-primary-600"
                }`}
              >
                Після
              </button>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-4 text-text-300 transition-colors hover:text-text-50"
            aria-label="Наступне"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
