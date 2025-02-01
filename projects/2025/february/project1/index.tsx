import { Check, Pencil, X } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableTextFieldProps {
  initialValue?: string;
  placeholder?: string;
  onSave?: (value: string) => void;
  startEditing?: boolean;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  showIcon?: boolean;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  initialValue = "",
  onSave = () => {},
  placeholder = "Click to edit...",
  startEditing = false,
  className = "",
  disabled = false,
  maxLength,
  showIcon,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(startEditing);
  const [value, setValue] = useState<string>(initialValue);
  const [tempValue, setTempValue] = useState<string>(initialValue);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setTempValue(newValue);
  };

  const handleSave = (): void => {
    if (tempValue !== value) {
      setValue(tempValue);
      onSave(tempValue);
    }
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleStartEditing = (): void => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Input
          value={tempValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1"
          autoFocus
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
          disabled={disabled}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onClick={handleStartEditing}
      className={cn(
        "group flex items-center gap-2 px-3 py-2 rounded-md border border-transparent hover:border-gray-200 cursor-pointer",
        {
          "opacity-50 cursor-not-allowed hover:border-transparent": disabled,
        },
        className
      )}
    >
      <span className="flex-1">
        {value || <span className="text-gray-400">{placeholder}</span>}
      </span>
      {!disabled && showIcon && (
        <Pencil className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

export default function Project1() {
  const handleSave = (newValue: string): void => {
    console.log("Saved:", newValue);
  };

  return (
    <div className="w-full max-w-md p-4 space-y-4">
      <EditableTextField initialValue="Click me to edit" onSave={handleSave} />
      <EditableTextField
        placeholder="Add a new item..."
        onSave={handleSave}
        maxLength={50}
        showIcon
      />
      <EditableTextField initialValue="Disabled field" disabled />
    </div>
  );
}
