const StickyHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="sticky top-0 z-10 bg-white">{children}</div>;
};

export default function Project20() {
  return (
    <div className="w-full relative space-y-4 h-[400px] overflow-auto">
      <h1 className="text-2xl font-bold">Project 20</h1>
      <div className="h-[200px] bg-gray-50 dark:bg-gray-800 grid place-content-center text-[32px]">
        Content
      </div>
      <StickyHeader>
        <div className="bg-gray-200 dark:bg-gray-700 p-4">
          <h2 className="text-lg font-bold">Dynamic Header</h2>
        </div>
      </StickyHeader>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 h-[200px] grid place-content-center text-[32px]"
          >
            Content {index + 1}
          </div>
        ))}
    </div>
  );
}
