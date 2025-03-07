import React, { useCallback, useState } from "react";

import { Trash2 } from "lucide-react";

const FileUploadZone = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    },
    []
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div
        className="w-full max-w-md p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-500">Drag & drop files here or</p>
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
        >
          browse your files
        </label>
      </div>

      {files.length > 0 && (
        <FilesList files={files} onDelete={handleDelete} />
      )}

      {
        files.length === 0 && (
          <p className="text-gray-500">No files uploaded</p>
        )
      }
    </div>
  );
};

const FilesList = ({ files, onDelete }: { files: File[]; onDelete: (index: number) => void}) => {
    return <div className="w-full max-w-md space-y-2">
    {files.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-2 border rounded-lg"
      >
        <span className="text-sm text-gray-700">{file.name}</span>
        <button
          onClick={() => onDelete(index)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
}

export default function Project7() {
  return (
    <div className="h-72 max-h-full flex flex-col items-center justify-center bg-gray-50">
      <FileUploadZone />
    </div>
  );
}
