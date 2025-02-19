"use client"

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Step, StepContent, StepLabel, Stepper } from "../../january/project18";
import { UseFormReturn, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    marketingEmails: boolean;
    theme: string;
  };
  professional: {
    company: string;
    role: string;
    experience: number;
    skills: string[];
  };
}

const MultiStepForm = () => {
  const [showSubmittedData, setShowSubmittedData] = useState(false);
  const form = useForm<FormData>({
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      preferences: {
        notifications: false,
        newsletter: false,
        marketingEmails: false,
        theme: "light",
      },
      professional: {
        company: "",
        role: "",
        experience: 0,
        skills: [],
      },
    },
    mode: "onChange",
  });

  const {
    activeStep,
    completed,
    isLastStep,
    handleNext,
    handleBack,
    handleStepClick,
  } = useMultiStepForm(form, 4);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormData) => {
    const isValid = await form.trigger();
    if (isValid) {
      console.log("Form submitted:", data);
      setShowSubmittedData(true);
    } else {
      setShowSubmittedData(false);
      // Find the first step with errors and navigate to it
      const stepWithError = Object.keys(errors).findIndex(
        (key) => errors[key as keyof typeof errors]
      );
      if (stepWithError !== -1) {
        handleStepClick(stepWithError);
      }
    }
  };

  const formData = watch();

  const renderError = (error: any) => {
    if (!error) return null;
    return (
      <p className="text-sm text-red-500">
        {error.message || "This field is required"}
      </p>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <form className="space-y-8">
        <Stepper activeStep={activeStep} completed={completed}>
          {/* Personal Info Step */}
          <Step onClick={() => handleStepClick(0)}>
            <StepLabel description="Personal Information">
              Personal Info
            </StepLabel>
          </Step>
          <StepContent value={0} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    {...register("personalInfo.firstName", {
                      required: "First name is required",
                    })}
                    className={cn({
                      "border-red-500": errors.personalInfo?.firstName,
                    })}
                    id="firstName"
                  />
                  {renderError(errors.personalInfo?.firstName)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    {...register("personalInfo.lastName", {
                      required: "Last name is required",
                    })}
                    className={cn({
                      "border-red-500": errors.personalInfo?.lastName,
                    })}
                    id="lastName"
                  />
                  {renderError(errors.personalInfo?.lastName)}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("personalInfo.email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={cn({
                    "border-red-500": errors.personalInfo?.email,
                  })}
                  type="email"
                  id="email"
                />
                {renderError(errors.personalInfo?.email)}
              </div>
            </div>
          </StepContent>

          {/* Address Step */}
          <Step onClick={() => handleStepClick(1)}>
            <StepLabel description="Address Details">Address</StepLabel>
          </Step>
          <StepContent value={1} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  {...register("address.street", {
                    required: "Street is required",
                  })}
                  className={cn({
                    "border-red-500": errors.address?.street,
                  })}
                  id="street"
                />
                {renderError(errors.address?.street)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("address.city", {
                      required: "City is required",
                    })}
                    className={cn({
                      "border-red-500": errors.address?.city,
                    })}
                    id="city"
                  />
                  {renderError(errors.address?.city)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    {...register("address.state", {
                      required: "State is required",
                    })}
                    className={cn({
                      "border-red-500": errors.address?.state,
                    })}
                    id="state"
                  />
                  {renderError(errors.address?.state)}
                </div>
              </div>
            </div>
          </StepContent>

          {/* Professional Step */}
          <Step onClick={() => handleStepClick(2)}>
            <StepLabel description="Professional Details">
              Professional
            </StepLabel>
          </Step>
          <StepContent value={2} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  {...register("professional.company", {
                    required: "Company is required",
                  })}
                  className={cn({
                    "border-red-500": errors.professional?.company,
                  })}
                  id="company"
                />
                {renderError(errors.professional?.company)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  {...register("professional.role", {
                    required: "Role is required",
                  })}
                  className={cn({
                    "border-red-500": errors.professional?.role,
                  })}
                  id="role"
                />
                {renderError(errors.professional?.role)}
              </div>
            </div>
          </StepContent>

          {/* Preferences Step */}
          <Step onClick={() => handleStepClick(3)}>
            <StepLabel description="User Preferences">Preferences</StepLabel>
          </Step>
          <StepContent value={3} activeStep={activeStep} className="w-full">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register("preferences.notifications")}
                  id="notifications"
                />
                <Label htmlFor="notifications">Receive Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register("preferences.newsletter")}
                  id="newsletter"
                />
                <Label htmlFor="newsletter">Subscribe to Newsletter</Label>
              </div>
            </div>
          </StepContent>
        </Stepper>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          {isLastStep ? (
            <Button
              type="button"
              variant="default"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </form>

      {showSubmittedData && (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Submitted Data:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// hook -> useMultiStepForm
interface UseMultiStepForm {
  activeStep: number;
  completed: number[];
  isLastStep: boolean;
  handleNext: () => Promise<boolean>;
  handleBack: () => void;
  handleStepClick: (index: number) => void;
  canProceed: boolean;
}

// Define step validation schema - zero-based index
const stepValidationFields: Record<number, string[]> = {
  0: ["personalInfo.firstName", "personalInfo.lastName", "personalInfo.email"],
  1: [
    "address.street",
    "address.city",
    "address.state",
    "address.zipCode",
    "address.country",
  ],
  2: ["professional.company", "professional.role", "professional.experience"],
  3: [],
};

export const useMultiStepForm = (
  form: UseFormReturn<any>,
  totalSteps: number
): UseMultiStepForm => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [canProceed, setCanProceed] = useState(true);

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const fieldsToValidate =
      stepValidationFields[stepIndex];

    // Trigger validation only for the current step's fields
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async (): Promise<boolean> => {
    const isValid = await validateStep(activeStep);

    if (isValid) {
      setCompleted((curr) => [...curr, activeStep]);
      setActiveStep((prev) => prev + 1);
      setCanProceed(true);
      return true;
    } else {
      setCanProceed(false);
      return false;
    }
  };

  const handleBack = () => {
    setCompleted((prev) => prev.filter((step) => step !== activeStep - 1));
    setActiveStep((prev) => prev - 1);
    setCanProceed(true);
  };

  const handleStepClick = (index: number) => {
    if (index < activeStep || completed.includes(index - 1)) {
      setActiveStep(index);
    }
  };

  return {
    activeStep,
    completed,
    isLastStep: activeStep === totalSteps - 1, // Zero-based index
    handleNext,
    handleBack,
    handleStepClick,
    canProceed,
  };
};

export default function Project20() {
    return <MultiStepForm />
}