import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useMemo, useState } from 'react';

import { Button } from "@/components/ui/button";

// Define types
type UsePaginationProps = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

type PaginationProps = UsePaginationProps & {
  onPageChange: (page: number) => void;
  className?: string;
};

interface ExampleItem {
  id: number;
  name: string;
}

// Custom hook for pagination logic
const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    // Helper function to create array of numbers in range
    const range = (start: number, end: number): number[] => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    const DOTS = "DOTS";
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

// Pagination component using shadcn UI components
const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 items in pagination range we shall not render the component
  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Left navigation arrow */}
      <Button 
        variant="outline" 
        size="icon"
        disabled={currentPage === 1}
        onClick={onPrevious}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === "DOTS") {
          return (
            <div key={`dots-${index}`} className="flex items-center justify-center">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
          );
        }

        // Render our Page Pills
        return (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(Number(pageNumber))}
            className="h-8 w-8"
          >
            {pageNumber}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === lastPage}
        onClick={onNext}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const exampleItems: ExampleItem[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
  { id: 7, name: "Item 7" },
  { id: 8, name: "Item 8" },
  { id: 9, name: "Item 9" },
  { id: 10, name: "Item 10" },
  { id: 11, name: "Item 11" },
  { id: 12, name: "Item 12" },
  { id: 13, name: "Item 13" },
  { id: 14, name: "Item 14" },
  { id: 15, name: "Item 15" },
];

const Project11: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  
  const currentItems = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return exampleItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Items List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentItems.map(item => (
              <div key={item.id} className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">Item ID: {item.id}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Pagination
        currentPage={currentPage}
        totalCount={exampleItems.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
        className="mt-4"
      />
      
      <div className="mt-6 text-sm text-gray-500">
        Page {currentPage} of {Math.ceil(exampleItems.length / pageSize)}
      </div>
    </div>
  );
};

export default Project11;