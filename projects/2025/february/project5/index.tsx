import { InputHTMLAttributes, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AutoSaveInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const AutoSaveInput = ({
  className,
  id,
  value,
  onChange,
  ...props
}: AutoSaveInputProps) => {
  const [currValue, setValue] = useState(value);

  useEffect(() => {
    const value = localStorage.getItem(id);
    if (value) {
      setValue(value);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
    localStorage.setItem(id, e.target.value);
  };
  return (
    <Input
      value={currValue}
      onChange={handleChange}
      className={cn("w-full p-2", className)}
      id={id}
      {...props}
    />
  );
};

export default function Project5() {
  return (
    <div className="p-4 flex gap-2 items-center">
      <h1 className="w-44">Autosave Input: </h1>
      <AutoSaveInput className="p-4" placeholder="Write something..." id="project5" />
    </div>
  );
}
