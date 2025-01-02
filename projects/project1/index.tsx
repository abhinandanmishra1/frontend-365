const SimpleButton = () => {
  return (
    <button className="px-4 py-2 h-12 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md text-white">
      Simple Hover Button
    </button>
  );
};

const VerticalFillButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border border-[#dd7e2a] text-[#dd7e2a] transition-all duration-500 hover:border-[#dd648a] hover:text-white relative overflow-hidden group">
      <span className="relative z-10">Vertical Fill Button</span>
      <div className="absolute inset-x-0 h-1/2 w-full bg-[#dd648a] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 w-full bg-[#dd648a] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </button>
  );
};

const CenterFillButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border border-[#716eef] text-[#716eef] transition-all duration-500 hover:border-[#716eef] hover:text-white relative overflow-hidden group">
      <span className="relative z-10">Center Fill Button</span>
      <div className="absolute inset-0 bg-[#716eef] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg" />
    </button>
  );
};

const DiagonalRevealButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border border-[#dd7e2a] text-[#dd7e2a] hover:bg-[#f1f1f1] hover:text-[#dd7e2a] relative overflow-hidden group">
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Diagonal Reveal Button</span>
      <div className="absolute top-1/2 left-0 w-1/5 h-full bg-[#dd7e2a] -translate-x-full -rotate-45 -translate-y-1/2 group-hover:w-full group-hover:translate-x-0 group-hover:rotate-0 group-hover:translate-y-0 transition-all duration-300" />
    </button>
  );
};

const AnimatedFillButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border border-[#dd6395] text-[#dd6395] relative overflow-hidden group">
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white delay-300">Animated Fill Button</span>
      <div className="absolute top-0 left-0 w-1/6 h-full bg-[#dd6395] -rotate-45 -translate-x-full group-hover:animate-ani507 transition-transform duration-300" />
    </button>
  );
};

const DiagonalSlideButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border border-[#5e5e5e] text-[#5e5e5e] hover:border-[#117831] relative overflow-hidden group">
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Diagonal Slide Button</span>
      <div className="absolute inset-0 bg-[#117831] -translate-x-full rotate-50 origin-top-left group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-300" />
    </button>
  );
};

const BubbleButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg bg-[#716eef] border-[#716eef] text-white hover:bg-[#4b48cb] hover:border-[#4b48cb] relative transition-colors duration-300">
      <span className="relative z-10">Bubble Button</span>
      <div className="absolute w-12 h-8 rounded-full bg-[#4b48cb] -top-2 left-[10%] scale-0 group-hover:scale-100 transition-transform duration-1000" />
      <div className="absolute w-12 h-8 rounded-full bg-[#4b48cb] -bottom-2 right-[15%] scale-0 group-hover:scale-100 transition-transform duration-1000" />
    </button>
  );
};

const ShineButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg bg-[#5e5e5e] border-[#5e5e5e] text-white  relative overflow-hidden group transition-colors duration-300">
      <span className="relative z-10">Shine Button</span>
      <div className="absolute top-0 left-0 w-16 h-full bg-white/50 blur-lg -translate-x-full -skew-x-15 group-hover:translate-x-[300px] transition-transform duration-900" />
      <div className="absolute top-0 left-8 w-8 h-full bg-white/20 blur-sm -translate-x-full -skew-x-15 group-hover:translate-x-[300px] transition-transform duration-900" />
    </button>
  );
};

const SplitRevealButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border-transparent bg-transparent text-[#484848] relative overflow-hidden group">
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">Split Reveal Button</span>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#dd6395] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#dd6395] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
    </button>
  );
};

const BorderDrawButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg border border-[#979695] text-[#979695] hover:border-[#dd6395] hover:text-[#dd6395] relative group">
      <span className="relative z-10">Border Draw Button</span>
      <div className="absolute inset-0 w-0 h-full border-t border-b border-[#dd6395] rounded-lg group-hover:w-full transition-all duration-300" />
      <div className="absolute inset-0 w-full h-0 border-l border-r border-[#dd6395] rounded-lg group-hover:h-full transition-all duration-300" />
    </button>
  );
};

const CornerDrawButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg text-[#dd6395] hover:text-[#dd2470] relative group">
      <span className="relative z-10 group-hover:text-lg transition-all duration-500">Corner Draw Button</span>
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#dd6395] opacity-0 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#dd6395] opacity-0 translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#dd6395] opacity-0 -translate-x-1/2 translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#dd6395] opacity-0 translate-x-1/2 translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
    </button>
  );
};

const BorderSlideButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg text-white hover:text-[#716eef] relative group overflow-hidden">
      <span className="relative z-10">Border Slide Button</span>
      <div className="absolute inset-0 bg-[#716eef] group-hover:scale-x-0 transition-transform duration-300" />
      <div className="absolute top-0 left-1/2 w-0 h-full -translate-x-1/2 group-hover:w-full border-t border-b border-[#716eef] transition-all duration-300 delay-200" />
    </button>
  );
};

const BoxFrameButton = () => {
  return (
    <button className="flex justify-center items-center w-30 h-12 px-4 rounded-lg bg-[#dd7e2a] border-[#dd7e2a] text-white relative group">
      <span className="relative z-10">Box Frame Button</span>
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[130%] -translate-x-1/2 -translate-y-1/2 scale-0 border-t border-[#dd7e2a] group-hover:scale-100 transition-transform duration-300 delay-300 origin-right-top" />
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[130%] -translate-x-1/2 -translate-y-1/2 scale-0 border-b border-[#dd7e2a] group-hover:scale-100 transition-transform duration-300 delay-900 origin-left-bottom" />
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[130%] -translate-x-1/2 -translate-y-1/2 scale-0 border-l border-[#dd7e2a] group-hover:scale-100 transition-transform duration-300 delay-600 origin-left-top" />
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[130%] -translate-x-1/2 -translate-y-1/2 scale-0 border-r border-[#dd7e2a] group-hover:scale-100 transition-transform duration-300 origin-right-bottom" />
    </button>
  );
};

const GlowOnHoverButton = () => {
  // animation code is defined in tailwind.config.js
  return (
    <div className="relative group h-12">
      <div className="absolute top-[-2px] left-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] bg-glowing-button bg-[length:400%_400%] rounded-lg blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity animate-glow-animation"></div>
      <button className="relative w-full px-4 py-3 h-[50px] rounded-lg text-white bg-[#111] active:bg-transparent transition-colors duration-300">
        Glow on Hover
      </button>
    </div>
  );
};

const ShadowButton1 = () => {
  return <button className="relative flex justify-center items-center rounded-lg duration-75 text-[#979695] border border-[#979695] hover:text-[#5e5e5e] hover:-translate-y-2 hover:transition-transform hover:border-[#5e5e5e] before:content-[''] before:absolute before:top-14 before:w-full before:h-2 before:rounded-lg before:bg-shadow-button before:opacity-0 before:transition-opacity before:duration-75 before:hover:opacity-100">
    Shadow Button
  </button>
}

export default function Project1() {
  return (
    <div className="grid overflow-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-2 lg:gap-4 w-full p-4 h-full">
      <SimpleButton />
      <GlowOnHoverButton />
      <ShadowButton1 />
      <VerticalFillButton />
      <CenterFillButton />
      <DiagonalRevealButton />
      <AnimatedFillButton />
      <DiagonalSlideButton />
      <BubbleButton />
      <ShineButton />
      <SplitRevealButton />
      <BorderDrawButton />
      <CornerDrawButton />
      <BorderSlideButton />
      <BoxFrameButton />
    </div>
  );
}
