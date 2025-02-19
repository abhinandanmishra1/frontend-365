import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type Direction = "horizontal" | "vertical";

interface PanelGroupContext {
  direction: Direction;
  isResizing: boolean;
  setIsResizing: (value: boolean) => void;
}

const PanelGroupContext = createContext<PanelGroupContext | null>(null);

interface ResizablePanelGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  children: React.ReactNode;
  maxHeight?: number; // maxHeight is mandatory for vertical height
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  maxHeight,
  ...props
}: ResizablePanelGroupProps) {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <PanelGroupContext.Provider
      value={{ direction, isResizing, setIsResizing }}
    >
      <div
        className={cn(
          "flex",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        style={{
            maxHeight,
            height: maxHeight,
        }}
        {...props}
      >
        {children}
      </div>
    </PanelGroupContext.Provider>
  );
}

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize: number;
  minSize?: number;
  children: React.ReactNode;
}

export function ResizablePanel({
  defaultSize,
  minSize = 20,
  className,
  children,
  ...props
}: ResizablePanelProps) {
  const [size, setSize] = useState(defaultSize);
  const context = useContext(PanelGroupContext);

  if (!context) {
    throw new Error("ResizablePanel must be used within a ResizablePanelGroup");
  }

  return (
    <div
      className={cn("flex-grow", className)}
      style={{
        [context.direction === "horizontal" ? "width" : "height"]: `${size}%`,
        minWidth:
          context.direction === "horizontal" ? `${minSize}%` : undefined,
        minHeight: context.direction === "vertical" ? `${minSize}%` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResizableHandle({ className, ...props }: ResizableHandleProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const context = useContext(PanelGroupContext);

  if (!context) {
    throw new Error(
      "ResizableHandle must be used within a ResizablePanelGroup"
    );
  }

  const { direction, setIsResizing } = context;

  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      const handleResize = (e: MouseEvent) => {
        const container = handle.parentElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const prevPanel = handle.previousElementSibling as HTMLElement;
        const nextPanel = handle.nextElementSibling as HTMLElement;

        if (!prevPanel || !nextPanel) return;

        const isHorizontal = direction === "horizontal";
        const containerSize = isHorizontal
          ? containerRect.width
          : containerRect.height;
        const mousePosition = isHorizontal
          ? e.clientX - containerRect.left
          : e.clientY - containerRect.top;

        const newPrevSize = (mousePosition / containerSize) * 100;
        const newNextSize = 100 - newPrevSize;

        if (newPrevSize >= 20 && newNextSize >= 20) {
          if (isHorizontal) {
            prevPanel.style.width = `${newPrevSize}%`;
            nextPanel.style.width = `${newNextSize}%`;
          } else {
            prevPanel.style.height = `${newPrevSize}%`;
            nextPanel.style.height = `${newNextSize}%`;
          }
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", handleMouseUp);
    };

    handle.addEventListener("mousedown", handleMouseDown);
    return () => {
      handle.removeEventListener("mousedown", handleMouseDown);
    };
  }, [direction, setIsResizing]);

  return (
    <div
      ref={handleRef}
      className={cn(
        "flex items-center justify-center bg-gray-200 transition-colors hover:bg-blue-500 active:bg-blue-600",
        direction === "horizontal"
          ? "w-1 cursor-col-resize"
          : "h-1 cursor-row-resize",
        className
      )}
      {...props}
    />
  );
}

export default function Project21() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical" maxHeight={200}>
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
