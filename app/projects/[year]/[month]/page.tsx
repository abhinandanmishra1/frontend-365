"use client";

import { Calendar, ChevronLeft, Eye, TagIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useParams, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProjectsByMonthAndYear } from "@/projects/data";
import { useMemo } from "react";

export default function MonthlyProjectsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const month = params.month as string;
  const year = params.year as string;
  const currentYear = parseInt(year);

  // Pagination
  const page = Number(searchParams.get('page') || 1);
  const ITEMS_PER_PAGE = 9;

  // Get all projects for the month and year
  const monthProjects = getProjectsByMonthAndYear(currentYear, month);

  // Paginate projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return monthProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [monthProjects, page]);

  // Calculate total pages
  const totalPages = Math.ceil(monthProjects.length / ITEMS_PER_PAGE);

  // Capitalize month first letter
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <Calendar className="text-primary" size={40} />
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-foreground">
              {capitalizedMonth} {currentYear} Projects
            </h1>
            <p className="text-muted-foreground">
              Total Projects: <span className="font-semibold text-foreground">{monthProjects.length}</span>
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/projects/${currentYear}`}className="flex items-center">
            <ChevronLeft className="mr-2" size={16} /> Back to Yearly View
          </Link>
        </Button>
      </div>

      {monthProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <TagIcon className="text-muted-foreground mb-4" size={64} />
          <h2 className="text-2xl font-semibold mb-2">No Projects Found</h2>
          <p className="text-muted-foreground">
            There are no projects for {capitalizedMonth} {currentYear}.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedProjects.map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <CardHeader 
                  className="relative p-0 h-48 overflow-hidden"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 z-10"
                  >
                    {new Date(project.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link
                      href={`/project/${project.id}?year=${project.year}&month=${project.month}`}
                      className="flex items-center justify-center"
                    >
                      <Eye className="mr-2" size={16} /> View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      href={`/projects/${currentYear}/${month}?page=${page - 1}`} 
                    />
                  </PaginationItem>
                )}

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      href={`/projects/${currentYear}/${month}?page=${index + 1}`}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      href={`/projects/${currentYear}/${month}?page=${page + 1}`} 
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}