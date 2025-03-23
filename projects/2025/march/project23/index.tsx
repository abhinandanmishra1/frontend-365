import { ChevronRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

interface BreadcrumbEllipsisProps extends React.SVGAttributes<SVGSVGElement> {}

// This component is used to represent the breadcrumb navigation.
const Breadcrumb: React.FC<BreadcrumbProps> = ({ children, className, ...props }) => {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      {children}
    </nav>
  );
};

// This component is used to represent the list of breadcrumb items.
const BreadcrumbList: React.FC<BreadcrumbListProps> = ({ children, className, ...props }) => {
  return (
    <ol className={`flex items-center flex-wrap ${className || ""}`} {...props}>
      {children}
    </ol>
  );
};

// This component is used to represent an item in the breadcrumb list.
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={`inline-flex items-center ${className || ""}`} {...props}>
      {children}
    </li>
  );
};

// This component is used to represent a link in the breadcrumb list.
const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({ 
  href, 
  children, 
  className, 
  ...props 
}) => {
  return (
    <a 
      href={href} 
      className={`text-sm font-medium hover:text-primary underline-offset-4 hover:underline ${className || ""}`}
      {...props}
    >
      {children}
    </a>
  );
};

// This component is used to represent the current page in the breadcrumb list.
const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({ children, className, ...props }) => {
  return (
    <span
      className={`text-sm font-medium text-muted-foreground ${className || ""}`}
      aria-current="page"
      {...props}
    >
      {children}
    </span>
  );
};

// This component is used to separate the breadcrumb items.
const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({ children, className, ...props }) => {
  return (
    <li className={`inline-flex mx-2 text-muted-foreground ${className || ""}`} {...props}>
      {children || <ChevronRight className="h-4 w-4" />}
    </li>
  );
};

// This component is used to represent an ellipsis in the breadcrumb list.
const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({ className, ...props }) => {
  return (
    <MoreHorizontal className={`h-4 w-4 ${className || ""}`} {...props} />
  );
};

export default function Project23() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Project 23</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
};
