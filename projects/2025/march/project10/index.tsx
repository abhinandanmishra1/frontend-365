import { CheckCircle2, EyeIcon, EyeOffIcon, XCircle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  id?: string;
  description?: string;
  onChange?: (value: string, isValid: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  value?: string;
}

const CheckIcon = ({ checked }: { checked: boolean }) => {
  return checked ? (
    <CheckCircle2 className="h-4 w-4 text-green-500" />
  ) : (
    <XCircle className="h-4 w-4 text-gray-400" />
  );
};

const PasswordInput = ({
  id = "password",
  label = "Password",
  description,
  onChange,
  required = false,
}: PasswordInputProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  // Password validation rules
  const validations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const isValid = Object.values(validations).every(Boolean);
  const showError = touched && !isValid && password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (onChange) onChange(value, isValid);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor={id} className="font-medium text-lg">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-gray-600 font-medium">{description}</p>
        )}
      </div>

      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          className={cn(
            "pr-10 text-lg h-12 transition-all duration-200",
            showError
              ? "border-red-500 focus-visible:ring-red-500 shadow-sm shadow-red-200"
              : isValid && password.length > 0
              ? "border-green-500 focus-visible:ring-green-500 shadow-sm shadow-green-200"
              : ""
          )}
          required={required}
          placeholder="Enter your password"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={toggleShowPassword}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </Button>

        {isValid && password.length > 0 && (
          <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
        )}

        {showError && (
          <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
        )}
      </div>

      {showError && (
        <div className="text-sm text-red-500 font-medium mt-2 bg-red-50 p-2 rounded-md border border-red-100">
          Please ensure your password meets all requirements below.
        </div>
      )}

      <div className="space-y-2 mt-3 bg-gray-50 p-3 rounded-md border border-gray-100">
        <p className="text-sm text-gray-700 font-medium">
          Password requirements:
        </p>
        <ul className="space-y-2">
          {Object.entries(validations).map(([key, value]) => (
            <li 
              key={key}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                value ? "text-green-600 font-medium text-sm" : "text-gray-500 text-sm"
              )}
            >
              <CheckIcon checked={value} />
              {key === "minLength" && "At least 8 characters"}
              {key === "hasUppercase" && "At least one uppercase letter"}
              {key === "hasLowercase" && "At least one lowercase letter"}
              {key === "hasNumber" && "At least one number"}
              {key === "hasSpecial" && "At least one special character"}
            </li>
          ))}
        </ul>
      </div>

      {isValid && password.length > 0 && (
        <div className="text-sm text-green-600 font-medium mt-2 bg-green-50 p-2 rounded-md border border-green-100">
          Your password meets all requirements!
        </div>
      )}
    </div>
  );
};

export default function Project10() {
  const [passwordValid, setPasswordValid] = useState(false);

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPasswordValid(isValid);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <form className="space-y-6">
          <PasswordInput
            id="password"
            label="Create Password"
            description="Password must meet all requirements below"
            onChange={handlePasswordChange}
            required
          />

          <Button 
            type="submit" 
            className={cn(
              "w-full h-12 text-lg font-medium mt-4 transition-all duration-300",
              passwordValid ? "bg-green-500 hover:bg-green-600" : ""
            )} 
            disabled={!passwordValid}
          >
            {passwordValid ? "Create Account" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};
