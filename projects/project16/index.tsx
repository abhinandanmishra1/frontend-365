const AnimatedLoader1 = () => {
  return (
    <div className="flex h-9 w-9 rounded-full items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-b-transparent border-r-transparent border-t-pink-500 border-l-pink-500"></div>
    </div>
  );
};

const AnimatedLoader2 = () => {
  return (
    <div className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
      Loading...
    </div>
  );
};

const AnimatedLoader3 = () => {
  return (
    <div className="flex space-x-2 mt-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Project16() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 16</h1>
      <AnimatedLoader1 />
      <AnimatedLoader2 />
      <AnimatedLoader3 />
    </div>
  );
}
