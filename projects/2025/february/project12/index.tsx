import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface ScrollIndicatorContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollIndicatorContainer = ({
  children,
  className,
}: ScrollIndicatorContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = container;

    const maxScroll = scrollHeight - clientHeight;
    setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
  };

  return (
    <div className={cn("relative w-full h-full space-y-2", className)}>
      <div className="w-full bg-gray-200 relative h-2">
        <div
          className={cn(
            `bg-green-400 transition-all duration-50 h-full`,
          )}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div onScroll={handleScroll} ref={containerRef} className="overflow-auto w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default function Project12() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Scroll Indicator</h2>
      <ScrollIndicatorContainer className="h-96 border rounded-md p-2">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-16 grid place-content-center border">
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollIndicatorContainer>
    </div>
  );
}
