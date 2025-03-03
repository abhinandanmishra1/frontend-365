import React from "react";

export interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  dot?: boolean;
  count?: number;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  size = "md",
  rounded = false,
  dot = false,
  count,
}) => {
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-cyan-500 text-white",
  };

  // Size styles
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  // Dot only style
  if (dot) {
    const dotSizes = {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
    };

    return (
      <span
        className={`inline-block ${dotSizes[size]} rounded-full ${variantStyles[variant]}`}
      ></span>
    );
  }

  // Count style
  if (count !== undefined) {
    return (
      <span
        className={`inline-flex items-center justify-center ${
          sizeStyles[size]
        } ${variantStyles[variant]} ${
          rounded ? "rounded-full" : "rounded"
        } font-medium`}
      >
        {count > 99 ? "99+" : count}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeStyles[size]} ${
        variantStyles[variant]
      } ${rounded ? "rounded-full" : "rounded"} font-medium`}
    >
      {label}
    </span>
  );
};

export default function Project4(){
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <section className="mb-12">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge label="Primary" variant="primary" />
              <Badge label="Secondary" variant="secondary" />
              <Badge label="Success" variant="success" />
              <Badge label="Danger" variant="danger" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Info" variant="info" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge label="Small" size="sm" />
              <Badge label="Medium" size="md" />
              <Badge label="Large" size="lg" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Rounded</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge label="Square" rounded={false} />
              <Badge label="Rounded" rounded={true} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Dot & Count</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge label="" dot variant="success" />
              <Badge label="" dot variant="danger" />
              <Badge label="" count={5} variant="primary" />
              <Badge label="" count={99} variant="secondary" />
              <Badge label="" count={150} variant="danger" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
