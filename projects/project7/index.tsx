import { CheckIcon, InfoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode | string;
  type?: "info" | "warning" | "error" | "success";
  className?: string;
  showIcon?: boolean;
}

const Tooltip = ({
  children,
  content,
  className = "",
  type = "info",
  showIcon = true,
}: TooltipProps) => {
  return (
    <div className={cn(`relative group cursor-pointer`, className)}>
      {children}
      <div
        className={cn(
          `absolute invisible z-[100] opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2`
        )}
      >
        {typeof content === "string" ? (
          <div className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
            <div className="flex items-center gap-3 mb-2">
              {showIcon && (
                <div
                  className={cn(
                    `flex items-center justify-center w-8 h-8 rounded-full ${
                      type === "success" && "bg-green-500/20"
                    } ${type === "error" && "bg-red-500/20"} ${
                      type === "info" && "bg-indigo-500/20"
                    } ${type === "warning" && "bg-yellow-500/20"}`
                  )}
                >
                  <InfoIcon
                    className={cn(
                      `w-4 h-4 ${type === "success" && "text-green-400"} ${
                        type === "error" && "text-red-400"
                      } ${type === "info" && "text-indigo-400"} ${
                        type === "warning" && "text-yellow-400"
                      }`
                    )}
                  />
                </div>
              )}
              <p className="text-sm text-white">{content}</p>
            </div>
          </div>
        ) : (
          <>{content}</>
        )}
        <div
          className={cn(
            `absolute inset-0 rounded-2xl bg-gradient-to-r ${
              type === "info" && "from-indigo-500/20 to-purple-500/20"
            }
            ${type === "warning" && "from-yellow-500/20 to-orange-500/20"}
            ${type === "error" && "from-red-500/20 to-pink-500/20"}
            ${type === "success" && "from-green-500/20 to-teal-500/20"}
            blur-xl opacity-50`
          )}
        ></div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"></div>
      </div>
    </div>
  );
};

export default function Project7() {
  const CustomTooltipContent = () => {
    return (
      <div className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
            <InfoIcon className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Important Information
          </h3>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-300">
            This is a tooltip with detailed information and custom styling.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckIcon className="w-4 h-4" />
            <span>Premium Feature</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex gap-4 w-full flex-wrap p-4">
      <Tooltip className="w-40" content="Success Tooltip" type="success">
        <h1 className="relative px-6 py-3 text-sm font-semibold text-white bg-green-600/90 rounded-xl hover:bg-green-700/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
          Success Tooltip
        </h1>
      </Tooltip>
      <Tooltip className="w-40" content="Error Tooltip" type="error">
        <h1 className="relative px-6 py-3 text-sm font-semibold text-white bg-red-600/90 rounded-xl hover:bg-red-700/90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
          Error Tooltip
        </h1>
      </Tooltip>
      <Tooltip className="w-40" content="Info Tooltip" type="info">
        <h1 className="relative px-6 py-3 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
          Info Tooltip
        </h1>
      </Tooltip>
      <Tooltip className="w-40" content="Warning Tooltip" type="warning">
        <h1 className="relative px-6 py-3 text-sm font-semibold text-white bg-yellow-600/90 rounded-xl hover:bg-yellow-700/90 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
          Warning Tooltip
        </h1>
      </Tooltip>

      <Tooltip showIcon={false} className="w-40" content="Tooltip without icon" type="info">
        <h1 className="relative px-6 py-3 text-sm font-semibold text-white bg-blue-600/90 rounded-xl hover:bg-blue-700/90 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
          No Icon
        </h1>
      </Tooltip>
      <Tooltip className="w-42" content={<CustomTooltipContent />}>
        <h1 className="relative px-6 py-3 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden">
          Custom Content Tooltip
        </h1>
      </Tooltip>
    </div>
  );
}
