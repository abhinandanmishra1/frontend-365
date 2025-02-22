import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";

import { ChevronDown, ChevronRight, File, Folder, Plus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileClick,
  selectedFile,
  onAddFile,
}) => {
  const {
    addingItem,
    fileStructure,
    toggleFolder,
    handleAddItem,
    handleRemoveAddItem,
    confirmAddItem,
    newItemName,
    setNewItemName,
  } = useFileExplorer({ initialFileStructure: files, onAddFile });

  const renderItem = (item: FileItem | FolderItem, depth: number = 0) => {
    const paddingLeft = depth * 12;
    if (item.type === "folder") {
      return (
        <div key={item.id}>
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer"
            style={{ paddingLeft: `${paddingLeft}px` }}
            onClick={() => toggleFolder(item.id)}
          >
            {item.isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <Folder size={16} className="mr-2" />
            <span>{item.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem(item.id, "file");
              }}
              className="ml-2"
            >
              <AddIcon type="file" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem(item.id, "folder");
              }}
              className="ml-2"
            >
              <AddIcon type="folder" />
            </button>
          </div>
          {item.isOpen && item.children && (
            <div>
              {item.children.map((child) => renderItem(child, depth + 1))}
              {addingItem?.parentId === item.id && (
                <div
                  className="flex items-center py-1 px-2"
                  style={{ paddingLeft: `${(depth + 1) * 12}px` }}
                >
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onBlur={confirmAddItem}
                    placeholder={`Enter ${addingItem.type} name`}
                    onKeyPress={(e) => e.key === "Enter" && confirmAddItem()}
                    className="bg-gray-800 text-white p-1 rounded"
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={item.id}
        className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer ${
          selectedFile?.id === item.id ? "bg-gray-700" : ""
        }`}
        style={{ paddingLeft: `${paddingLeft + 16}px` }}
        onClick={() => onFileClick(item)}
      >
        <File size={16} className="mr-2" />
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto text-sm">
      {renderItem(fileStructure)}
    </div>
  );
};

const CodeEditor: React.FC = () => {
  const {
    selectedFile,
    selectedTheme,
    files,
    fontSize,
    handleFileClick,
    handleCodeChange,
    getFileLanguage,
    handleAddFile,
    setSelectedTheme,
    setFontSize,
  } = useCodeEditor();

  return (
    <div className="flex h-[500px] bg-gray-900 text-white rounded-lg overflow-hidden">
      {/* File Explorer */}
      <div className="w-64 border-r border-gray-700 p-2">
        <div className="mb-4">
          <Select
            value={selectedTheme}
            onValueChange={(value: ThemeType) => setSelectedTheme(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(themes) as ThemeType[]).map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Select
            value={fontSize.toString()}
            onValueChange={(value) => setFontSize(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font size" />
            </SelectTrigger>
            <SelectContent>
              {[12, 14, 16, 18, 20].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FileExplorer
          files={files}
          onFileClick={handleFileClick}
          selectedFile={selectedFile}
          onAddFile={handleAddFile}
        />
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        {selectedFile ? (
          <>
            <textarea
              className="text-[14px] leading-[1.5] absolute inset-0 w-full h-full p-4 font-mono text-transparent bg-transparent resize-none outline-none caret-white z-10"
              value={selectedFile.content}
              onChange={handleCodeChange}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              style={{ fontSize: `${fontSize}px` }}
            />
            <div className="absolute inset-0 p-4 pointer-events-none">
              <SyntaxHighlighter
                language={getFileLanguage(selectedFile.name)}
                style={themes[selectedTheme]}
                customStyle={{
                  background: "transparent",
                  margin: 0,
                  padding: 0,
                  fontSize: `${fontSize}px`,
                  lineHeight: "1.5",
                }}
              >
                {selectedFile.content}
              </SyntaxHighlighter>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a file to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default function Project23() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <CodeEditor />
    </div>
  );
}

interface AddIconProps {
  type: "file" | "folder";
}
const AddIcon = ({ type }: AddIconProps) => {
  return (
    <div className="relative">
      {type === "file" ? <File size={16} /> : <Folder size={16} />}
      <Plus
        size={8}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

// hooks
interface useFileExplorerProps {
  initialFileStructure: FileStructure;
  onAddFile: (parentId: string, name: string, type: "file" | "folder") => void;
}

const useFileExplorer = ({
  initialFileStructure,
  onAddFile,
}: useFileExplorerProps) => {
  const [fileStructure, setFileStructure] =
    useState<FileStructure>(initialFileStructure);
  const [newItemName, setNewItemName] = useState<string>("");
  const [addingItem, setAddingItem] = useState<{
    parentId: string;
    type: "file" | "folder";
  } | null>(null);

  useEffect(() => {
    setFileStructure(initialFileStructure);
  }, [initialFileStructure]);

  const toggleFolder = (id: string): void => {
    const updateStructure = (
      items: (FileItem | FolderItem)[]
    ): (FileItem | FolderItem)[] => {
      return items.map((item) => {
        if (item.id === id && item.type === "folder") {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.type === "folder") {
          return { ...item, children: updateStructure(item.children) };
        }
        return item;
      });
    };
    setFileStructure((prev) => ({
      ...prev,
      children: updateStructure(prev.children),
    }));
  };

  const handleAddItem = (parentId: string, type: "file" | "folder") => {
    setAddingItem({ parentId, type });
    setNewItemName("");
  };

  const handleRemoveAddItem = useCallback(() => {
    setAddingItem(null);
  }, []);

  const confirmAddItem = () => {
    if (newItemName.trim() && addingItem) {
      onAddFile(addingItem.parentId, newItemName, addingItem.type);
      setAddingItem(null);
    }
  };

  return {
    addingItem,
    fileStructure,
    toggleFolder,
    handleAddItem,
    handleRemoveAddItem,
    confirmAddItem,
    newItemName,
    setNewItemName,
  };
};
const useCodeEditor = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("darcula");
  const [files, setFiles] = useState<FileStructure>(initialFiles);
  const [fontSize, setFontSize] = useState<number>(14);

  const handleFileClick = (file: FileItem): void => {
    setSelectedFile(file);
  };

  const handleCodeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const updatedContent = event.target.value;

    const updateFileContent = (
      items: (FileItem | FolderItem)[]
    ): (FileItem | FolderItem)[] => {
      return items.map((item) => {
        if (item.id === selectedFile?.id) {
          return { ...item, content: updatedContent };
        }
        if (item.type === "folder") {
          return { ...item, children: updateFileContent(item.children) };
        }
        return item;
      });
    };

    setFiles((prev) => ({
      ...prev,
      children: updateFileContent(prev.children),
    }));

    setSelectedFile((prev) =>
      prev ? { ...prev, content: updatedContent } : null
    );
  };

  const getFileLanguage = (filename: string): string => {
    const ext = filename.split(".").pop() as FileExtensionType;
    return fileExtToLanguage[ext] || "text";
  };

  const handleAddFile = (
    parentId: string,
    name: string,
    type: "file" | "folder"
  ) => {
    let newItem: FileItem | FolderItem;
    if (type === "file") {
      newItem = { id: `${Date.now()}`, name, type: "file", content: "" };
    } else {
      newItem = {
        id: `${Date.now()}`,
        name,
        type: "folder",
        isOpen: false,
        children: [],
      };
    }

    const updateStructure = (
      items: (FileItem | FolderItem)[]
    ): (FileItem | FolderItem)[] => {
      const result = items.map((item) => {
        if (item.id === parentId && item.type === "folder") {
          return {
            ...item,
            children: [...item.children, newItem].sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          };
        }
        if (item.type === "folder") {
          return { ...item, children: updateStructure(item.children) };
        }
        return item;
      });

      return result;
    };

    setFiles((prev) => ({
      ...prev,
      children: updateStructure(prev.children),
    }));
  };

  return {
    selectedFile,
    selectedTheme,
    files,
    fontSize,
    handleFileClick,
    handleCodeChange,
    getFileLanguage,
    handleAddFile,
    setSelectedTheme,
    setFontSize,
  };
};


// Types
type FileExtensionType = keyof typeof fileExtToLanguage;

type BaseItem = {
  id: string;
  name: string;
  type: "file" | "folder";
};

type FileItem = BaseItem & {
  type: "file";
  content: string;
};

type FolderItem = BaseItem & {
  type: "folder";
  isOpen: boolean;
  children: (FileItem | FolderItem)[];
};

type FileStructure = FolderItem;

type FileExplorerProps = {
  files: FileStructure;
  onFileClick: (file: FileItem) => void;
  selectedFile: FileItem | null;
  onAddFile: (parentId: string, name: string, type: "file" | "folder") => void;
};

type ThemeType = keyof typeof themes;

// File type to language mapping
const fileExtToLanguage: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "typescript",
  html: "html",
  css: "css",
  py: "python",
  json: "json",
};

// Initial file structure
const initialFiles: FileStructure = {
  id: "root",
  name: "project",
  type: "folder",
  isOpen: true,
  children: [
    {
      id: "1",
      name: "src",
      type: "folder",
      isOpen: true,
      children: [
        {
          id: "2",
          name: "App.tsx",
          type: "file",
          content:
            'import React from "react";\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;',
        },
        {
          id: "3",
          name: "styles.css",
          type: "file",
          content:
            "body {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}",
        },
      ],
    },
    {
      id: "4",
      name: "package.json",
      type: "file",
      content: '{\n  "name": "project",\n  "version": "1.0.0"\n}',
    },
  ],
};