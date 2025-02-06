import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

const Footer = ({ children, className }: FooterProps) => {
  return (
    <footer className={cn("w-full shadow-sm", className)}>{children}</footer>
  );
};

const Main = ({ children, className }: MainProps) => {
  return <main className={cn("flex-1", className)}>{children}</main>;
};

const Layout = ({ children, className }: LayoutProps) => {
  const mainContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Main
  );

  const footerContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Footer
  );

  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col min-h-full">
          <div className="flex-1 py-4">{mainContent}</div>
          {footerContent}
        </div>
      </div>
    </div>
  );
};

export default function Project6() {
  const [contentCount, setContentCount] = useState(1);

  return (
    <div>
      <Button onClick={() => setContentCount(contentCount + 1)}>
        Add Content
      </Button>

      <Layout>
        <Main className="flex flex-col gap-2">
          {Array.from({ length: contentCount }).map((_, index) => (
            <div
              key={index}
              className={cn("h-16 grid place-content-center", {
                "bg-blue-200": index % 2 === 0,
                "bg-green-200": index % 2 === 1,
              })}
            >
              Content {index}
            </div>
          ))}
        </Main>
        <Footer className="p-4 bg-slate-100 mt-4">
          <p>Footer content here</p>
        </Footer>
      </Layout>
    </div>
  );
}
