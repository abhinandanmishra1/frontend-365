import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Copy, Download, Edit, MoreHorizontal, Share, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type ContextMenuComponentProps = {
  children: React.ReactNode;
  onCopy?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
};

const ContextMenuComponent: React.FC<ContextMenuComponentProps> = ({
  children,
  onCopy = () => console.log('Copy action triggered'),
  onDelete = () => console.log('Delete action triggered'),
  onEdit = () => console.log('Edit action triggered'),
  onShare = () => console.log('Share action triggered'),
  onDownload = () => console.log('Download action triggered'),
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="block">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={onEdit} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={onCopy} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onShare} className="cursor-pointer">
          <Share className="mr-2 h-4 w-4" />
          Share
        </ContextMenuItem>
        <ContextMenuItem onClick={onDownload} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger className="cursor-pointer">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            More Options
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem className="cursor-pointer">
              Add to favorites
            </ContextMenuItem>
            <ContextMenuItem className="cursor-pointer">
              Add to collection
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem 
          onClick={onDelete} 
          className="text-red-600 cursor-pointer focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default function Project9() {
  const items = [
    { id: 1, title: "Document 1", description: "Description for document 1" },
    { id: 2, title: "Document 2", description: "Description for document 2" },
    { id: 3, title: "Document 3", description: "Description for document 3" },
  ];

  const handleAction = (action: string, id: number) => {
    console.log(`${action} action triggered for item ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <p className="mb-4 text-gray-600">Right-click on any card to open the context menu.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ContextMenuComponent
            key={item.id}
            onCopy={() => handleAction('Copy', item.id)}
            onDelete={() => handleAction('Delete', item.id)}
            onEdit={() => handleAction('Edit', item.id)}
            onShare={() => handleAction('Share', item.id)}
            onDownload={() => handleAction('Download', item.id)}
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
              <div className="mt-2 text-sm text-gray-400">Right-click for options</div>
            </div>
          </ContextMenuComponent>
        ))}
      </div>
    </div>
  );
}
