import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

// Types for generated password result
interface PasswordResult {
  password: string;
  strength: "Weak" | "Medium" | "Strong";
}

const PasswordGenerator = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const [generatedPassword, setGeneratedPassword] = useState<PasswordResult>({
    password: "",
    strength: "Weak",
  });

  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  const generatePassword = () => {
    let characterPool = "";
    let password = "";

    if (options.includeUppercase) characterPool += characterSets.uppercase;
    if (options.includeLowercase) characterPool += characterSets.lowercase;
    if (options.includeNumbers) characterPool += characterSets.numbers;
    if (options.includeSymbols) characterPool += characterSets.symbols;

    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    const strength = determinePasswordStrength(password);

    setGeneratedPassword({ password, strength });
  };

  const determinePasswordStrength = (
    password: string
  ): PasswordResult["strength"] => {
    let strengthScore = 0;

    if (password.length >= 12) strengthScore++;
    if (/[A-Z]/.test(password)) strengthScore++;
    if (/[a-z]/.test(password)) strengthScore++;
    if (/[0-9]/.test(password)) strengthScore++;
    if (/[!@#$%^&*()_+\-=\[\]{};:,.<>?]/.test(password)) strengthScore++;

    if (strengthScore <= 2) return "Weak";
    if (strengthScore <= 4) return "Medium";
    return "Strong";
  };

  const copyToClipboard = () => {
    if (generatedPassword.password) {
      navigator.clipboard.writeText(generatedPassword.password);
      alert("Password copied to clipboard!");
    }
  };

  return (
    <div className="flex justify-center items-center p-10 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              value={generatedPassword.password}
              readOnly
              placeholder="Generated Password"
              className="mb-2"
            />
            <div className="flex justify-between items-center">
              <span>
                Strength:
                <span
                  className={`ml-2 font-bold ${
                    generatedPassword.strength === "Weak"
                      ? "text-red-500"
                      : generatedPassword.strength === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {generatedPassword.strength}
                </span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                disabled={!generatedPassword.password}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Label>Password Length: {options.length}</Label>
            <Slider
              defaultValue={[options.length]}
              min={4}
              max={32}
              step={1}
              onValueChange={(value) =>
                setOptions((prev) => ({
                  ...prev,
                  length: value[0],
                }))
              }
            />
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.includeUppercase}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeUppercase: !!checked,
                  }))
                }
              />
              <Label htmlFor="uppercase">Include Uppercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.includeLowercase}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeLowercase: !!checked,
                  }))
                }
              />
              <Label htmlFor="lowercase">Include Lowercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeNumbers: !!checked,
                  }))
                }
              />
              <Label htmlFor="numbers">Include Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.includeSymbols}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeSymbols: !!checked,
                  }))
                }
              />
              <Label htmlFor="symbols">Include Symbols</Label>
            </div>
          </div>

          <Button
            onClick={generatePassword}
            className="w-full"
            disabled={
              !options.includeUppercase &&
              !options.includeLowercase &&
              !options.includeNumbers &&
              !options.includeSymbols
            }
          >
            Generate Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Project26() {
  return <PasswordGenerator />;
}
