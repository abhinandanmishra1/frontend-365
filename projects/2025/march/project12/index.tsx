import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";

interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
  className?: string;
}

const PinInput = ({
  length = 4,
  onComplete,
  className = "",
}: PinInputProps) => {
  const [pin, setPin] = useState<string[]>(() => Array(length).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(length)
      .fill(0)
      .map((_, i) => inputRefs.current[i] || null);
    setPin(Array(length).fill(""));
    setActiveInput(0);
  }, [length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    // Accept numeric values
    if (value.match(/^[0-9]?$/)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setActiveInput(index + 1);
      }

      if (
        newPin.every((digit) => digit !== "") &&
        index === length - 1 &&
        onComplete
      ) {
        onComplete(newPin.join(""));
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (pin[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setActiveInput(index - 1);

        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);
      } else {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    } else if (e.key === "Enter") {
      if (pin.every((digit) => digit !== "") && onComplete) {
        onComplete(pin.join(""));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").trim();
    const digits = pastedData.split("").slice(0, length).filter((char) => char.match(/[0-9]/));

    if (digits.length > 0) {
      const newPin = [...pin];

      for (let i = 0; i < Math.min(digits.length, length); i++) {
        newPin[i] = digits[i];
      }

      setPin(newPin);

      const nextEmptyIndex = newPin.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;

      inputRefs.current[focusIndex]?.focus();
      setActiveInput(focusIndex);

      // if pin is complete call oncomplete
      if (newPin.every((digit) => digit !== "") && onComplete) {
        onComplete(newPin.join(""));
      }
    }
  };

  return (
    <div
      className={`flex gap-2 items-center justify-center ${className}`}
      onPaste={handlePaste}
    >
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={pin[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              // when element is mounted, ref is set for that index
              inputRefs.current[index] = el;
            }}
            className="w-12 h-12 text-center text-lg font-bold rounded-lg border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all shadow-sm"
            aria-label={`PIN digit ${index + 1}`}
          />
        ))}
    </div>
  );
};

export default function Project12() {
  const [pinLength, setPinLength] = useState<number>(4);
  const [pinValue, setPinValue] = useState<string>("");

  const handlePinComplete = (value: string) => {
    setPinValue(value);
    console.log("PIN entered:", value);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 pt-10">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">Enter PIN Code</h1>

        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
          <PinInput
            length={pinLength}
            onComplete={handlePinComplete}
            className="mb-6"
          />

          {pinValue && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
              PIN entered: {pinValue}
            </div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN Length
            </label>
            <div className="flex items-center space-x-4">
              {[4, 6].map((len) => (
                <button
                  key={len}
                  onClick={() => {
                    setPinLength(len);
                    setPinValue("");
                  }}
                  className={`px-4 py-2 rounded-md ${
                    pinLength === len
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors`}
                >
                  {len} digits
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
