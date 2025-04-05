import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { TouchEvent, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SwipeableProps {
  items: {
    id: string;
    title: string;
    description: string;
    category: string;
  }[];
}

const SwipeAble: React.FC<SwipeableProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance required (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div className="w-full max-w-md mx-auto" style={{
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
    }}>
      <div 
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative"
        style={{
            scrollSnapAlign: 'start',
        }}
      >
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{currentItem.title}</CardTitle>
              <Badge variant="outline">{currentItem.category}</Badge>
            </div>
            <CardDescription>Card {currentIndex + 1} of {items.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{currentItem.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={goPrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={goNext}
              disabled={currentIndex === items.length - 1}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-center mt-4 gap-1">
        {items.map((_, index) => (
          <div 
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function Project4() {
  // Sample data for the swipeable cards
  const cardItems = [
    {
      id: "1",
      title: "Getting Started",
      description: "Learn the basics of our platform and how to navigate through its features.",
      category: "Beginner"
    },
    {
      id: "2",
      title: "Advanced Techniques",
      description: "Take your skills to the next level with these advanced techniques and strategies.",
      category: "Advanced"
    },
    {
      id: "3",
      title: "Tips & Tricks",
      description: "Discover hidden features and shortcuts to improve your workflow efficiency.",
      category: "Intermediate"
    },
    {
      id: "4",
      title: "Case Studies",
      description: "Real-world examples of how our platform has helped businesses succeed.",
      category: "Examples"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <p className="text-gray-500 mb-8">A demonstration of a swipeable card component using shadcn UI elements and TypeScript</p>
      
      <SwipeAble items={cardItems} />
    </div>
  );
}
