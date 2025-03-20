import { LucideCheck, LucidePackage, LucideShip } from "lucide-react";

interface TimelineItemProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  date: string;
}

interface TimelineViewProps {
  data: TimelineItemProps[];
}

const TimelineRoot = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex flex-col space-y-8">{children}</div>
);

const TimelineItem = ({ icon, title, description, date }: TimelineItemProps) => (
  <div className="flex items-start space-x-4 relative z-10">
    {/* Icon Container */}
    <div className="flex-shrink-0">
      {icon && (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
          {icon}
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{date}</div>
      <div className="text-sm text-gray-700">{description}</div>
    </div>
  </div>
);

const TimelineView = ({ data }: TimelineViewProps) => {
  return (
    <TimelineRoot>
      {/* Vertical Line */}
      <div className="absolute left-5 top-0 h-full w-px bg-gray-200"></div>

      {/* Timeline Items */}
      {data.map((item, index) => (
        <div key={index}>
          <TimelineItem {...item} />
        </div>
      ))}
    </TimelineRoot>
  );
};


export default function Project20() {
  const timelineData = [
    {
      icon: <LucideShip />,
      title: "Product Shipped",
      description:
        "We shipped your product via FedEx and it should arrive within 3-5 business days.",
      date: "13th May 2021",
    },
    {
      icon: <LucideCheck />,
      title: "Order Confirmed",
      description: "Your order has been confirmed and is being processed.",
      date: "18th May 2021",
    },
    {
      icon: <LucidePackage />,
      title: "Order Delivered",
      description: "Your order has been delivered.",
      date: "20th May 2021, 10:30am",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Project 20</h1>
      <TimelineView data={timelineData} />
    </div>
  );
}
