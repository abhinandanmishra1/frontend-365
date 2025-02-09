import { useState } from "react";

interface DraggableItem {
  title: string;
  id: string;
  onClick?: (item: DraggableItem) => void;
  className?: string;
}

interface DraggableListProps {
  items: DraggableItem[];
}

const DraggableList = ({ items }: DraggableListProps) => {
  const [listItems, setListItems] = useState(items);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: DraggableItem,
    index: number
  ) => {
    e.dataTransfer.setData("text", item.id);
    e.currentTarget.classList.add("opacity-50");
    setDraggedItem(item);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50");
    setDragOverIndex(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== listItems[index].id) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest("ul")) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    if (!draggedItem) return;

    const sourceIndex = listItems.findIndex(
      (item) => item.id === draggedItem.id
    );
    if (sourceIndex === targetIndex) return;

    const newItems = [...listItems];
    newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setListItems(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <ul className="space-y-2 relative">
      {listItems.map((item, index) => (
        <li key={item.id} className="relative">  
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, item, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            className={`
              p-4 bg-white border rounded-lg shadow-sm 
              cursor-move hover:bg-gray-50 
              transition-all duration-200
              ${dragOverIndex === index ? "bg-blue-90" : ""}
              ${draggedItem?.id === item.id ? "opacity-50" : "opacity-100 block"}
              ${item.className || ""}
            `}
            onClick={() => item.onClick?.(item)}
          >
            {item.title}
          </div>
          {dragOverIndex === index && (
            <div onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}  className="w-full h-12 my-2 bg-gray-200 rounded transition-all duration-200" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Project10() {
  const ListItems = [
    { title: "Item 1", id: "1" },
    { title: "Item 2", id: "2" },
    { title: "Item 3", id: "3" },
    { title: "Item 4", id: "4" },
    { title: "Item 5", id: "5" },
  ];

  return (
    <div className="w-full p-4 relative space-y-4">
      <h2 className="text-2xl font-bold">Draggable List</h2>
      <DraggableList items={ListItems} />
    </div>
  );
}
