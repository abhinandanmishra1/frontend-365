import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const ScrollSnapCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { color: "bg-pink-500", text: "Section 1" },
    { color: "bg-blue-400", text: "Section 2" },
    { color: "bg-green-500", text: "Section 3" },
    { color: "bg-orange-500", text: "Section 4" },
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideWidth = container.clientWidth;
      const scrollPosition = container.scrollLeft;
      const newActiveSlide = Math.round(scrollPosition / slideWidth);
      setActiveSlide(newActiveSlide);
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    container.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      if (container) {
        container.removeEventListener('scroll', debouncedHandleScroll);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setActiveSlide(Math.max(0, activeSlide - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setActiveSlide(Math.min(slides.length - 1, activeSlide + 1));
    }
  };

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((slide, index) => (
          <section
            key={index}
            className={cn(
              "flex-none w-full h-96 snap-start flex items-center justify-center text-white text-2xl font-bold",
              slide.color
            )}
          >
            {slide.text}
          </section>
        ))}
      </div>

      <button
        onClick={() => scrollTo("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
        disabled={activeSlide === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scrollTo("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
        disabled={activeSlide === slides.length - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={cn("w-3 h-3 rounded-full transition-colors", {
              "bg-gray-300": activeSlide !== index,
              "bg-gray-800": activeSlide === index,
            })}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Project18() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <ScrollSnapCarousel />
    </div>
  );
}   