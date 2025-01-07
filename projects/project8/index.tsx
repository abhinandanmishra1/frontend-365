import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-lg">
      <div
        className={cn("h-full  rounded-lg", {
          "rounded-r-none": progress === 0,
          "bg-red-500": progress > 0 && progress <= 25,
          "bg-yellow-500": progress > 25 && progress <= 50,
          "bg-green-500": progress > 50 && progress <= 75,
          "bg-green-600": progress > 75,
          "bg-green-700": progress === 100,
        })}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default function Project8() {
  return (
    <div className="w-full p-7 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Project 8</h1>
      <div className="w-full md:w-[600px] lg:w-[800px] max-w-full space-y-2">
        <div className="space-y-2">
          <h2>Progress 0</h2>
          <ProgressBar progress={0} />
        </div>
        <div className="space-y-2">
          <h2>Progress 23</h2>
          <ProgressBar progress={25} />
        </div>
        <div className="space-y-2">
          <h2>Progress 48</h2>
          <ProgressBar progress={50} />
        </div>
        <div className="space-y-2">
          <h2>Progress 65</h2>
          <ProgressBar progress={65} />
        </div>
        <div className="space-y-2">
          <h2>Progress 78</h2>
          <ProgressBar progress={75} />
        </div>
        <div className="space-y-2">
          <h2>Progress 100</h2>
          <ProgressBar progress={100} />
        </div>
      </div>
    </div>
  );
}
