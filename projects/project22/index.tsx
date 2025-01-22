import React from 'react';

interface CircularProgressBarProps {
    size?: number;
    progress?: number;
    strokeWidth?: number;
    showPercentage?: boolean;
    backgroundColor?: string;
    foregroundColor?: string;
    textColor?: string;
    variant?: 'default' | 'gradient' | 'rounded';
}

const CircularProgressBar = ({ 
  size = 250,
  progress = 0,
  strokeWidth = 20,
  showPercentage = false,
  backgroundColor = '#ddd',
  foregroundColor = '#4CAF50',
  textColor = '#000',
  variant = 'default'
}: CircularProgressBarProps) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  // Gradient definition
  const gradientColors = {
    0: '#ff0000',    // Red for low progress
    50: '#ffa500',   // Orange for medium progress
    100: '#4CAF50'   // Green for high progress
  };

  const getStrokeColor = () => {
    if (variant === 'gradient') {
      return 'url(#progressGradient)';
    }
    return foregroundColor;
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {variant === 'gradient' && (
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="50%" stopColor={gradientColors[50]} />
              <stop offset="100%" stopColor={gradientColors[100]} />
            </linearGradient>
          </defs>
        )}
        
        {/* Background circle */}
        <circle
          className="transition-all duration-300"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Foreground circle */}
        <circle
          className="transition-all duration-300 -rotate-90 origin-center"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap={variant === 'rounded' ? 'round' : 'butt'}
        />
      </svg>
      
      {/* Percentage text in the middle */}
      {showPercentage && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: textColor }}
        >
          <span className="text-2xl font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default function Project22() {
  const [progress, setProgress] = React.useState(75);

  return (
    <div className="w-full p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Circular Progress Bar with different Variants</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Default variant */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold">Default</h2>
          <CircularProgressBar 
            progress={progress} 
            size={200}
          />
        </div>

        {/* Gradient variant */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold">Gradient</h2>
          <CircularProgressBar 
            progress={progress}
            size={200}
            variant="gradient"
            showPercentage
          />
        </div>

        {/* Rounded variant */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold">Rounded</h2>
          <CircularProgressBar 
            progress={progress}
            size={200}
            variant="rounded"
            strokeWidth={15}
            foregroundColor="#2196F3"
            showPercentage
          />
        </div>
      </div>

      {/* Progress control */}
      <div className="w-full max-w-md mx-auto">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};
