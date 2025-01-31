import Link from 'next/link';
import React from 'react';
import { getUniqueMonthsAndYears } from '@/projects/data';

// Utility to capitalize first letter
const capitalizeFirstLetter = (string: string) => 
  string.charAt(0).toUpperCase() + string.slice(1);

const MonthlyGrid: React.FC = () => {
  const { years, months } = getUniqueMonthsAndYears();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Frontend 365 Project Journey
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {years.map(year => (
          <div key={year} className="bg-card border rounded-lg shadow-md">
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
              <h2 className="text-2xl font-semibold text-center">{year}</h2>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              {months.map(month => (
                <Link 
                  key={month} 
                  href={`/projects/${month.toLowerCase()}`}
                  className="p-4 bg-secondary text-secondary-foreground 
                             rounded-lg text-center 
                             hover:bg-secondary/80 transition-colors
                             flex items-center justify-center"
                >
                  {capitalizeFirstLetter(month)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyGrid;