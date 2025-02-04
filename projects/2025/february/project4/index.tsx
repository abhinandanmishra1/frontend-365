import React, { useEffect, useMemo, useRef } from "react";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: number;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  onSelect?: (option: Option) => void;
  onRemove?: (option: Option) => void;
}

const MultiSelectDropdown = ({
  options,
  onSelect,
  onRemove,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedOptions((prev) => [...prev, option]);
    setSearch("");
    inputRef.current?.focus();

    if (onSelect) {
      onSelect(option);
    }
  };

  const handleRemove = (optionToRemove: Option) => {
    setSelectedOptions((prev) =>
      prev.filter((option) => option.value !== optionToRemove.value)
    );
    inputRef.current?.focus();

    if (onRemove) {
      onRemove(optionToRemove);
    }
  };

  const [backSpacePressedCount, setBackSpacePressedCount] = React.useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && search === "" && selectedOptions.length > 0) {
      if (backSpacePressedCount === 0) {
        setBackSpacePressedCount((prev) => prev + 1);
      } else {
        handleRemove(selectedOptions[selectedOptions.length - 1]);
        setBackSpacePressedCount(0);
      }
    } else if (e.key === "ArrowDown") {
      setSelectedOptionIndex((prev) => {
        if (prev === filteredOptions.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedOptionIndex((prev) => {
        if (prev === 0) {
          return filteredOptions.length - 1;
        }
        return prev - 1;
      });
    } else if (e.key === "Enter") {
      if (selectedOptionIndex !== -1) {
        handleSelect(filteredOptions[selectedOptionIndex]);
        setSelectedOptionIndex(-1);
      }
    }
  };

  const filteredOptions = useMemo(() => {
    return options.filter(
      (option) =>
        !selectedOptions.some((selected) => selected.value === option.value) &&
        option.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedOptions, search]);

  return (
    <div className="w-full max-w-md relative" ref={dropdownRef}>
      <div
        className={`w-full border rounded-lg bg-white ${
          isOpen ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <div className="flex flex-wrap gap-1 p-2 min-h-10">
          {selectedOptions.map((option, index) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm",
                {
                  "bg-blue-400 text-white":
                    index === selectedOptions.length - 1 &&
                    backSpacePressedCount === 1,
                }
              )}
            >
              {option.label}
              <button
                onClick={() => handleRemove(option)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            className="border-none outline-none flex-1 min-w-[120px] bg-transparent placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedOptions.length === 0 ? "Select options..." : "Add more..."
            }
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          <div className="py-1">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn("px-4 py-2 hover:bg-gray-100 cursor-pointer", {
                  "bg-blue-100 text-blue-700": selectedOptionIndex === index,
                })}
              >
                {option.label}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Project4() {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);
  const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  const onSelect = (option: Option) => {
    setSelectedOptions((prev) => [...prev, option]);
    console.log("Selected option:", option);
  };

  const onRemove = (option: Option) => {
    setSelectedOptions((prev) =>
      prev.filter((selected) => selected.value !== option.value)
    );
    console.log("Removed option:", option);
  };

  console.log(selectedOptions);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project 4</h1>
      <MultiSelectDropdown
        options={options}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    </div>
  );
}
