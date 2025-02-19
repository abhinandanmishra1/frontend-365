import React from "react";

interface TimeLineItem {
  title: string;
  description: string;
  date: string;
}

interface TimeLineProps {
  items: TimeLineItem[];
}

const TimelineSeparator = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-200"></div>
      <div className="w-0.5 h-24 bg-gradient-to-b from-blue-500 to-blue-300 mt-1"></div>
    </div>
  );
};

const TimelineContent = ({ item }: { item: TimeLineItem }) => {
  return (
    <div className="flex-1 ml-6 group">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <span className="text-sm text-gray-500 font-medium">
          {new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-600 mt-2">{item.description}</p>
      </div>
    </div>
  );
};

const TimelineItem = ({
  item,
}: {
  item: TimeLineItem;
}) => {
  return (
    <li className="flex gap-4 pb-8">
      <TimelineSeparator />
      <TimelineContent item={item} />
    </li>
  );
};

const Timeline = ({ items }: TimeLineProps) => {
  return (
    <div className="relative max-w-3xl mx-auto mt-8">
      <ul className="list-none">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default function Project19() {
  const items: TimeLineItem[] = [
    {
      title: "Project Kickoff",
      description:
        "Initial planning and team alignment session to set project goals and milestones.",
      date: "2025-01-15",
    },
    {
      title: "Design Phase Complete",
      description:
        "Finalized all UI/UX designs and received stakeholder approval for implementation.",
      date: "2025-02-01",
    },
    {
      title: "Beta Launch",
      description:
        "Successfully deployed the beta version to test environment for user acceptance testing.",
      date: "2025-02-15",
    },
    {
      title: "Production Release",
      description:
        "Official launch of the project with all core features implemented and tested.",
      date: "2025-03-01",
    },
  ].reverse();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Project Timeline
        </h1>
        <Timeline items={items} />
      </div>
    </div>
  );
}
