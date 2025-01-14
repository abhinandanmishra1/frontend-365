import React, { useEffect, useRef, useState } from "react";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Suggestion {
  value: string;
  relevance: number;
  type: string;
  serpapi_link: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [firstSuggestion, setFirstSuggestion] = useState("");
  const [focusedSuggestion, setFocusedSuggestion] = useState(0);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (prefix: string) => {
    if (prefix.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const suggestions = await fetch(
        `/api/google/autocomplete?query=${prefix}`
      );
      if (!suggestions.ok) {
        throw new Error(suggestions.statusText);
      }

      const data = await suggestions.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedFetch = debounce(fetchSuggestions, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFirstSuggestion(value);
    setShowSuggestions(true);
    debouncedFetch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const length = suggestions.length + 1;

    if (e.key === "ArrowDown") {
      setFocusedSuggestion((prev) => {
        const newFocus = (prev + 1) % length;
        // Update query based on the new focus value
        if (newFocus === 0) {
          setQuery(firstSuggestion);
        } else {
          setQuery(suggestions[newFocus - 1].value);
        }
        return newFocus;
      });
    } else if (e.key === "ArrowUp") {
      setFocusedSuggestion((prev) => {
        const newFocus = (prev + length - 1) % length;
        // Update query based on the new focus value
        if (newFocus === 0) {
          setQuery(firstSuggestion);
        } else {
          setQuery(suggestions[newFocus - 1].value);
        }
        return newFocus;
      });
    } else if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };
  
  return (
    <div ref={searchContainerRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          {loading ? (
            <div className="h-5 w-5 border-t-2 border-blue-500 rounded-full animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
          <div
            key={firstSuggestion}
            className={cn("px-4 py-2 cursor-pointer hover:bg-gray-100", {
              "bg-gray-100": focusedSuggestion === 0,
            })}
            onClick={() => handleSuggestionClick(firstSuggestion)}
          >
            {firstSuggestion}
          </div>
          {suggestions?.map((suggestion, index) => (
            <div
              key={index}
              className={cn("px-4 py-2 cursor-pointer hover:bg-gray-100", {
                "bg-gray-100": focusedSuggestion === index + 1,
              })}
              onClick={() => handleSuggestionClick(suggestion.value)}
            >
              {suggestion.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
