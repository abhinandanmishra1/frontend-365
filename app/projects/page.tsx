"use client";

import {
  Archive,
  CalendarDays,
  ChevronLeft,
  Grid3x3,
  LayoutGrid,
  List
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getUniqueMonthsAndYears, projects } from '@/projects/data';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// View types for filtering
type ViewType = 'grid' | 'list' | 'compact';

// Utility to capitalize first letter
const capitalizeFirstLetter = (string: string) => 
  string.charAt(0).toUpperCase() + string.slice(1);

// Month Card Component
const MonthCard: React.FC<{ 
  month: string, 
  year: number, 
  projectCount: number 
}> = ({ month, year, projectCount }) => {
  return (
    <Link 
      href={`/projects/${year}/${month.toLowerCase()}`}
      className="relative group"
    >
      <Card 
        className={cn(
          "hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2",
          projectCount > 0 
            ? "cursor-pointer hover:border-primary" 
            : "opacity-50 cursor-not-allowed"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <span className="text-2xl font-semibold text-foreground mb-3 block">
              {capitalizeFirstLetter(month)}
            </span>
            <div 
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                projectCount > 0 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              <span className="text-2xl font-bold">{projectCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Year Card Component
const YearCard: React.FC<{ 
  year: number, 
  totalProjects: number 
}> = ({ year, totalProjects }) => {
  return (
    <Link 
      href={`/projects/${year}`}
      className="group"
    >
      <Card className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2">
        <CardHeader className="pb-0 pt-6 px-6 bg-secondary/30">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-foreground">{year}</h2>
            <Archive 
              className="text-muted-foreground group-hover:text-primary transition-colors" 
              size={24} 
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-4 flex flex-col items-center">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center 
            bg-primary/10 mb-3"
          >
            <span className="text-2xl font-bold text-primary">
              {totalProjects}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Total Projects
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function ProjectsPage() {
  const [view, setView] = useState<ViewType>('grid');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { years } = getUniqueMonthsAndYears();

  // Months with predefined order
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june', 
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  // Compute projects for each year and month
  const yearProjectCounts = years.map(year => ({
    year,
    totalProjects: projects.filter(p => p.year === year).length
  }));

  // Compute month project counts for a specific year
  const getMonthProjectCounts = (year: number) => 
    months.map(month => ({
      month,
      projectCount: projects.filter(
        p => p.year === year && p.month.toLowerCase() === month
      ).length
    }));

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <CalendarDays className="text-primary" size={40} />
          <div>
            <h1 className="text-4xl font-extrabold text-foreground">
              {selectedYear ? `${selectedYear} Projects` : 'Frontend 365 Projects'}
            </h1>
            {!selectedYear && (
              <p className="text-muted-foreground">
                Total Years: <span className="font-semibold text-foreground">{years.length}</span>
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View Type Selector */}
          <Select 
            value={view} 
            onValueChange={(val: ViewType) => setView(val)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select View">
                {view === 'grid' && <Grid3x3 className="mr-2 inline-block" size={16} />}
                {view === 'list' && <List className="mr-2 inline-block" size={16} />}
                {view === 'compact' && <LayoutGrid className="mr-2 inline-block" size={16} />}
                {capitalizeFirstLetter(view)} View
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid" className="cursor-pointer">
                <div className="flex items-center">
                  <Grid3x3 className="mr-2" size={16} /> Grid View
                </div>
              </SelectItem>
              <SelectItem value="list" className="cursor-pointer">
                <div className="flex items-center">
                  <List className="mr-2" size={16} /> List View
                </div>
              </SelectItem>
              <SelectItem value="compact" className="cursor-pointer">
                <div className="flex items-center">
                  <LayoutGrid className="mr-2" size={16} /> Compact View
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Reset Button when a year is selected */}
          {selectedYear && (
            <Button 
              variant="outline" 
              onClick={() => setSelectedYear(null)}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2" size={16} /> Back to Years
            </Button>
          )}
        </div>
      </div>

      {/* Year View */}
      {!selectedYear && (
        <div 
          className={cn(
            "grid gap-6",
            view === 'grid' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            view === 'list' && "grid-cols-1",
            view === 'compact' && "grid-cols-4"
          )}
        >
          {yearProjectCounts.map(({ year, totalProjects }) => (
            <YearCard 
              key={year} 
              year={year} 
              totalProjects={totalProjects}
            />
          ))}
        </div>
      )}

      {/* Month View */}
      {selectedYear && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getMonthProjectCounts(selectedYear).map(({ month, projectCount }) => (
            <MonthCard
              key={month}
              month={month}
              year={selectedYear}
              projectCount={projectCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}