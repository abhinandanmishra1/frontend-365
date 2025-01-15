import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsDark(!isDark)}
        className={`
          relative flex items-center justify-center w-16 h-8 
          rounded-full transition-colors duration-300 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${isDark ? 'bg-slate-800' : 'bg-blue-100'}
        `}
        aria-label="Toggle theme"
      >
        {/* Track Background with Gradient */}
        <div
          className={`
            absolute inset-0 rounded-full transition-opacity duration-300
            ${isDark 
              ? 'opacity-100 bg-gradient-to-r from-indigo-900 to-purple-900' 
              : 'opacity-0 bg-gradient-to-r from-yellow-100 to-blue-100'
            }
          `}
        />

        {/* Sliding Circle */}
        <div
          className={`
            absolute left-1 w-6 h-6 rounded-full transform transition-transform duration-300
            ${isDark 
              ? 'translate-x-8 bg-slate-200' 
              : 'translate-x-0 bg-white'
            }
            shadow-lg flex items-center justify-center
          `}
        >
          {/* Icons */}
          <Sun 
            className={`
              absolute w-4 h-4 transition-all duration-300
              ${isDark 
                ? 'opacity-0 scale-0 rotate-90' 
                : 'opacity-100 scale-100 rotate-0'
              }
              text-yellow-500
            `}
          />
          <Moon 
            className={`
              absolute w-4 h-4 transition-all duration-300
              ${isDark 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-0 -rotate-90'
              }
              text-slate-800
            `}
          />
        </div>
      </button>
    </div>
  );
};

export default function Project15() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 15</h1>
      <ThemeToggle />
    </div>
  );
}
