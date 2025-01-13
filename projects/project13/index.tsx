import React, { useEffect, useRef } from "react";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  $onClick?: () => void;
  $show?: boolean;
  showIcon?: boolean;
}

interface DropdownContentProps {
  children: React.ReactNode;
  $show?: boolean;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
}

interface DropdownMenuGroupProps {
  children: React.ReactNode;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const DropdownTrigger = ({
  children,
  $onClick: onClick,
  $show: show,
  showIcon = false,
}: DropdownTriggerProps) => {
  return (
    <div
      onClick={onClick}
      className="inline-flex items-center gap-1 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-expanded={show}
      aria-haspopup="true"
    >
      {children}
      {showIcon && (
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            show && "transform rotate-180"
          )}
        />
      )}
    </div>
  );
};

const DropdownContent = ({
  children,
  $show: show = false,
}: DropdownContentProps) => {
  return (
    <div
      className={cn(
        "absolute z-50 top-full min-w-[200px] right-0 mt-2 bg-white border shadow-lg border-gray-200 rounded-lg transition-all duration-200",
        "divide-y divide-gray-100",
        {
          "opacity-0 invisible -translate-y-2": !show,
          "opacity-100 visible translate-y-0": show,
        }
      )}
      role="menu"
    >
      {children}
    </div>
  );
};

const DropdownMenuSeparator = () => {
  return <div className="h-px bg-gray-200" role="separator"></div>;
};

const DropdownMenuLabel = ({ children }: DropdownMenuLabelProps) => {
  return (
    <div
      className="px-4 py-2 text-sm font-semibold text-gray-700"
      role="presentation"
    >
      {children}
    </div>
  );
};

const DropdownMenuGroup = ({ children }: DropdownMenuGroupProps) => {
  return (
    <div className="py-1" role="group">
      {children}
    </div>
  );
};

const DropdownMenuItem = ({
  children,
  onClick,
  disabled = false,
}: DropdownMenuItemProps) => {
  return (
    <div
      className={cn(
        "px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
        "transition-colors duration-150 ease-in-out",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={!disabled ? onClick : undefined}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
};

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [show, setShow] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  // Can create a separate hook for this
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events
  // Can ceate a separate hook for handling keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShow(false);
      }

      if (event.key === "Enter") {
        setShow(show => !show);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<DropdownContentProps>(child) &&
          child.type === DropdownContent
        ) {
          return React.cloneElement(child, { $show: show });
        }

        if (
          React.isValidElement<DropdownTriggerProps>(child) &&
          child.type === DropdownTrigger
        ) {
          return React.cloneElement(child, {
            $onClick: () => setShow(!show),
            $show: show,
          });
        }

        return child;
      })}
    </div>
  );
};

export default function Project13() {
  return (
    <div className="p-8">
      <DropdownMenu>
        <DropdownTrigger>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Document Settings
          </button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => console.log("Edit clicked")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Duplicate clicked")}>
              Duplicate
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => console.log("Archive clicked")}>
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete clicked")}
              disabled
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownContent>
      </DropdownMenu>
    </div>
  );
}
