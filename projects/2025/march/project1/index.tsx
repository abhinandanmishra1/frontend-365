import React, { ReactNode, useEffect, useState } from "react";

import { Grip } from "lucide-react";

interface DraggableItemProps {
  id: string;
  index: number;
  draggable: boolean;
  isDragging: boolean;
  isOver: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  children: ReactNode;
  className?: string;
}

const DraggableItem = ({
  id,
  index,
  draggable,
  isDragging,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  children,
  className = "",
}: DraggableItemProps) => {
  return (
    <li className="relative" data-index={index} data-id={id}>
      <div
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          transition-all duration-200
          ${isDragging ? "opacity-50" : "opacity-100"}
          ${className}
        `}
      >
        {children}
      </div>

      {isOver && (
        <div
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="w-full h-12 my-2 bg-blue-200 rounded transition-all duration-200"
        />
      )}
    </li>
  );
};

interface DraggableListProps<T> {
  items: T[];
  onChange?: (items: T[]) => void;
  editable?: boolean;
  keyExtractor: (item: T) => string;
  children: (props: {
    item: T;
    index: number;
    isDragging: boolean;
    isOver: boolean;
    dragHandleProps: {
      className: string;
    };
  }) => ReactNode;
  className?: string;
  itemClassName?: string;
}

function DraggableList<T>({
  items,
  onChange,
  editable = true,
  keyExtractor,
  children,
  className = "",
  itemClassName = "",
}: DraggableListProps<T>) {
  const [listItems, setListItems] = useState<T[]>(items);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  useEffect(() => {
    onChange?.(listItems);
  }, [listItems, onChange]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!editable) return;

    e.dataTransfer.setData("text", id);
    setDraggedItemId(id);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!editable) return;

    e.preventDefault();

    const itemId = keyExtractor(listItems[index]);
    if (draggedItemId && draggedItemId !== itemId) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest(".draggable-list-container")) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    if (!draggedItemId || !editable) return;

    const sourceIndex = listItems.findIndex(
      (item) => keyExtractor(item) === draggedItemId
    );

    if (sourceIndex === targetIndex) return;

    const newItems = [...listItems];
    const [movedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);

    setListItems(newItems);
    setDraggedItemId(null);
    setDragOverIndex(null);
  };

  return (
    <div className={`draggable-list-container w-full ${className}`}>
      <ul className="space-y-3 relative">
        {listItems.map((item, index) => {
          const id = keyExtractor(item);
          const isDragging = draggedItemId === id;
          const isOver = dragOverIndex === index;

          return (
            <DraggableItem
              key={id}
              id={id}
              index={index}
              draggable={editable}
              isDragging={isDragging}
              isOver={isOver}
              onDragStart={(e) => handleDragStart(e, id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={itemClassName}
            >
              {children({
                item,
                index,
                isDragging,
                isOver,
                dragHandleProps: {
                  className: "flex-shrink-0 text-gray-400",
                },
              })}
            </DraggableItem>
          );
        })}
      </ul>
    </div>
  );
}

interface Task {
  id: string;
  title: string;
  description?: string;
  color?: string;
}

const TaskItem = ({
  task,
  isDragging,
  isOver,
  dragHandleProps,
  onDelete,
  onToggleExpand,
  isExpanded,
}: {
  task: Task;
  isDragging: boolean;
  isOver: boolean;
  dragHandleProps: { className: string };
  onDelete: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
}) => {
  // Color mapping for tasks
  const getColorClasses = (color: string | undefined) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
      pink: "bg-pink-50 border-pink-200 text-pink-700",
      red: "bg-red-50 border-red-200 text-red-700",
      orange: "bg-orange-50 border-orange-200 text-orange-700",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
      green: "bg-green-50 border-green-200 text-green-700",
      teal: "bg-teal-50 border-teal-200 text-teal-700",
      cyan: "bg-cyan-50 border-cyan-200 text-cyan-700",
    };

    return color && colorMap[color]
      ? colorMap[color]
      : "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <div
      className={`
      p-4 border rounded-lg shadow-sm cursor-move
      transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
      ${getColorClasses(task.color)}
      ${isExpanded ? "ring-2 ring-offset-2 ring-blue-500" : ""}
    `}
    >
      <div className="flex justify-between items-center gap-3">
        <div className={dragHandleProps.className}>
          <Grip size={18} />
        </div>

        <div className="flex-grow font-medium">{task.title}</div>

        <div className="flex-shrink-0 flex gap-2">
          {task.description && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
            >
              {isExpanded ? "Hide" : "Show"}
            </button>
          )}

          <button
            type="button"
            onClick={onDelete}
            className="p-1 rounded-full hover:bg-red-100 text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {isExpanded && task.description && (
        <div className="mt-2 text-sm opacity-75">{task.description}</div>
      )}
    </div>
  );
};

export default function Project1() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Project Setup",
      description:
        "Initialize repository and configure development environment",
      color: "blue",
    },
    {
      id: "2",
      title: "UI Design",
      description:
        "Create wireframes and mockups for the application interface",
      color: "purple",
    },
    {
      id: "3",
      title: "Frontend Development",
      description: "Implement responsive components using React and Tailwind",
      color: "green",
    },
    {
      id: "4",
      title: "Backend Integration",
      description: "Connect frontend with API endpoints and handle data flow",
      color: "orange",
    },
    {
      id: "5",
      title: "Testing & QA",
      description: "Perform unit testing and quality assurance",
      color: "red",
    },
  ]);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleChange = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const toggleItemExpanded = (id: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) return;

    const colors = [
      "blue",
      "indigo",
      "purple",
      "pink",
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "cyan",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: "",
      color: randomColor,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  return (
    <div className="w-full p-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Task Priority List
        </h2>
        <p className="text-gray-600">
          Drag and drop items to reorder your tasks
        </p>
      </div>

      <DraggableList
        items={tasks}
        onChange={handleChange}
        keyExtractor={(task) => task.id}
      >
        {({ item, isDragging, isOver, dragHandleProps }) => (
          <TaskItem
            task={item}
            isDragging={isDragging}
            isOver={isOver}
            dragHandleProps={dragHandleProps}
            onDelete={() => deleteTask(item.id)}
            onToggleExpand={() => toggleItemExpanded(item.id)}
            isExpanded={expandedItems.has(item.id)}
          />
        )}
      </DraggableList>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <button
            onClick={addNewTask}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
