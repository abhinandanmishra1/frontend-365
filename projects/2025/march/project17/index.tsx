import React, { useState } from "react";

type TooltipVariant = "default" | "info" | "success" | "warning" | "error";

interface TooltipProps {
  children: React.ReactNode;
  description: string;
  variant?: TooltipVariant;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ 
  description, 
  children, 
  variant = "default", 
  position = "bottom" 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const variantStyles = {
    default: "bg-gray-800 text-white",
    info: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-600 text-white",
  };

  const positionStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div 
      className="relative inline-flex items-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="flex items-center">
        {children}
      </div>
      
      {isVisible && (
        <div className={`absolute z-10 ${positionStyles[position]} min-w-max max-w-xs px-3 py-2 ${variantStyles[variant]} text-sm rounded shadow-lg`}>
          {description}
        </div>
      )}
    </div>
  );
};

export default function Project17() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Tooltip Examples</h1>
      
      <div className="flex flex-wrap gap-4">
        <Tooltip description="This is a default tooltip" position="top">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Default Tooltip
          </button>
        </Tooltip>

        <Tooltip description="This provides helpful information" variant="info" position="bottom">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Info Tooltip
          </button>
        </Tooltip>

        <Tooltip description="Operation completed successfully" variant="success" position="right">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Success Tooltip
          </button>
        </Tooltip>

        <Tooltip description="Proceed with caution" variant="warning" position="left">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded">
            Warning Tooltip
          </button>
        </Tooltip>

        <Tooltip description="An error has occurred" variant="error">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Error Tooltip
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
