"use client"

import { ArrowUpIcon, Loader } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ScrollContainerProps {
  items: Item[];
  loadItems: (itemId: number) => Promise<Item[]>;
}

const ScrollContainer = ({
  items: initialItems,
  loadItems,
}: ScrollContainerProps) => {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const startId = items.length > 0 ? items[items.length - 1].id + 1 : 0;
      const newItems = await loadItems(startId);

      if (newItems.length === 0) return;

      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setIsLoading(false);
    }
  }, [items, loadItems, isLoading]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  // Handle scroll position to show/hide scroll button
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const handleScroll = () => {
      setShowScrollButton(container.scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    // observer is set up only when the component is mounted
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { 
        threshold: 0.5,
        root: containerRef.current
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchData, mounted]);

  useEffect(() => {
    if (mounted && items.length === 0) {
      fetchData();
    }
  }, [items.length, fetchData, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className="h-full overflow-auto relative space-y-4 px-4"
    >
      {items.map((item) => (
        <div key={item.id} className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-600">{item.body}</p>
        </div>
      ))}

      {error && (
        <div className="p-4 text-red-500 text-center">Error: {error}</div>
      )}

      {isLoading && (
        <div className="p-4 text-gray-500 text-center flex justify-center">
          <Loader className="animate-spin" />
        </div>
      )}

      <div ref={observerTarget} className="h-4" />

      {showScrollButton && (
        <Button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-10 h-10 p-0 shadow-lg"
          size="icon"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

const Project15 = () => {
  const loadItems = async (startId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${startId}&_limit=10`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return response.json();
  };

  return (
    <div className="max-w-4xl mx-auto h-[60vh] bg-white relative">
      <ScrollContainer items={[]} loadItems={loadItems} />
    </div>
  );
};

export default Project15;