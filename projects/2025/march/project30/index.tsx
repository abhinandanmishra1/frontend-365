import React, { useState } from 'react';

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

const Menu = ({ children, className }: MenuProps) => {
  return (
    <nav className={cn(
      "flex flex-col space-y-2 rounded-md border border-gray-200 p-2 shadow-sm",
      className
    )}>
      {children}
    </nav>
  );
};

interface MenuItemProps {
  children?: React.ReactNode;
  href?: string;
  active?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const MenuItem = ({
  children,
  href,
  active = false,
  startIcon,
  endIcon,
  onClick,
  disabled = false,
  className
}: MenuItemProps) => {
  const isLink = Boolean(href);
  const ComponentType = isLink ? 'a' : 'button';
  
  const baseStyles = cn(
    "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1",
    active ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700",
    disabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : "",
    className
  );

  return (
    <ComponentType
      href={isLink ? href : undefined}
      onClick={!disabled ? onClick : undefined}
      className={baseStyles}
      disabled={disabled && !isLink}
      aria-disabled={disabled}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span className="flex-grow">{children}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </ComponentType>
  );
};

interface MenuGroupProps {
  label: string;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const MenuGroup = ({
  label,
  children,
  startIcon,
  defaultOpen = false,
  className
}: MenuGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={cn("space-y-1", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1",
          isOpen ? "bg-gray-100 text-gray-900" : "text-gray-700"
        )}
      >
        <div className="flex items-center">
          {startIcon && <span className="mr-2">{startIcon}</span>}
          <span>{label}</span>
        </div>
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen ? "rotate-90 transform" : ""
          )}
        />
      </button>
      {isOpen && (
        <div className="ml-4 pl-2 border-l border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Project30() {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Simple Menu</h2>
          <Menu className="w-64">
            <MenuItem 
              active={activeItem === 'dashboard'} 
              onClick={() => handleItemClick('dashboard')}
            >
              Dashboard
            </MenuItem>
            <MenuItem 
              active={activeItem === 'projects'} 
              onClick={() => handleItemClick('projects')}
            >
              Projects
            </MenuItem>
            <MenuItem 
              active={activeItem === 'team'} 
              onClick={() => handleItemClick('team')}
            >
              Team
            </MenuItem>
            <MenuItem 
              disabled
              onClick={() => handleItemClick('reports')}
            >
              Reports (Disabled)
            </MenuItem>
          </Menu>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Advanced Menu with Icons and Groups</h2>
          <Menu className="w-64">
            <MenuItem 
              startIcon={<span className="i-lucide-home w-4 h-4" />}
              active={activeItem === 'home'} 
              onClick={() => handleItemClick('home')}
            >
              Home
            </MenuItem>
            
            <MenuGroup 
              label="Settings" 
              startIcon={<span className="i-lucide-settings w-4 h-4" />}
              defaultOpen={true}
            >
              <MenuItem 
                active={activeItem === 'profile'} 
                onClick={() => handleItemClick('profile')}
              >
                Profile
              </MenuItem>
              <MenuItem 
                active={activeItem === 'account'} 
                onClick={() => handleItemClick('account')}
              >
                Account
              </MenuItem>
              <MenuItem 
                active={activeItem === 'billing'} 
                onClick={() => handleItemClick('billing')}
                endIcon={<span className="i-lucide-credit-card w-4 h-4" />}
              >
                Billing
              </MenuItem>
            </MenuGroup>
            
            <MenuGroup 
              label="Resources" 
              startIcon={<span className="i-lucide-book w-4 h-4" />}
            >
              <MenuItem 
                href="https://frontend365.vercel.app/projects" 
                endIcon={<span className="i-lucide-external-link w-4 h-4" />}
              >
                Documentation
              </MenuItem>
              <MenuItem 
                href="https://frontend365.vercel.app/"
                endIcon={<span className="i-lucide-help-circle w-4 h-4" />}
              >
                Help Center
              </MenuItem>
            </MenuGroup>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export { Menu, MenuItem, MenuGroup };
