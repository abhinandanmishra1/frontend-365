import { ChevronRight } from "lucide-react";

interface DynamicBreadcrumbsProps {
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

const DynamicBreadcrumbs = ({ breadcrumbs }: DynamicBreadcrumbsProps) => {
  return (
    <ul className="flex gap-1">
      {breadcrumbs.map((breadcrumb, index) => (
        <li
          key={index}
          className="flex gap-2 items-center text-gray-700 hover:text-gray-900"
        >
          <a href={breadcrumb.href}>{breadcrumb.label}</a>
          {index !== breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Project5() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <DynamicBreadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "2025", href: "/projects/2025" },
          { label: "April", href: "/projects/2025/april" },
          { label: "Project 5", href: "/project/5?year=2025&month=april" },
        ]}
      />
    </div>
  );
}
