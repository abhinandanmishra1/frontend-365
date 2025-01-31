import { Image } from "lucide-react";
import React from "react";

export const ProductCardSkeleton = () => {
  return (
    <div className="flex h-64 shadow-md w-[64%] rounded-md space-x-4">
      <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse grid place-content-center">
        <Image className="w-12 h-12 text-gray-400" />
      </div>
      <div className="w-full flex flex-col gap-2 p-4">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px]"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px]"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
    </div>
  );
};

export const ListItemSkeleton = () => {
  return (
    <div className="flex h-12 w-full rounded-md space-x-4">
      <div className="h-full w-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
    </div>
  );
};

export const ProfileCardSkeleton = () => {
  return (
    <div className="flex flex-col h-64 shadow-md w-[64%] rounded-md space-y-4">
      <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse self-center"></div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse self-center"></div>
      <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse self-center"></div>
    </div>
  );
};

export default function Project19() {
  return (
    <div className="w-full p-4 relative space-y-6">
      <h1 className="text-2xl font-bold">Project 19</h1>

      <div className="flex flex-col space-y-2">
        <h1>Product Card</h1>
        <ProductCardSkeleton />
      </div>
      <div className="flex flex-col space-y-2 w-1/2">
        <h1>List Item</h1>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </div>
      <div className="flex flex-col space-y-2 w-1/2">
        <h1>Profile Card</h1>
        <ProfileCardSkeleton />
      </div>
    </div>
  );
}
