import React, { useState } from 'react';
import { Star, StarHalf } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RatingProps {
  maxRating?: number;
  initialValue?: number;
  readonly?: boolean;
  allowHalf?: boolean;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  onChange?: (value: number) => void;
  labels?: string[];
  showLabels?: boolean;
}

const Rating = ({
  maxRating = 5,
  initialValue = 0,
  readonly = false,
  allowHalf = false,
  size = 'md',
  activeColor = "text-yellow-400",
  inactiveColor = "text-gray-300",
  className,
  onChange,
  labels,
  showLabels = false,
}: RatingProps) => {
  const [rating, setRating] = useState(initialValue);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeMap = {
    sm: { star: "w-4 h-4", container: "gap-1" },
    md: { star: "w-6 h-6", container: "gap-1.5" },
    lg: { star: "w-8 h-8", container: "gap-2" }
  };

  const handleClick = (value: number) => {
    if (readonly) return;

    const newRating = value;
    setRating(newRating);
    onChange?.(newRating);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (readonly) return;
    
    if (allowHalf) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const position = (event.clientX - left) / width;
      
      // If cursor is on the left half of the star
      if (position <= 0.5) {
        setHoveredRating(index + 0.5);
      } else {
        setHoveredRating(index + 1);
      }
    } else {
      setHoveredRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const getLabel = (value: number) => {
    if (labels && labels.length >= maxRating) {
      return labels[Math.ceil(value) - 1];
    }
    
    const defaultLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
    return defaultLabels[Math.min(Math.ceil(value) - 1, 4)] || "";
  };

  const renderStar = (index: number) => {
    const activeValue = hoveredRating || rating;
    let fillPercentage = 0;

    if (index < Math.floor(activeValue)) {
      fillPercentage = 100; 
    } else if (index === Math.floor(activeValue) && !Number.isInteger(activeValue)) {
      fillPercentage = 50; 
    }

    return (
      <div
        key={index}
        className={cn("relative cursor-pointer", readonly && "cursor-default")}
        onClick={() => handleClick(index + 1)}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <TooltipProvider>
          <Tooltip open={showTooltip && !readonly && hoveredRating === index + 1}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Star className={cn(sizeMap[size].star, inactiveColor)} />
                
                {fillPercentage > 0 && (
                  <>
                    {fillPercentage === 50 ? (
                      <StarHalf className={cn(sizeMap[size].star, activeColor, "absolute top-0 left-0")} />
                    ) : (
                      <Star className={cn(sizeMap[size].star, activeColor, "absolute top-0 left-0")} />
                    )}
                  </>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {getLabel(index + 1)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  const starIndices = Array.from({ length: maxRating }, (_, i) => i);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        className={cn(
          "flex items-center", 
          sizeMap[size].container,
          readonly ? "cursor-default" : "cursor-pointer"
        )}
        onMouseLeave={handleMouseLeave}
      >
        {starIndices.map(renderStar)}
      </div>
      
      {showLabels && (
        <div className="mt-2 text-sm text-gray-600">
          {rating > 0 ? getLabel(rating) : "No rating"}
        </div>
      )}
    </div>
  );
};

interface RatingFormProps extends Omit<RatingProps, 'onChange'> {
  onSubmit?: (value: number) => void;
  submitLabel?: string;
  showFeedbackInput?: boolean;
  placeholderText?: string;
}

const RatingForm = ({
  onSubmit,
  submitLabel = "Submit Rating",
  showFeedbackInput = false,
  placeholderText = "Tell us more about your experience...",
  ...ratingProps
}: RatingFormProps) => {
  const [currentRating, setCurrentRating] = useState(ratingProps.initialValue || 0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (value: number) => {
    setCurrentRating(value);
  };

  const handleSubmit = () => {
    if (currentRating > 0) {
      onSubmit?.(currentRating);
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow-sm">
      {submitted ? (
        <div className="flex flex-col items-center text-center space-y-3 py-6">
          <div className="text-green-500">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-lg font-medium">Thank you for your feedback!</h3>
          <p className="text-gray-500">Your rating has been submitted successfully.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-3">How would you rate your experience?</h3>
            <Rating
              {...ratingProps}
              onChange={handleRatingChange}
              showLabels={true}
              className="mx-auto"
            />
          </div>
          
          {showFeedbackInput && (
            <div>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder={placeholderText}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          )}
          
          <Button 
            onClick={handleSubmit}
            disabled={currentRating === 0}
            className="w-full"
          >
            {submitLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default function Project31() {
  const [basicRating, setBasicRating] = useState(0);
  const [halfStarRating, setHalfStarRating] = useState(2.5);
  
  const handleFormSubmit = (value: number) => {
    console.log("Form submitted with rating:", value);
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Rating</h2>
            <Rating 
              initialValue={basicRating} 
              onChange={setBasicRating} 
              showLabels={true}
            />
            <div className="mt-4 text-sm text-gray-500">
              Selected rating: {basicRating}
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Half Star Rating</h2>
            <Rating 
              initialValue={halfStarRating} 
              onChange={setHalfStarRating} 
              allowHalf={true}
              showLabels={true}
            />
            <div className="mt-4 text-sm text-gray-500">
              Selected rating: {halfStarRating}
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Custom Colors</h2>
            <div className="space-y-4">
              <Rating 
                initialValue={4} 
                readonly={true} 
                activeColor="text-purple-500" 
                size="lg"
              />
              <Rating 
                initialValue={3} 
                readonly={true} 
                activeColor="text-pink-500" 
                size="md"
              />
              <Rating 
                initialValue={2} 
                readonly={true} 
                activeColor="text-blue-500" 
                size="sm"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sizes</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-12 text-sm text-gray-500">Small:</span>
                <Rating initialValue={3.5} size="sm" readonly={true} allowHalf={true} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-12 text-sm text-gray-500">Medium:</span>
                <Rating initialValue={3.5} size="md" readonly={true} allowHalf={true} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-12 text-sm text-gray-500">Large:</span>
                <Rating initialValue={3.5} size="lg" readonly={true} allowHalf={true} />
              </div>
            </div>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Custom Labels</h2>
            <Rating 
              initialValue={4} 
              labels={["Terrible", "Bad", "OK", "Good", "Amazing"]} 
              showLabels={true}
            />
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Rating Form</h2>
            <RatingForm 
              initialValue={0}
              maxRating={5}
              size="md"
              onSubmit={handleFormSubmit}
              showFeedbackInput={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Rating, RatingForm };
