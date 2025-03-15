import { CheckCircle, TriangleAlert } from "lucide-react";

import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  startIcon,
  endIcon,
  className = "",
  onClick,
}) => {
  const variantClasses = {
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-indigo-100 text-indigo-800 border-indigo-200",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border",
        variantClasses[variant],
        sizeClasses[size],
        rounded ? "rounded-full" : "rounded-md",
        onClick ? "cursor-pointer hover:opacity-80" : "",
        className
      )}
      onClick={onClick}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </div>
  );
};

export default function Project15() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Tag variant="primary">Primary</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="danger">Danger</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="info">Info</Tag>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Tag size="sm" variant="primary">
            Small
          </Tag>
          <Tag size="md" variant="primary">
            Medium
          </Tag>
          <Tag size="lg" variant="primary">
            Large
          </Tag>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Shapes</h2>
        <div className="flex flex-wrap gap-2">
          <Tag variant="primary">Default</Tag>
          <Tag variant="primary" rounded>
            Rounded
          </Tag>
          <Tag variant="success" rounded>
            Rounded Success
          </Tag>
          <Tag variant="danger" rounded>
            Rounded Danger
          </Tag>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-2">
          <Tag variant="primary" startIcon={<CheckCircle size={14} />}>
            Start Icon
          </Tag>
          <Tag variant="success" endIcon={<CheckCircle size={14} />}>
            End Icon
          </Tag>
          <Tag
            variant="warning"
            rounded
            startIcon={
              <TriangleAlert size={14} className="text-yellow-600" />
            }
          >
            Warning
          </Tag>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Use Cases</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Status Indicators</h3>
          <div className="flex flex-wrap gap-2">
            <Tag variant="success" size="sm" rounded>
              Active
            </Tag>
            <Tag variant="warning" size="sm" rounded>
              Pending
            </Tag>
            <Tag variant="danger" size="sm" rounded>
              Failed
            </Tag>
            <Tag variant="secondary" size="sm" rounded>
              Inactive
            </Tag>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Tag variant="primary">Technology</Tag>
            <Tag variant="info">Design</Tag>
            <Tag variant="secondary">Business</Tag>
            <Tag variant="warning">Marketing</Tag>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">User Roles</h3>
          <div className="flex flex-wrap gap-2">
            <Tag variant="danger" rounded size="sm">
              Admin
            </Tag>
            <Tag variant="primary" rounded size="sm">
              Editor
            </Tag>
            <Tag variant="secondary" rounded size="sm">
              Viewer
            </Tag>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Feature Labels</h3>
          <div className="flex flex-wrap gap-2">
            <Tag variant="info" size="sm">
              New
            </Tag>
            <Tag variant="warning" size="sm">
              Beta
            </Tag>
            <Tag variant="danger" size="sm">
              Deprecated
            </Tag>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Clickable Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Tag
              variant="secondary"
              rounded
              onClick={() => alert("Tag clicked!")}
              endIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            >
              Removable
            </Tag>
            <Tag variant="primary" onClick={() => alert("Tag clicked!")}>
              Clickable
            </Tag>
          </div>
        </div>
      </section>
    </div>
  );
}
