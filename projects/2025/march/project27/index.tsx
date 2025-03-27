import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Define interfaces for type safety
interface Option {
  label: string;
  value: string;
}

interface QuizProps {
  question: string;
  options: Option[];
  correctOption: string;
}

const QuizComponent: React.FC<QuizProps> = ({ question, options, correctOption }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
      setIsCorrect(selectedOption === correctOption);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          onValueChange={setSelectedOption} 
          value={selectedOption || undefined}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.value} 
                id={option.value}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>

        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
            className="mt-4 w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="mt-4">
            <div 
              className={`p-3 rounded ${
                isCorrect 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
            </div>
            <Button 
              onClick={handleReset} 
              variant="secondary"
              className="mt-2 w-full"
            >
              Reset
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function Project27() {
  const quizData: QuizProps = {
    question: "What is the capital of France?",
    options: [
      { label: "London", value: "london" },
      { label: "Berlin", value: "berlin" },
      { label: "Paris", value: "paris" },
      { label: "Madrid", value: "madrid" }
    ],
    correctOption: "paris"
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <QuizComponent {...quizData} />
    </div>
  );
}
