import { useEffect, useState } from "react";

const DigitalClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-white">
      <h1 className="text-6xl font-bold tracking-wider">
        {date.toLocaleTimeString()}
      </h1>
    </div>
  );
};

export default function Project26() {
  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400 animate-gradient-x"></div>
      
      <div className="relative z-10 grid place-content-center h-full w-full">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105">
          <DigitalClock />
        </div>
      </div>
    </div>
  );
}