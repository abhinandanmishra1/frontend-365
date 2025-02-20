import { ChangeEvent, useMemo, useState } from "react";
import { File, Upload } from "lucide-react";

import { cn } from "@/lib/utils";

interface FileUploadInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "value"> {
  label: string;
  value?: File;
}

const DragAndDropFileInput = ({
  type: _,
  id,
  value: initialValue,
  onChange,
  label,
  className,
  ...props
}: FileUploadInputProps) => {
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || "");
    if (onChange) {
      onChange(e);
    }
  };

  const inputId = useMemo(() => {
    return id || `file-input-${Date.now()}`;
  }, [id]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      // Create a new event to pass to onChange
      const newEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(newEvent);
      }
    }
  };

  return (
    <div
      className={`border-gray-300 flex flex-col items-center gap-6 rounded-lg p-4 border-dashed border-4 w-[250px] h-[250px] transition-colors duration-200 ${
        isDragging ? "border-black bg-gray-50" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      aria-label={`Upload ${label}`}
      tabIndex={0}
    >
      {fileName ? (
        <div className="flex flex-col items-center gap-4 justify-center h-full">
          <File className="w-14 h-14 text-[#737474]" />
          <p className="text-[#737474] text-center break-all max-w-full px-4">
            {fileName}
          </p>
        </div>
      ) : (
        <>
          <Upload
            className={cn("w-14 h-14 text-[#737474]", {
              "text-[#353535]": isDragging,
            })}
          />
          <div className="flex flex-col items-center gap-2 text-[#737474]">
            <p
              className={cn({
                "text-[#353535]": isDragging,
              })}
            >
              Drag and Drop
            </p>
            <p
              className={cn({
                "text-[#353535]": isDragging,
              })}
            >
              or
            </p>
            <div className="mt-2">
              <input
                type="file"
                id={inputId}
                className="appearance-none hidden"
                onChange={handleChange}
                aria-label={label}
                {...props}
              />
              <label
                className={cn(
                  "bg-[#737474] cursor-pointer px-3 py-2 hover:bg-[#353535] rounded text-white",
                  {
                    "bg-[#353535]": isDragging,
                  }
                )}
                htmlFor={inputId}
              >
                Browse Files
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Project24() {
  const [value, setValue] = useState<File>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <DragAndDropFileInput
        label="File input"
        value={value}
        id="profile-image"
        onChange={onChange}
      />
    </div>
  );
}
