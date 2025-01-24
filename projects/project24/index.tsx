import {
  CheckCircleIcon,
  Info,
  TriangleAlert,
  XCircleIcon,
  XIcon,
} from "lucide-react";

import { useState } from "react";

interface AlertProps {
  title: string;
  message: string;
  variant?: "filled" | "outlined";
  type: "success" | "error" | "warning" | "info";
  icon?: React.ReactNode;
  color?: string;
  closeable?: boolean;
}

const AlertIcon = ({
  type,
  icon,
  color,
}: Omit<AlertProps, "title" | "message" | "variant">) => {
  if (icon) return <>{icon}</>;

  const iconProps = {
    size: 24,
    className: color ? "" : "text-current",
    color: color,
  };

  switch (type) {
    case "success":
      return <CheckCircleIcon {...iconProps} />;
    case "error":
      return <XCircleIcon {...iconProps} />;
    case "warning":
      return <TriangleAlert {...iconProps} />;
    case "info":
      return <Info {...iconProps} />;
    default:
      return null;
  }
};

export const Alert = ({
  title,
  message,
  type,
  icon,
  variant = "filled",
  color,
  closeable = false,
}: AlertProps) => {
  const [show, setShow] = useState(true);
  const backgroundColors = {
    success: variant === "filled" ? "bg-green-100" : "bg-transparent",
    error: variant === "filled" ? "bg-red-100" : "bg-transparent",
    warning: variant === "filled" ? "bg-yellow-100" : "bg-transparent",
    info: variant === "filled" ? "bg-blue-100" : "bg-transparent",
  };

  const borderColors = {
    success: "border-green-500",
    error: "border-red-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  };

  if (!show) return null;

  return (
    <div
      className={`
      ${backgroundColors[type]} 
      ${borderColors[type]} 
      ${textColors[type]} 
      border-l-4 
      relative
      rounded-r 
      px-4 
      py-3 
      shadow-md 
      flex 
      items-center 
      space-x-4
    `}
    >
      <div className="flex-shrink-0">
        <AlertIcon type={type} icon={icon} color={color} />
      </div>
      <div>
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm">{message}</p>
      </div>
      {closeable && (
        <button className="absolute top-1/2 -translate-y-1/2 right-1" onClick={() => setShow(false)}>
          <XIcon />
        </button>
      )}
    </div>
  );
};

export default function Project24() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <Alert
        title="Success Filled"
        message="This is a filled success message"
        type="success"
        variant="filled"
      />

      <Alert
        title="Success Outlined"
        message="This is an outlined success message"
        type="success"
        variant="outlined"
      />

      <Alert
        title="Error Filled"
        message="This is a filled error message"
        type="error"
        variant="filled"
        closeable
      />

      <Alert
        title="Error Outlined"
        message="This is an outlined error message"
        type="error"
        variant="outlined"
      />

      <Alert
        title="Warning Filled"
        message="This is a filled warning message"
        type="warning"
        variant="filled"
        closeable
      />

      <Alert
        title="Warning Outlined"
        message="This is an outlined warning message"
        type="warning"
        variant="outlined"
      />

      <Alert
        title="Info Filled"
        message="This is a filled info message"
        type="info"
        variant="filled"
      />

      <Alert
        title="Info Outlined"
        message="This is an outlined info message"
        type="info"
        variant="outlined"
        closeable
      />

      <Alert
        title="Custom Alert"
        message="This is an alert with a custom icon and color"
        type="info"
        icon={<span>🚀</span>}
        color="#8A2BE2"
      />
    </div>
  );
}
