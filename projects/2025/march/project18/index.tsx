import { useState } from "react";
type ToggleTipVariant = "default" | "info" | "success" | "warning" | "error";

interface ToggleTipProps {
  children: React.ReactNode;
  description: string;
  variant?: ToggleTipVariant;
  position?: "top" | "bottom" | "left" | "right";
}

const ToggleTip = ({
  children,
  description,
  variant = "default",
  position = "bottom",
}: ToggleTipProps) => {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setShow((show) => !show);
  };

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
    <div>
      <div
        className="relative inline-flex items-center group"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <button className="flex items-center" onClick={toggle}>
          {children}
        </button>

        {show && isVisible && (
          <div
            className={`absolute z-10 ${positionStyles[position]} min-w-max max-w-xs px-3 py-2 ${variantStyles[variant]} text-sm rounded shadow-lg`}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Project18() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="flex flex-wrap gap-4">
        <ToggleTip description="This is a default ToggleTip" position="top">
          <p className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Default ToggleTip
          </p>
        </ToggleTip>

        <ToggleTip
          description="This provides helpful information"
          variant="info"
          position="bottom"
        >
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Info ToggleTip
          </p>
        </ToggleTip>

        <ToggleTip
          description="Operation completed successfully"
          variant="success"
          position="right"
        >
          <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Success ToggleTip
          </p>
        </ToggleTip>

        <ToggleTip
          description="Proceed with caution"
          variant="warning"
          position="left"
        >
          <p className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded">
            Warning ToggleTip
          </p>
        </ToggleTip>

        <ToggleTip description="An error has occurred" variant="error">
          <p className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Error ToggleTip
          </p>
        </ToggleTip>
      </div>
    </div>
  );
}
