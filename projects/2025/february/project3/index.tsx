import { CloudUpload, File, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface FileUploadInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const FileUploadInput = ({
  type: _,
  id,
  value,
  onChange,
  label,
  className,
  ...props
}: FileUploadInputProps) => {
  const id_ = id || props.name || "file-upload";
  const ref = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || "");
    if (onChange) {
      onChange(e);
    }
  };

  const handleRemoveSelectedFile = () => {
    setFileName("");
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && ref.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      ref.current.files = dataTransfer.files;
      setFileName(file.name);

      const event = new Event("change", { bubbles: true });
      ref.current.dispatchEvent(event);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  console.log("render", dragOver);
  return (
    <div className="space-y-2 max-w-[400px]">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        htmlFor={id_}
        className={cn("relative", {
          "bg-blue-800": dragOver,
          "bg-blue-50": !dragOver,
        })}
      >
        <div className="flex flex-col gap-2 border-dotted border-blue-400 border-spacing-2 border-2 p-4 rounded-md cursor-pointer items-center">
          <CloudUpload className="w-32 h-32 text-blue-400" />
          {label}
        </div>
      </label>

      <div className="flex justify-between p-2 bg-blue-50 rounded-md items-center gap-2">
        <File className="fill-blue-400 text-blue-800 cursor-pointer" />
        <p className="text-sm text-gray-600 line-clamp-1">
          {fileName || "No file selected"}
        </p>
        <Trash2
          onClick={handleRemoveSelectedFile}
          className="fill-red-400 text-red-800 cursor-pointer"
        />
      </div>

      <input
        id={id_}
        ref={ref}
        className={cn("hidden", className)}
        type="file"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default function Project3() {
  return (
    <div className="p-4">
      <FileUploadInput label="Upload file" />
    </div>
  );
}
