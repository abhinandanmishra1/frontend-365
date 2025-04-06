import { X } from "lucide-react";
import { useState } from "react";

interface TagInputFieldProps {
  placeholder?: string;
  onTagsChange?: (tags: string[]) => void;
  maxTags?: number;
  className?: string;
}

const TagInputField = ({
  placeholder = "Enter tags...",
  onTagsChange,
  maxTags = Infinity,
  className = "",
}: TagInputFieldProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === ",") && inputValue.trim() !== "") {
      event.preventDefault();
      if (tags.length < maxTags) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        onTagsChange?.(newTags);
        setInputValue("");
      }
    }
    
    if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onTagsChange?.(newTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  return (
    <div 
      className={`flex flex-wrap items-center gap-2 border rounded-md p-2 ${isFocused ? "ring-2 ring-blue-500" : ""} ${className}`}
      onClick={() => document.getElementById("tag-input")?.focus()}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-sm"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <input
        id="tag-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-2 flex-1 border-none outline-none"
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  );
};

export default function Project6() {
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  return (
    <div className="max-w-2xl p-6">
      <div className="space-y-4">
        <label htmlFor="tag-input" className="block text-sm font-medium">
          Add Tags (Try typing and pressing Enter)
        </label>
        <TagInputField 
          onTagsChange={setCurrentTags} 
          maxTags={15}
          placeholder="Enter tag.."
        />
      </div>
    </div>
  );
}
