const AnimatedSVGLoader2 = () => {
  return (
    <div className="w-36 h-36 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
        <path
          fill="none"
          stroke="green"
          stroke-width="15"
          stroke-linecap="round"
          stroke-dasharray="300 385"
          stroke-dashoffset="0"
          d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        >
          <animate
            attributeName="stroke-dashoffset"
            calcMode="spline"
            dur="2"
            values="685;-685"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animate>
        </path>
      </svg>
    </div>
  );
};

const AnimatedSVGLoader = () => {
  return (
    <>
      <div className="w-36 h-36">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle
            transform='rotate(0)' 
            transform-origin='center'
            fill="none"
            stroke="blue"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="230 1000"
            stroke-dashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="2"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </>
  );
};

export default function Project31() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 31</h1>
      <div className="w-1/2 flex gap-8 items-center">
        <AnimatedSVGLoader />
        <AnimatedSVGLoader2 />
      </div>
    </div>
  );
}
