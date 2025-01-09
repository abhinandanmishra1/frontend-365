import React, { useState } from "react";

import { cn } from "@/lib/utils";

const TabsContainer = ({
  children,
  className,
  defaultValue,
}: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("rounded-lg shadow-sm", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsHeaderProps>(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }

        if (React.isValidElement<TabsBodyProps>(child)) {
          return React.cloneElement(child, { activeTab });
        }

        throw new Error("TabsContainer only accepts TabsHeader and TabsBody as children");
      })}
    </div>
  );
};

const TabsHeader = ({ children, activeTab, setActiveTab, className }: TabsHeaderProps) => {
  return (
    <div className={cn(
      "flex items-center gap-1.5 p-1 bg-gray-100 rounded-t-lg border-b border-gray-200",
      className
    )}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabProps>(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        
        throw new Error("TabsHeader only accepts Tab as children");
      })}
    </div>
  );
};

const TabsBody = ({ children, activeTab, className }: TabsBodyProps) => {
  return (
    <div className={cn("bg-white rounded-b-lg", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsContentProps>(child)) {
          return React.cloneElement(child, { activeTab });
        }
        
        throw new Error("TabsBody only accepts TabContent as children");
      })}
    </div>
  );
};

const Tab = ({ children, activeTab, value, setActiveTab, className }: TabProps) => {
  const isActive = activeTab === value;
  
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 ",
        isActive 
          ? "bg-white text-blue-600 shadow-sm focus:ring-blue-500" 
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
        className
      )}
      onClick={() => activeTab !== value && setActiveTab?.(value)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-content-${value}`}
    >
      {children}
    </button>
  );
};

const TabContent = ({ children, value, activeTab, className }: TabsContentProps) => {
  return (
    <div 
      className={cn(
        "p-4",
        activeTab === value ? "block" : "hidden",
        className
      )}
      role="tabpanel"
      id={`tab-content-${value}`}
      aria-labelledby={`tab-${value}`}
    >
      {children}
    </div>
  );
};

const TabsExample = () => {
  return (
    <TabsContainer className="max-w-2xl" defaultValue="tab1">
      <TabsHeader>
        <Tab value="tab1">Account</Tab>
        <Tab value="tab2">Password</Tab>
        <Tab value="tab3">Settings</Tab>
      </TabsHeader>
      <TabsBody>
        <TabContent value="tab1">Account settings content...</TabContent>
        <TabContent value="tab2">Password settings content...</TabContent>
        <TabContent value="tab3">General settings content...</TabContent>
      </TabsBody>
    </TabsContainer>
  );
};


export default function Project9() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Project 9: <span className="text-blue-500">Tabs Component without using context</span></h1>

      <TabsExample />
    </div>
  );
}


interface TabsContainerProps {
  children: React.ReactNode;
  className?: string;
  defaultValue: string | number;
}

interface TabsHeaderProps {
  children: React.ReactNode;
  activeTab?: string | number;
  setActiveTab?: (value: string | number) => void;
  className?: string;
}

interface TabsBodyProps {
  children: React.ReactNode;
  activeTab?: string | number;
  className?: string;
}

interface TabProps {
  children: React.ReactNode;
  value: string | number;
  activeTab?: string | number;
  setActiveTab?: (value: string | number) => void;
  className?: string;
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string | number;
  activeTab?: string | number;
  className?: string;
}
