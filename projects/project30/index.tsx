"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newColor: string) => {
    onChange(newColor);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-8 h-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: color }}
            aria-label="Pick a color"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 border-none">
          <HexColorPicker color={color} onChange={handleChange} />
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={color}
        onChange={(e) => handleChange(e.target.value)}
        className="w-28"
        placeholder="#000000"
      />
    </div>
  );
}

export default function Project30() {
  const [color, setColor] = useState("#1677ff");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Project 30</h1>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Color Picker</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ColorPicker color={color} onChange={setColor} />
          <div className="mt-4">
            <p>Selected color: {color}</p>
            <div
              className="w-full h-20 mt-2 rounded-md"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
