import { Avatar, AvatarProps } from "../project5";
import { Badge, BadgeProps } from "../project4";

import React from "react";
import { cn } from "@/lib/utils";

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
    "top-right": "top-0 left-[60%]",
    "top-left": "top-0 left-[-30%]",
    "bottom-right": "bottom-[-15%] left-[60%]",
    "bottom-left": "bottom-[-15%] left-[-30%]",
  };

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

    if (position === "top-right") return offsetMap[size];
    if (position === "top-left")
      return offsetMap[size].replace("translate-x", "-translate-x");
    if (position === "bottom-right")
      return offsetMap[size].replace("-translate-y", "translate-y");
    if (position === "bottom-left")
      return offsetMap[size]
        .replace("-translate-y", "translate-y")
        .replace("translate-x", "-translate-x");

    return "";
  };

  return (
    <div className="relative inline-flex">
      <Avatar {...avatar} />
      <div
        className={cn(
          "absolute",
          positionClasses[position],
          getOffsetClasses(),
          {
            "bottom-0": badge.dot && position.includes("bottom"),
            "top-0": badge.dot && position.includes("top"),
          }
        )}
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

export default function Project6() {
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <section>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Status Indicators</h3>
            <div className="flex flex-wrap gap-8 items-center">
              <AvatarWithBadge
                avatar={{
                  alt: "Online User",
                  src: "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
                }}
                badge={{ dot: true, variant: "success" }}
              />
              <AvatarWithBadge
                avatar={{ alt: "Offline User", initials: "OF" }}
                badge={{ dot: true, variant: "secondary" }}
              />
              <AvatarWithBadge
                avatar={{
                  alt: "Away User",
                  src: "https://avatars.githubusercontent.com/u/64205626?v=4",
                }}
                badge={{ dot: true, variant: "warning" }}
                position="top-right"
              />
              <AvatarWithBadge
                avatar={{ alt: "Busy User", initials: "BU" }}
                badge={{ dot: true, variant: "danger" }}
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Notification Counts</h3>
            <div className="flex flex-wrap gap-8 items-center">
              <AvatarWithBadge
                avatar={{
                  alt: "User 1",
                  src: "https://github.githubassets.com/assets/starstruck-default-b6610abad518.png",
                }}
                badge={{ count: 3, variant: "danger" }}
                position="top-left"
              />
              <AvatarWithBadge
                avatar={{ alt: "User 2", initials: "JD" }}
                badge={{ count: 12, variant: "primary" }}
                position="bottom-left"
              />
              <AvatarWithBadge
                avatar={{ alt: "User 3", initials: "RK" }}
                badge={{ count: 99, variant: "secondary" }}
              />
              <AvatarWithBadge
                avatar={{ alt: "User 4", initials: "ML" }}
                badge={{ count: 150, variant: "danger" }}
                position="top-right"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
