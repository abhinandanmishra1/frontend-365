import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Grip, MoreHorizontal, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Column {
  id: string;
  name: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface KanbanBoardLayoutProps {
  columns: Column[];
  tasks: Task[];
  onTaskMove?: (taskId: number, newStatus: string) => void;
  onTaskAdd?: (task: Omit<Task, "id">) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
}

const TaskCard = ({
  task,
  onDragStart,
  onEdit,
  onDelete,
}: {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}) => {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="mb-3 cursor-move hover:shadow-md transition-shadow relative group"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <Grip
            className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            size={16}
          />
        </div>

        <div className="absolute top-2 right-2 bg-white shadow-lg rounded-lg p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 hover:bg-gray-100 rounded text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AddTaskDialog = ({
  column,
  onAdd,
}: {
  column: Column;
  onAdd: (task: Omit<Task, "id">) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      status: column.id,
    });
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Plus size={20} className="text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task to {column.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Task description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              required
            />
          </div>
          <Button type="submit">Add Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const KanbanBoardLayout = ({
  columns,
  tasks: initialTasks,
  onTaskMove,
  onTaskAdd,
  onTaskEdit,
  onTaskDelete,
}: KanbanBoardLayoutProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggingOver, setDraggingOver] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id.toString());
  };

  const handleDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDraggingOver(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDraggingOver(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, columnId: string) => {
      e.preventDefault();
      setDraggingOver(null);

      if (!draggedTask) return;

      const newTasks = tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: columnId } : task
      );

      setTasks(newTasks);
      setDraggedTask(null);

      if (onTaskMove) {
        onTaskMove(draggedTask.id, columnId);
      }
    },
    [draggedTask, tasks, onTaskMove]
  );

  const handleTaskAdd = useCallback(
    (newTask: Omit<Task, "id">) => {
      const task = {
        ...newTask,
        id: Math.max(...tasks.map((t) => t.id)) + 1,
      };
      setTasks((prev) => [...prev, task]);
      if (onTaskAdd) {
        onTaskAdd(newTask);
      }
    },
    [tasks, onTaskAdd]
  );

  const handleTaskEdit = useCallback(
    (editedTask: Task) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
      if (onTaskEdit) {
        onTaskEdit(editedTask);
      }
    },
    [onTaskEdit]
  );

  const handleTaskDelete = useCallback(
    (taskId: number) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      if (onTaskDelete) {
        onTaskDelete(taskId);
      }
    },
    [onTaskDelete]
  );

  return (
    <div className="flex gap-6 overflow-x-auto p-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80"
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div
            className={cn("bg-gray-50 rounded-lg p-4 transition-colors", {
              "bg-gray-100 ring-2 ring-blue-400 ring-opacity-50":
                draggingOver === column.id,
            })}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  {column.name}
                </h2>
                <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-full">
                  {tasks.filter((task) => task.status === column.id).length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AddTaskDialog column={column} onAdd={handleTaskAdd} />
                <button className="p-1 hover:bg-gray-200 rounded">
                  <MoreHorizontal size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="min-h-[200px]">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDragStart={handleDragStart}
                    onEdit={handleTaskEdit}
                    onDelete={handleTaskDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Project22() {
  const handleTaskMove = (taskId: number, newStatus: string) => {
    console.log(`Task ${taskId} moved to ${newStatus}`);
  };

  const handleTaskAdd = (task: Omit<Task, "id">) => {
    console.log("New task added:", task);
  };

  const handleTaskEdit = (task: Task) => {
    console.log("Task edited:", task);
  };

  const handleTaskDelete = (taskId: number) => {
    console.log("Task deleted:", taskId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <KanbanBoardLayout
        columns={[
          { id: "todo", name: "To-Do" },
          { id: "inprogress", name: "In Progress" },
          { id: "done", name: "Done" },
        ]}
        tasks={[
          {
            id: 1,
            title: "Task 1",
            description: "This is task 1",
            status: "todo",
          },
          {
            id: 2,
            title: "Task 2",
            description: "This is task 2",
            status: "inprogress",
          },
          {
            id: 3,
            title: "Task 3",
            description: "This is task 3",
            status: "inprogress",
          },
          {
            id: 4,
            title: "Task 4",
            description: "This is task 4",
            status: "todo",
          },
          {
            id: 5,
            title: "Task 5",
            description: "This is task 5",
            status: "done",
          },
        ]}
        onTaskMove={handleTaskMove}
        onTaskAdd={handleTaskAdd}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}
