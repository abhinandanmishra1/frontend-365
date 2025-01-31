import { Star, StarHalf } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface StarRatingProps {
  stars?: number;
  onChange?: (rating: number) => void;
  allowHalf?: boolean;
}

const StarRating = ({
  stars = 5,
  onChange,
  allowHalf = false,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!allowHalf) {
      setHoverRating(index + 1);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    setHoverRating(index + (isHalf ? 0.5 : 1));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!allowHalf) {
      setSelectedRating(index + 1);
      onChange?.(index + 1);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const rating = index + (isHalf ? 0.5 : 1);
    setSelectedRating(rating);
    onChange?.(rating);
  };

  return (
    <div className={cn("relative flex gap-1 p-1")}>
      {/* Filled stars layer */}
      <div className="absolute left-1 top-1 flex gap-1 z-10 pointer-events-none">
        {[...Array(stars)].map((_, i) => {
          const rating = hoverRating || selectedRating;
          const isHalf = rating - i === 0.5;
          const isFull = rating > i;

          return (
            <div key={`star-filled-${i}`} className="relative w-6 h-6">
              {isHalf ? (
                <StarHalf className="absolute w-6 h-6 text-yellow-400 fill-yellow-400" />
              ) : isFull ? (
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ) : (
                <Star className="w-6 h-6 text-gray-300 fill-gray-200" />
              )}
            </div>
          );
        })}
      </div>
      {/* Interactive layer */}
      <div className="flex gap-1">
        {[...Array(stars)].map((_, i) => (
          <div
            key={`star-outline-${i}`}
            className="w-6 h-6 cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={(e) => handleClick(e, i)}
          >
            <Star className="w-6 h-6 text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Project11() {
  const handleRatingChange = (rating: number) => {
    console.log(`Selected rating: ${rating}`);
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold ">Project 11: Star Rating</h2>
      <div className="flex flex-col gap-4 items-start w-full">
        <h1 className="text-base line-clamp-2 font-semibold">
          Fractional Star Rating (0.5, 1.5, 2.5, 3.5, 4.5, 5.5)
        </h1>
        <StarRating stars={5} onChange={handleRatingChange} allowHalf />
      </div>

      <div className="flex flex-col gap-4 items-start w-full">
        <h1 className="text-base line-clamp-2 font-semibold">
          Full Star Rating (0, 1, 2, 3, 4, 5)
        </h1>

        <StarRating stars={5} onChange={handleRatingChange} />
      </div>
    </div>
  );
}
