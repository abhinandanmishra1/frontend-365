import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  parentClassName?: string;
}

const ImageZoomOnHover = ({
  src,
  alt,
  className,
  parentClassName,
  width = 200,
  height = 200,
  ...props
}: Props) => {
  return (
    <div 
      className={cn(
        "overflow-hidden relative cursor-zoom-in", 
        parentClassName
      )}
    >
      <div className="transition-transform duration-300 ease-in-out hover:scale-125">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover transition-transform duration-300 ease-in-out group-hover:scale-110",
          className
        )}
        {...props}
        placeholder="empty"
      />
      </div>
    </div>
  );
};

export default function Project13() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Project 13: Image Zoom on Hover</h1>
      <div className="w-[200px] h-[200px]">
        <ImageZoomOnHover
          src="https://abhicdn.netlify.app/images/500_DAYS_BADGE.png"
          alt="Sample Image"
          className="rounded-lg"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}