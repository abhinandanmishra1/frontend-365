'use client';

import { CalendarDays, Grid3x3, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { projects } from '@/projects/data';
import { useParams } from 'next/navigation';

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

export default function YearProjectsPage() {
  const params = useParams();
  const year = parseInt(params.year as string);
  const [view, setView] = useState<ViewType>('grid');

  // Months with predefined order
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june', 
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  // Compute month project counts for the specific year
  const monthProjectCounts = months.map(month => ({
    month,
    projectCount: projects.filter(
      p => p.year === year && p.month.toLowerCase() === month
    ).length
  }));

  // Total projects for the year
  const totalProjects = monthProjectCounts.reduce(
    (sum, month) => sum + month.projectCount, 0
  );

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-10 space-x-4">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
            <CalendarDays className="text-primary" size={40} />
            {year} Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            Total Projects: <span className="font-semibold text-foreground">{totalProjects}</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
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

          <Button variant="outline" asChild>
            <Link href="/projects" className="flex items-center">
              Back to Years
            </Link>
          </Button>
        </div>
      </div>

      {/* Months View */}
      <div 
        className={cn(
          "grid gap-6 mb-10",
          view === 'grid' && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          view === 'list' && "grid-cols-1",
          view === 'compact' && "grid-cols-6"
        )}
      >
        {monthProjectCounts.map(({ month, projectCount }) => (
          <MonthCard
            key={month}
            month={month}
            year={year}
            projectCount={projectCount}
          />
        ))}
      </div>

      {/* Projects Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CalendarDays className="text-primary" size={24} />
            Year Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Months with Projects</h3>
              <p className="text-2xl font-bold text-primary">
                {monthProjectCounts.filter(m => m.projectCount > 0).length}
              </p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Most Productive Month</h3>
              <p className="text-2xl font-bold text-primary">
                {(() => {
                  const mostProductiveMonth = monthProjectCounts.reduce(
                    (max, month) => month.projectCount > max.projectCount ? month : max
                  );
                  return mostProductiveMonth.projectCount > 0 
                    ? capitalizeFirstLetter(mostProductiveMonth.month) 
                    : 'N/A';
                })()}
              </p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Avg Projects per Month</h3>
              <p className="text-2xl font-bold text-primary">
                {(totalProjects / 12).toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};