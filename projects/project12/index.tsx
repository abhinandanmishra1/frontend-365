import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import React from "react";
import { cn } from "@/lib/utils";

interface CarouselOptions {
  totalSlides: number;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

export const useCarousel = ({
  totalSlides,
  autoPlay = true,
  interval = 5000,
  loop = true,
}: CarouselOptions) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const intervalId = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(intervalId);
  }, [activeIndex, autoPlay, interval]);

  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 750);
    }
  };

  const next = () => {
    if (!isTransitioning) {
      if (activeIndex === totalSlides - 1 && !loop) return;
      goToSlide((activeIndex + 1) % totalSlides);
    }
  };

  const previous = () => {
    if (!isTransitioning) {
      if (activeIndex === 0 && !loop) return;
      goToSlide((activeIndex - 1 + totalSlides) % totalSlides);
    }
  };

  return {
    activeIndex,
    isTransitioning,
    goToSlide,
    next,
    previous,
  };
};

// Base Carousel Component
interface BaseCarouselProps {
  slides: any[];
  renderSlide: (slide: any, index: number, activeIndex: number) => ReactNode;
  renderControls?: (props: CarouselControlProps) => ReactNode;
  renderIndicators?: (props: CarouselControlProps) => ReactNode;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

export interface CarouselControlProps {
  activeIndex: number;
  totalSlides: number;
  next: () => void;
  previous: () => void;
  goToSlide: (index: number) => void;
  isTransitioning: boolean;
}

export const BaseCarousel: React.FC<BaseCarouselProps> = ({
  slides,
  renderSlide,
  renderControls,
  renderIndicators,
  autoPlay = true,
  interval = 5000,
  loop = true,
}) => {
  const { activeIndex, isTransitioning, goToSlide, next, previous } =
    useCarousel({
      totalSlides: slides.length,
      autoPlay,
      interval,
      loop,
    });

  const controlProps: CarouselControlProps = {
    activeIndex,
    totalSlides: slides.length,
    next,
    previous,
    goToSlide,
    isTransitioning,
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative h-full">
        {slides.map((slide, index) => renderSlide(slide, index, activeIndex))}

        {renderControls && renderControls(controlProps)}
        {renderIndicators && renderIndicators(controlProps)}
      </div>
    </div>
  );
};

// Common Controls Components
const DefaultControls: React.FC<CarouselControlProps> = ({
  previous,
  next,
}) => (
  <>
    <button
      onClick={previous}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <button
      onClick={next}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </>
);

const DefaultIndicators: React.FC<CarouselControlProps> = ({
  activeIndex,
  totalSlides,
  goToSlide,
}) => (
  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          index === activeIndex ? "w-4 bg-blue-500" : "bg-gray-500"
        }`}
      />
    ))}
  </div>
);

// 1. Card Carousel Implementation
const CardCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Mountain Escape",
      description: "Discover natural beauty",
      imageUrl: "https://placehold.co/800x500",
    },
    {
      id: 2,
      title: "Urban Adventure",
      description: "Experience city life",
      imageUrl: "https://placehold.co/800x500",
    },
    {
      id: 3,
      title: "Coastal Dreams",
      description: "Relax by the shore",
      imageUrl: "https://placehold.co/800x500",
    },
  ];

  const renderSlide = (slide: any, index: number, activeIndex: number) => (
    <div
      key={slide.id}
      className="absolute w-full transition-all duration-500"
      style={{
        transform: `translateX(${(index - activeIndex) * 100}%)`,
        opacity: index === activeIndex ? 1 : 0.5,
      }}
    >
      <div className="mx-auto max-w-lg">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
            <p className="text-gray-600">{slide.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden relative w-[70%] my-0 mx-auto h-[500px]">
      <BaseCarousel
        slides={slides}
        renderSlide={renderSlide}
        renderControls={DefaultControls}
        renderIndicators={DefaultIndicators}
      />
    </div>
  );
};

// 2. Full-Screen Carousel Implementation
const FullScreenCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Explore New Horizons",
      subtitle: "Begin your journey today",
      imageUrl: "https://placehold.co/1920x1080",
    },
    {
      id: 2,
      title: "Discover Your Path",
      subtitle: "Adventure awaits",
      imageUrl: "https://placehold.co/1920x1080",
    },
    {
      id: 3,
      title: "Embrace the Unknown",
      subtitle: "Create lasting memories",
      imageUrl: "https://placehold.co/1920x1080",
    },
  ];

  const renderSlide = (slide: any, index: number, activeIndex: number) => (
    <div
      key={slide.id}
      className={`absolute w-full rounded-lg h-full transition-all duration-700 ease-in-out ${
        index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
      }`}
    >
      <img
        src={slide.imageUrl}
        alt={slide.title}
        className="absolute rounded-lg w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h2
          className={`text-5xl font-bold mb-4 transition-all duration-700 transform
          ${
            index === activeIndex
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {slide.title}
        </h2>
        <p
          className={`text-xl transition-all duration-700 delay-100 transform
          ${
            index === activeIndex
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {slide.subtitle}
        </p>
      </div>
    </div>
  );

  const FullscreenControls: React.FC<CarouselControlProps> = ({
    previous,
    next,
  }) => (
    <>
      <button
        onClick={previous}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </>
  );

  return (
    <div className="overflow-hidden relative h-screen w-full">
      <BaseCarousel
        slides={slides}
        renderSlide={renderSlide}
        renderControls={FullscreenControls}
        renderIndicators={DefaultIndicators}
        interval={6000}
      />
    </div>
  );
};

// 3. Normal Carousel Implementation
const Carousel = () => {
  const images = [
    { id: 1, url: "https://picsum.photos/200/300" },
    { id: 2, url: "https://picsum.photos/200/301" },
    { id: 3, url: "https://picsum.photos/200/302" },
  ];

  const renderSlide = (slide: typeof images[0], index: number, activeIndex: number) => (
    <img
      key={slide.id}
      src={slide.url}
      alt={`Image ${slide.id}`}
      className={cn(
        "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-800 rounded-lg",
        {
          "opacity-0": activeIndex !== index,
          "opacity-100": activeIndex === index,
        }
      )}
    />
  );

  const CustomControls: React.FC<CarouselControlProps> = ({
    previous,
    next,
  }) => (
    <>
      <button className="absolute top-[50%] -left-7 translate-y-[-50%] cursor-pointer hover:text-gray-500">
        <ChevronLeft
          className="w-6 h-6"
          onClick={previous}
        />
      </button>
      <button className="absolute top-[50%] -right-7 translate-y-[-50%] cursor-pointer hover:text-gray-500">
        <ChevronRight
          className="w-6 h-6"
          onClick={next}
        />
      </button>
    </>
  );

  const CustomIndicators: React.FC<CarouselControlProps> = ({
    activeIndex,
    totalSlides,
    goToSlide,
  }) => (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-2 h-2 rounded-full",
            index === activeIndex ? "bg-blue-500" : "bg-gray-300"
          )}
          onClick={() => goToSlide(index)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[400px] h-[300px] flex flex-col gap-2 items-center">
        <BaseCarousel
          slides={images}
          renderSlide={renderSlide}
          renderControls={CustomControls}
          renderIndicators={CustomIndicators}
          autoPlay={true}
          interval={3000}
          loop={true}
        />
      </div>
    </div>
  );
};

export default function Project12() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 12</h1>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold">Normal Carousel</h2>
        <Carousel />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold">Card Carousel</h2>
        <CardCarousel />
      </div>
     
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold">Fullscreen Carousel</h2>
        <FullScreenCarousel />
      </div>
    </div>
  );
}
