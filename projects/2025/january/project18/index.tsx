import React, { createContext, useContext, useMemo } from "react";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepperContextType = {
  activeStep: number;
  completed: number[];
  totalSteps: number;
};

const StepperContext = createContext<StepperContextType | null>(null);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
};

export const Stepper = ({
  children,
  activeStep = 0,
  completed = [],
  className = "",
  orientation = "horizontal",
  "aria-label": ariaLabel = "Progress Stepper",
}: StepperProps) => {
  const isCompleted = (index: number) => completed.includes(index);
  const steps = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement =>
          React.isValidElement(child) && child.type === Step
      ),
    [children]
  );

  const stepContent = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement =>
          React.isValidElement(child) && child.type === StepContent
      ),
    [children]
  );

  const contextValue = useMemo(
    () => ({
      activeStep,
      completed,
      totalSteps: steps.length,
    }),
    [activeStep, completed, steps.length]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">
        <div
          className={`${
            orientation === "vertical"
              ? "flex-col space-y-4"
              : "flex items-center space-between"
          } ${className}`}
          role="navigation"
          aria-label={ariaLabel}
        >
          {steps.map((step, index) => (
            <>
              {React.cloneElement(step, {
                ...step.props,
                key: index,
                index,
                isLast: index === steps.length - 1,
                orientation,
              })}
              {index !== steps.length - 1 && (
                <div
                  className={`
            ${
              orientation === "vertical" ? "h-16 w-0.5 ml-4 my-2" : "h-0.5 grow"
            }
            ${isCompleted(index) ? "bg-green-500" : "bg-gray-200"}
          `}
                  role="presentation"
                />
              )}
            </>
          ))}
        </div>

        <div
          className={`flex ${
            orientation === "vertical"
              ? "flex-col space-y-4"
              : "items-center space-between gap-2"
          } ${className}`}
          role="navigation"
          aria-label={ariaLabel}
        >
          {steps.map((step, index) =>
            React.cloneElement(step.props.children, {
              key: index,
              isFirst: index === 0,
              isLast: index === steps.length - 1,
            })
          )}
        </div>

        <div className="px-4">
          {stepContent.map((content, index) =>
            React.cloneElement(content, {
              ...content.props,
              key: index,
              index,
              orientation,
            })
          )}
        </div>
      </div>
    </StepperContext.Provider>
  );
};

export const Step = ({
  children,
  icon,
  completedIcon = <Check className="w-4 h-4" />,
  index = 0,
  orientation = "horizontal",
  disabled = false,
  onClick,
}: StepProps) => {
  const { activeStep, completed } = useStepperContext();
  const isCompleted = completed.includes(index);
  const isActive = activeStep === index;

  const getStepContent = () => {
    if (isCompleted) {
      if (completedIcon) return completedIcon;
      if (icon) return icon;
      return <span className="text-sm">{index + 1}</span>;
    }
    if (icon) return icon;
    return <span className="text-sm">{index + 1}</span>;
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(index);
    }
  };

  return (
    <div
      className={`flex ${
        orientation === "vertical" ? "flex-col" : "items-center"
      }`}
      role="group"
      aria-current={isActive ? "step" : undefined}
    >
      <div className="flex items-center justify-center flex-col gap-4">
        <button
          className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${
              isCompleted
                ? "bg-green-500 text-white"
                : isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={handleClick}
          disabled={disabled}
          aria-label={`Step ${index + 1}`}
          tabIndex={disabled ? -1 : 0}
        >
          {getStepContent()}
        </button>
      </div>
    </div>
  );
};

export const StepLabel = ({
  children,
  optional = false,
  error = false,
  description,
  isFirst,
  isLast,
}: StepLabelProps) => {
  return (
    <div
      className={cn("flex flex-col w-1/3 items-center", {
        "items-start": isFirst,
        "items-end": isLast,
      })}
    >
      <div
        className={cn(
          "text-sm font-medium",
          error ? "text-red-500" : "text-gray-900"
        )}
      >
        {children}
      </div>
      {optional && (
        <div className="text-xs text-gray-500" aria-label="Optional step">
          Optional
        </div>
      )}
      {description && (
        <div className="text-xs text-gray-600 mt-1">{description}</div>
      )}
    </div>
  );
};

export const StepContent = ({
  children,
  value,
  activeStep,
  className = "",
}: StepContentProps) => {
  if (value !== activeStep) {
    return null;
  }
  return (
    <div
      className={`mt-4 ${className}`}
      role="tabpanel"
      aria-label={`Step ${value + 1} content`}
    >
      {children}
    </div>
  );
};

// Form example component
function StepperFormExample() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<number[]>([]);

  // Form state
  const [formData, setFormData] = React.useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    preferences: {
      notifications: false,
      newsletter: false,
    },
  });

  const handleNext = () => {
    setCompleted((curr) => [...curr, activeStep]);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCompleted((prev) => {
      const newCompleted = [...prev].filter((step) => step !== activeStep - 1);
      return newCompleted;
    });
    setActiveStep((prev) => prev - 1);
  };

  const handleStepClick = (index: number) => {
    if (index < activeStep || completed.includes(index - 1)) {
      setActiveStep(index);
    }
  };

  const handleInputChange = (
    step: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Stepper activeStep={activeStep} completed={completed}>
          <Step onClick={handleStepClick}>
            <StepLabel description="Enter your personal information">
              Personal Info
            </StepLabel>
          </Step>
          <Step onClick={handleStepClick}>
            <StepLabel description="Provide your address">Address</StepLabel>
          </Step>

          <Step onClick={handleStepClick}>
            <StepLabel description="Set your preferences">
              Preferences
            </StepLabel>
          </Step>

          <StepContent value={0} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "firstName",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "lastName",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "email", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </StepContent>
          <StepContent value={1} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) =>
                    handleInputChange("address", "street", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) =>
                    handleInputChange("address", "city", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    handleInputChange("address", "zipCode", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </StepContent>
          <StepContent value={2} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={formData.preferences.notifications}
                  onChange={(e) =>
                    handleInputChange(
                      "preferences",
                      "notifications",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="notifications"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Receive notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.preferences.newsletter}
                  onChange={(e) =>
                    handleInputChange(
                      "preferences",
                      "newsletter",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="newsletter"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Subscribe to newsletter
                </label>
              </div>
            </div>
          </StepContent>
        </Stepper>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-200 rounded-md transition-colors hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
          >
            Back
          </button>
          {activeStep === 2 ? (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md transition-colors hover:bg-green-600"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md transition-colors hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Project18() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <StepperFormExample />
    </div>
  );
}

interface StepperProps {
  children: React.ReactNode;
  activeStep?: number;
  completed?: number[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
}

interface StepProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  optional?: boolean;
  index?: number;
  isLast?: boolean;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  onClick?: (index: number) => void;
}

interface StepLabelProps {
  children: React.ReactNode;
  optional?: boolean;
  error?: boolean;
  description?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

interface StepContentProps {
  children: React.ReactNode;
  value: number;
  activeStep: number;
  className?: string;
}
