import { cn } from "@/lib/utils";

const Card = ({
  children,
  className,
  type = "default",
}: CardProps) => {
  const cardStyles = getCardStyles(type);
  const paddingStyles = {
    default: "p-6",
    horizontal: "p-6",
    compact: "p-4",
    feature: "p-8",
  };

  return (
    <div className={cn(cardStyles, paddingStyles[type], className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>
  );
};

const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3
      className={cn(
        "text-xl font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn("flex items-center pt-0", className)}>{children}</div>
  );
};

const DefaultCardExample = () => {
  return (
    <Card className="max-w-md min-w-md flex-grow">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>This is a default card layout</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <button className="px-4 py-2 border-[1px] border-gray-300 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-md">
            Cancel
          </button>
          <button className="px-4 py-2 bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-white/80 text-white dark:text-black rounded-md">
            Deploy
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

const HorizontalCardExample = () => {
  return (
    <Card type="horizontal" className="max-w-2xl flex-grow">
      <div className="w-full md:w-1/3 bg-gray-100 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
        <div className="h-48 md:h-full bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-tr-none"></div>
      </div>
      <div className="flex-1">
        <CardHeader>
          <CardTitle>Horizontal Card</CardTitle>
          <CardDescription>
            A horizontal layout for featured content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content that works well in a horizontal layout.</p>
        </CardContent>
      </div>
    </Card>
  );
};

const CompactCardExample = () => {
  return (
    <Card type="compact" className="max-w-sm max-h-max">
      <CardHeader>
        <CardTitle>Compact Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Minimal content with reduced spacing.</p>
      </CardContent>
    </Card>
  );
};

const FeatureCardExample = () => {
  return (
    <Card type="feature" className="max-w-lg">
      <CardHeader>
        <CardTitle>Feature Card</CardTitle>
        <CardDescription>
          A prominent card for important features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Detailed feature description with more spacing.</p>
      </CardContent>
      <CardFooter>
        <button className="px-4 py-2 bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-white/80 text-white dark:text-black rounded-md">
          Learn More
        </button>
      </CardFooter>
    </Card>
  );
};

export default function Project17() {
  return (
    <div className="w-full relative space-y-4">
      <h1 className="text-2xl font-bold">Project 17</h1>

      <div className="w-full p-4 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Card Examples</h1>

        <div className="flex gap-2 flex-wrap">
          <DefaultCardExample />

          <HorizontalCardExample />
        </div>

        <div className="flex gap-4">
          <CompactCardExample />

          <FeatureCardExample />
        </div>
      </div>
    </div>
  );
}

type CardType = "default" | "horizontal" | "compact" | "feature";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  type?: CardType;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const getCardStyles = (type: CardType) => {
  const baseStyles = {
    default: "flex flex-col gap-4 rounded-lg transition-colors duration-200",
    horizontal:
      "flex flex-col md:flex-row gap-4 rounded-lg transition-colors duration-200",
    compact: "flex flex-col gap-2 rounded-lg transition-colors duration-200",
    feature: "flex flex-col gap-6 rounded-lg transition-colors duration-200",
  };

  return cn(
    baseStyles[type],
    "bg-white shadow-md border border-gray-200 dark:bg-black/10 dark:border-gray-700 dark:text-white"
  );
};
