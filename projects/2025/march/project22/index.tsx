import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useState } from "react";

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const NumberInput = ({
  value,
  type: _,
  onBlur,
  onChange,
  style: initialStyle,
  ...props
}: NumberInputProps) => {
  const [number, setNumber] = useState(value);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber(value);
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!number) {
      setError("Number is required");
    } else {
      setError("");
    }
    onBlur?.(e);
  };

  return (
    <div>
      <Input
        type="number"
        value={number}
        style={{
          ...initialStyle,
          borderColor: error ? "red" : "",
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      {error && <p className="text-red-500 text-sm py-1">{error}</p>}
    </div>
  );
};

export default function Project22() {
  const [submittedNumber, setSubmittedNumber] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const numberValue = formData.get("number")?.toString() || "";
    setSubmittedNumber(numberValue);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <NumberInput
                name="number"
                value=""
                placeholder="Enter a number"
                className="w-full"
              />
              
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
          
          {submittedNumber && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="font-medium">Submitted number: {submittedNumber}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
