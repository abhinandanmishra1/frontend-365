import {
  Calendar,
  Home,
  Inbox,
  PanelLeftClose,
  PanelRightClose,
  Search,
  Settings,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarGroupProps {
  children: React.ReactNode;
  isCollapsed?: boolean;
  title?: string;
}

interface SidebarMenuItemProps {
  children: React.ReactNode;
  isCollapsed?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

const SidebarMenu = ({ children, isCollapsed, title }: SidebarGroupProps) => {
  return (
    <nav
      className={cn("flex flex-col gap-1", {
        "items-center": isCollapsed,
      })}
      aria-label={title || "Sidebar navigation"}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SidebarMenuItemProps>(child)) {
          return React.cloneElement(child, { isCollapsed });
        }

        return child;
      })}
    </nav>
  );
};

const SidebarMenuItem = ({
  children,
  isCollapsed,
  icon,
  onClick,
  active,
}: SidebarMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg w-full transition-colors",
        "hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400",
        {
          "justify-center": isCollapsed,
          "bg-gray-300": active,
        }
      )}
      role="menuitem"
    >
      {icon}
      {!isCollapsed && <span className="truncate">{children}</span>}
    </button>
  );
};

const SidebarGroup = ({ children, isCollapsed, title }: SidebarGroupProps) => {
  return (
    <div
      role="group"
      aria-label={title}
      className={cn("space-y-2", {
        "items-center": isCollapsed,
      })}
    >
      {title && !isCollapsed && (
        <h2 className="text-sm font-semibold text-gray-600 px-2">{title}</h2>
      )}
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SidebarMenuItemProps>(child)) {
          return React.cloneElement(child, { isCollapsed });
        }

        return child;
      })}
    </div>
  );
};

const Sidebar = ({ children }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((collapsed) => !collapsed);
  };

  return (
    <aside
      className={cn(
        "h-full bg-gray-100 border-r transition-all duration-300 ease-in-out",
        "flex flex-col gap-4 p-4",
        {
          "w-64": !isCollapsed,
          "w-20": isCollapsed,
        }
      )}
      aria-expanded={!isCollapsed}
    >
      <button
        onClick={toggleSidebar}
        className={cn(
          "flex items-center p-2 rounded-lg transition-colors",
          " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400",
          {
            "justify-end": !isCollapsed,
            "justify-center": isCollapsed,
          }
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <PanelRightClose className="h-5 w-5 hover:text-gray-500" />
        ) : (
          <PanelLeftClose className="h-5 w-5 hover:text-gray-500" />
        )}
      </button>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SidebarGroupProps>(child)) {
          return React.cloneElement(child, { isCollapsed });
        }

        return child;
      })}
    </aside>
  );
};

export default function Project6() {
  const [activeItem, setActiveItem] = useState("Home");
  const items = [
    {
      title: "Home",
      icon: Home,
    },
    {
      title: "Inbox",
      icon: Inbox,
    },
    {
      title: "Calendar",
      icon: Calendar,
    },
    {
      title: "Search",
      icon: Search,
    },
    {
      title: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="w-full relative bg-white border rounded h-[50vh] flex">
      <Sidebar>
        <SidebarGroup title="Main Menu">
          <SidebarMenu>
            {items.map((item, index) => (
              <SidebarMenuItem
                key={index}
                active={item.title === activeItem}
                onClick={() => setActiveItem(item.title)}
                icon={<item.icon className="h-5 w-5 hover:text-gray-500" />}
              >
                {item.title}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </Sidebar>
      <div className="flex-1 flex items-center justify-center">
            {activeItem}
      </div>
    </div>
  );
}
