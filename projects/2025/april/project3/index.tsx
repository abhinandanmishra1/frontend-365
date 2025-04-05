import React, { useState } from "react";

interface RadioOption {
  value: string;
  label: string;
}
interface CustomRadioProps {
  options: RadioOption[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const CustomRadio = ({
  options,
  name,
  defaultValue,
  onChange,
}: CustomRadioProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer group"
        >
          <div className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="sr-only" // Hide the actual radio input
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedValue === option.value
                  ? "border-blue-500"
                  : "border-gray-300 group-hover:border-gray-400"
              }`}
            >
              {selectedValue === option.value && (
                <div className="w-3 h-3 rounded-full bg-blue-500 transition-all duration-200 ease-in-out"></div>
              )}
            </div>
          </div>
          <span className="ml-2 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default function Project3() {
  const [selectedOption, setSelectedOption] = useState("apple");

  const radioOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "durian", label: "Durian" },
  ];

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected:", value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Select your favorite fruit:
        </h2>

        <CustomRadio
          options={radioOptions}
          name="fruit-preference"
          defaultValue="apple"
          onChange={handleRadioChange}
        />

        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm">
            You selected: <span className="font-medium">{selectedOption}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
