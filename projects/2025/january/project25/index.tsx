import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import React, { createContext, useContext, useState } from "react";

interface ToastType {
  message: string;
  type: "success" | "error" | "info" | "warning";
  id: number;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
  };
  toasts: ToastType[];
}

const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const open = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    const newToast: ToastType = {
      type,
      message,
      id: Date.now(),
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 5000);
  };

  const toast = {
    success: (message: string) => open(message, "success"),
    error: (message: string) => open(message, "error"),
    info: (message: string) => open(message, "info"),
    warning: (message: string) => open(message, "warning"),
  };

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const Toast = ({ toast }: { toast: ToastType }) => {
  const iconMap = {
    success: <CheckCircle2 className="text-green-500" />,
    error: <AlertCircle className="text-red-500" />,
    info: <Info className="text-blue-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
  };

  const bgColorMap = {
    success: "bg-green-50",
    error: "bg-red-50",
    info: "bg-blue-50",
    warning: "bg-yellow-50",
  };

  return (
    <div
      className={`
        flex items-center justify-between 
        p-4 rounded-lg shadow-md 
        ${bgColorMap[toast.type]} 
        border border-opacity-50
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex items-center space-x-3">
        {iconMap[toast.type]}
        <span className="text-gray-800">{toast.message}</span>
      </div>
    </div>
  );
};

const ToastList = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-x-4">
      <h1 className="text-2xl font-bold mb-4">Toast Notification Demo</h1>
      <button
        onClick={() => toast.success("Operation successful!")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Success
      </button>
      <button
        onClick={() => toast.error("Something went wrong!")}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Error
      </button>
      <button
        onClick={() => toast.info("Here's some information")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Info
      </button>
      <button
        onClick={() => toast.warning("Proceed with caution")}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Warning
      </button>
    </div>
  );
};
export default function Project25() {
  return (
    <ToastProvider>
      <ToastDemo />
      <ToastList />
    </ToastProvider>
  );
}
