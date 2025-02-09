import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SelectOption {
    value: string;
    label: string;
  }
  
  interface SelectItem {
    group: string;
    options: SelectOption[];
  }
  
  interface SelectWithSearchProps {
    placeholder?: string;
    data: SelectItem[];
    onSelect?: (value: string) => void;
    value?: string;
  }
  
  export function SelectWithSearch({ data, placeholder, value, onSelect }: SelectWithSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState<string | undefined>(value);
    const inputRef = useRef<HTMLInputElement>(null);
  
    const filteredData = useMemo(() => {
      return data
        .map((item) => ({
          ...item,
          options: item.options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.group.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((item) => item.options.length > 0);
    }, [data, searchTerm]);
  
    const handleSelect = (value: string) => {
      setSelectedOption(value);
      if (onSelect) {
        onSelect(value);
      }

      setSearchTerm("");
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        focusOnDelay();
    }

    const focusOnDelay = useCallback(() => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    }, []);
    
    return (
      <Select value={selectedOption} onValueChange={handleSelect}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <input
            ref={inputRef}
            type="text"
            autoFocus
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
          />
          {filteredData.map(({ group, options }) => (
            <SelectGroup key={group}>
              <SelectLabel>{group}</SelectLabel>
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    );
  }
  
  export default function Project11() {
    const data: SelectItem[] = [
      {
        group: "North America",
        options: [
          { value: "est", label: "Eastern Standard Time (EST)" },
          { value: "cst", label: "Central Standard Time (CST)" },
          { value: "mst", label: "Mountain Standard Time (MST)" },
          { value: "pst", label: "Pacific Standard Time (PST)" },
          { value: "akst", label: "Alaska Standard Time (AKST)" },
          { value: "hst", label: "Hawaii Standard Time (HST)" },
        ],
      },
      {
        group: "South America",
        options: [
          { value: "art", label: "Argentina Time (ART)" },
          { value: "bot", label: "Bolivia Time (BOT)" },
          { value: "brt", label: "Brasilia Time (BRT)" },
          { value: "clt", label: "Chile Standard Time (CLT)" },
        ],
      },
      {
        group: "Europe",
        options: [
          { value: "cet", label: "Central European Time (CET)" },
          { value: "met", label: "Middle European Time (MET)" },
          { value: "wet", label: "West European Time (WET)" },
        ],
      },
      {
        group: "Africa",
        options: [
          { value: "cet", label: "Central European Time (CET)" },
          { value: "met", label: "Middle European Time (MET)" },
          { value: "wet", label: "West European Time (WET)" },
        ],
      },
    ];
  
    return (
      <div className="w-full p-4 relative space-y-4">
        <SelectWithSearch data={data} placeholder="Select a time zone" />
      </div>
    );
  }