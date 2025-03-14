import React, { useState } from 'react';

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface RadioCardProps {
  options: RadioOption[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const RadioCard: React.FC<RadioCardProps> = ({ options, name, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option.id}
          htmlFor={option.id}
          className={`flex cursor-pointer flex-col rounded-lg border p-4 shadow-sm hover:border-gray-300 ${
            selectedValue === option.value
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-medium text-gray-900">{option.label}</div>
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
          </div>
        </label>
      ))}
    </div>
  );
};

export default function Project14() {
  const radioOptions: RadioOption[] = [
    { id: 'option1', label: 'Option 1', value: 'option1' },
    { id: 'option2', label: 'Option 2', value: 'option2' },
    { id: 'option3', label: 'Option 3', value: 'option3' },
    { id: 'option4', label: 'Option 4', value: 'option4' },
    { id: 'option5', label: 'Option 5', value: 'option5' },
    { id: 'option6', label: 'Option 6', value: 'option6' },
  ];

  const handleRadioChange = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Select an Option</h2>
        <RadioCard 
          options={radioOptions} 
          name="projectOptions" 
          defaultValue="option1"
          onChange={handleRadioChange}
        />
      </div>
    </div>
  );
}
