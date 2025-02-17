import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface ImageComparisonSliderProps {
  image1: string;
  image2: string;
  className?: string;
}

const ImageComparisonSlider = ({
  image1,
  image2,
  className,
}: ImageComparisonSliderProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;

      setPosition(percentage);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleClick = (e: any) => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setPosition(percentage);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-96 w-full overflow-hidden rounded-lg border shadow-sm",
        className
      )}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          backgroundImage: `url(${image2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
        style={{ left: `${position}%` }}
        onMouseDown={() => setIsResizing(true)}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center bg-white rounded-full p-1 shadow-md">
          <ChevronLeft className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default function Project17() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Comparison Slider</h1>
      <ImageComparisonSlider
        image1="https://abhicdn.netlify.app/images/500_DAYS_BADGE.png"
        image2="https://abhicdn.netlify.app/images/365_DAYS_BADGE.png"
        className="aspect-video"
      />
    </div>
  );
}
