import { Badge, BadgeProps } from "../project4";
import React, { useState } from "react";

export interface AvatarProps {
  src?: string;
  initials?: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "circle" | "square" | "rounded";
  borderColor?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = "md",
  variant = "circle",
  borderColor,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-24 h-24 text-lg",
  };

  const variantClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-lg",
  };

  const getInitialsFromAlt = () => {
    return alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const generateBgColor = (text: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-cyan-500",
    ];

    const hash = text.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);

    return colors[hash % colors.length];
  };

  const fallbackInitials = initials || getInitialsFromAlt();
  const bgColor = generateBgColor(fallbackInitials);

  const baseClasses = `${sizeClasses[size]} ${
    variantClasses[variant]
  } flex items-center justify-center transition-all duration-200 ${
    onClick ? "cursor-pointer hover:opacity-90 active:scale-95" : ""
  }`;

  const borderClasses = borderColor ? `border-2 ${borderColor}` : "";

  if (!src || imageError) {
    return (
      <div
        className={`${baseClasses} ${bgColor} text-white font-medium ${borderClasses}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {fallbackInitials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClasses} object-cover ${borderClasses}`}
      onError={() => setImageError(true)}
      onClick={onClick}
    />
  );
};

interface AvatarWithBadgeProps {
  avatar: AvatarProps;
  badge: Omit<BadgeProps, "label"> & { label?: string };
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  overlap?: boolean;
}

const AvatarWithBadge: React.FC<AvatarWithBadgeProps> = ({
  avatar,
  badge,
  position = "bottom-right",
  overlap = true,
}) => {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  // Adjust badge offset based on avatar size
  const getOffsetClasses = () => {
    if (!overlap) return "";

    const size = avatar.size || "md";
    const offsetMap = {
      xs: "-translate-y-1 translate-x-1",
      sm: "-translate-y-1 translate-x-1",
      md: "-translate-y-2 translate-x-2",
      lg: "-translate-y-3 translate-x-3",
      xl: "-translate-y-4 translate-x-4",
    };

    if (position === "top-right") return `${offsetMap[size]}`;
    if (position === "top-left")
      return `${offsetMap[size].replace("translate-x", "-translate-x")}`;
    if (position === "bottom-right")
      return `${offsetMap[size].replace("-translate-y", "translate-y")}`;
    if (position === "bottom-left")
      return `${offsetMap[size]
        .replace("-translate-y", "translate-y")
        .replace("translate-x", "-translate-x")}`;

    return "";
  };

  return (
    <div className="relative inline-flex">
      <Avatar {...avatar} />
      <div
        className={`absolute ${
          positionClasses[position]
        } ${getOffsetClasses()}`}
      >
        {badge.dot ? (
          <Badge {...badge} label="" dot />
        ) : badge.count !== undefined ? (
          <Badge {...badge} label="" />
        ) : (
          <Badge {...badge} label={badge.label || ""} />
        )}
      </div>
    </div>
  );
};

export default function Project5() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <section className="mb-12">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar alt="User XS" size="xs" />
              <Avatar alt="User SM" size="sm" />
              <Avatar alt="User MD" size="md" />
              <Avatar alt="User LG" size="lg" />
              <Avatar alt="User XL" size="xl" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar alt="Circle" variant="circle" />
              <Avatar alt="Square" variant="square" />
              <Avatar alt="Rounded" variant="rounded" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">With Images</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar
                src="https://avatars.githubusercontent.com/u/64205626?s=48&v=4"
                alt="abhinandanmishra1"
              />
              <Avatar
                src="https://github.githubassets.com/assets/starstruck-default-b6610abad518.png"
                alt="User 2"
                size="lg"
                borderColor="border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">With Initials</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar initials="AM" alt="Abhinandan Mishra" />
              <Avatar initials="JD" alt="John Doe" />
              <Avatar initials="RK" alt="Robert King" />
              <Avatar initials="ML" alt="Mary Lynch" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
