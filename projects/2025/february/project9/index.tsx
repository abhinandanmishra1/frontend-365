import { Card } from "@/components/ui/card";
import { MoveLeftIcon } from "lucide-react";
import React from "react";
import styled from "styled-components";

// Styled Components for 3D Flip Animation
// Since TailwindCSS doesn't support 3D transforms
const FlipCardContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 320px;
  position: relative;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s;
  transform-style: preserve-3d;
  ${FlipCardContainer}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardSide = styled(Card)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; // Ensure the back face is hidden during the flip
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlipCardFront = styled(FlipCardSide)`
  transform: rotateY(0deg);
`;

const FlipCardBack = styled(FlipCardSide)`
  transform: rotateY(180deg); // Initially rotated to hide the back card
`;

// Demo implementation showing different use cases
const DemoFlipCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {/* Product Card */}
      <FlipCardContainer>
        <FlipCardInner>
          <FlipCardFront className="">
            <div className="p-6 flex flex-col items-center justify-center h-full space-y-4">
              <MoveLeftIcon className="w-16 h-16 text-blue-500" />
              <h2 className="text-xl font-bold text-center">Premium Package</h2>
              <p className="text-3xl font-bold text-blue-500">$99</p>
              <p className="text-sm text-gray-500 text-center">Hover to see features</p>
            </div>
          </FlipCardFront>
          <FlipCardBack className="">
            <div className="p-6 flex flex-col justify-center h-full space-y-3">
              <h3 className="font-bold text-lg text-center mb-4">Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Premium Support
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Unlimited Access
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Custom Solutions
                </li>
              </ul>
            </div>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCardContainer>

      {/* Team Member Card */}
      <FlipCardContainer>
        <FlipCardInner>
          <FlipCardFront className="">
            <div className="p-6 flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-xl font-bold">Jane Smith</h2>
              <p className="text-gray-500">Lead Designer</p>
            </div>
          </FlipCardFront>
          <FlipCardBack className="">
            <div className="p-6 flex flex-col justify-center h-full space-y-4">
              <h3 className="font-bold text-lg">About Me</h3>
              <p className="text-gray-600">
                10+ years of experience in UI/UX design. Passionate about creating beautiful and functional interfaces.
              </p>
              <div className="flex space-x-4 justify-center">
                <span className="text-blue-500 cursor-pointer">LinkedIn</span>
                <span className="text-blue-500 cursor-pointer">Twitter</span>
              </div>
            </div>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCardContainer>

      {/* Info Card */}
      <FlipCardContainer>
        <FlipCardInner>
          <FlipCardFront className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div className="p-6 flex flex-col items-center justify-center h-full space-y-4">
              <h2 className="text-2xl font-bold">Did You Know?</h2>
              <p className="text-center">Hover to learn an interesting fact!</p>
            </div>
          </FlipCardFront>
          <FlipCardBack className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
            <div className="p-6 flex flex-col justify-center h-full space-y-4">
              <h3 className="font-bold text-lg text-center">Fun Fact</h3>
              <p className="text-center">
                The first computer programmer was a woman named Ada Lovelace, who wrote the first algorithm in the 1840s.
              </p>
            </div>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCardContainer>
    </div>
  );
};

export default function Project9() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Interactive Flip Cards</h1>
      <p className="text-gray-600 mb-8">Hover over any card to see its other side</p>
      <DemoFlipCard />
    </div>
  );
}