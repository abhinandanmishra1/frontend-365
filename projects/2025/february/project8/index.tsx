import { Locate, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Position =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "center-left"
  | "center-right";
type Behavior = "fixed" | "absolute" | "relative";

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  position?: Position;
  behavior?: Behavior;
  spacing?: number;
  size?: "small" | "medium" | "large";
}

const FloatingActionButton = ({
  icon,
  onClick,
  className,
  position = "bottom-right",
  behavior = "fixed",
  spacing = 4,
  size = "medium",
}: FloatingActionButtonProps) => {
  const positionClasses = {
    "top-left": `top-${spacing} left-${spacing}`,
    "top-right": `top-${spacing} right-${spacing}`,
    "top-center": `top-${spacing} left-1/2 -translate-x-1/2`,
    "bottom-left": `bottom-${spacing} left-${spacing}`,
    "bottom-right": `bottom-${spacing} right-${spacing}`,
    "bottom-center": `bottom-${spacing} left-1/2 -translate-x-1/2`,
    "center-left": `top-1/2 -translate-y-1/2 left-${spacing}`,
    "center-right": `top-1/2 -translate-y-1/2 right-${spacing}`,
  };

  const sizeClasses = {
    small: "h-10 w-10 p-2",
    medium: "h-14 w-14 p-3",
    large: "h-16 w-16 p-4",
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full z-[1000]",
        behavior,
        positionClasses[position],
        sizeClasses[size],
        className
      )}
    >
      {icon}
    </Button>
  );
};

const ButtonControls = ({
  position,
  behavior,
  onPositionChange,
  onBehaviorChange,
}: {
  position: Position;
  behavior: Behavior;
  onPositionChange: (pos: Position) => void;
  onBehaviorChange: (beh: Behavior) => void;
}) => {
  const positions = [
    "top-left",
    "top-right",
    "top-center",
    "bottom-left",
    "bottom-right",
    "bottom-center",
    "center-left",
    "center-right",
  ];

  const behaviors = ["fixed", "absolute", "relative"];

  return (
    <div className="flex gap-4 mb-4">
      <Select value={position} onValueChange={onPositionChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {positions.map((pos) => (
            <SelectItem key={pos} value={pos}>
              {pos}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={behavior} onValueChange={onBehaviorChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Behavior" />
        </SelectTrigger>
        <SelectContent>
          {behaviors.map((beh) => (
            <SelectItem key={beh} value={beh}>
              {beh}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

type ButtonControl = {
  position: Position;
  behavior: Behavior;
};
export default function Project8() {
  const [searchControls, setSearchControls] = useState<ButtonControl>({
    position: "top-right",
    behavior: "absolute",
  });

  const [plusControls, setPlusControls] = useState<ButtonControl>({
    position: "center-left",
    behavior: "absolute",
  });

  const [locateControls, setLocateControls] = useState<ButtonControl>({
    position: "bottom-right",
    behavior: "fixed",
  });

  return (
    <div className="w-full min-h-screen p-4 relative">
      <h1 className="text-2xl font-bold mb-8">
        Floating Action Button Examples
      </h1>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg font-semibold mb-4">Search Button Controls</h2>
          <ButtonControls
            position={searchControls.position}
            behavior={searchControls.behavior}
            onPositionChange={(pos) =>
              setSearchControls((prev) => ({ ...prev, position: pos }))
            }
            onBehaviorChange={(beh) =>
              setSearchControls((prev) => ({ ...prev, behavior: beh }))
            }
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg font-semibold mb-4">Plus Button Controls</h2>
          <ButtonControls
            position={plusControls.position}
            behavior={plusControls.behavior}
            onPositionChange={(pos) =>
              setPlusControls((prev) => ({ ...prev, position: pos }))
            }
            onBehaviorChange={(beh) =>
              setPlusControls((prev) => ({ ...prev, behavior: beh }))
            }
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg font-semibold mb-4">Locate Button Controls</h2>
          <ButtonControls
            position={locateControls.position}
            behavior={locateControls.behavior}
            onPositionChange={(pos) =>
              setLocateControls((prev) => ({ ...prev, position: pos }))
            }
            onBehaviorChange={(beh) =>
              setLocateControls((prev) => ({ ...prev, behavior: beh }))
            }
          />
        </div>
        </div>
        <FloatingActionButton
          icon={<Locate size={24} />}
          onClick={() => console.log("locate clicked")}
          position={locateControls.position}
          behavior={locateControls.behavior}
          spacing={4}
        />
        <FloatingActionButton
          icon={<Search size={24} />}
          onClick={() => console.log("search clicked")}
          position={searchControls.position}
          behavior={searchControls.behavior}
          size="medium"
        />
        <FloatingActionButton
          icon={<Plus size={24} />}
          onClick={() => console.log("plus clicked")}
          position={plusControls.position}
          behavior={plusControls.behavior}
          size="large"
        />
      
    </div>
  );
}
