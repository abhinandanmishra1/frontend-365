import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const EmailInput = ({
  type: _,
  onBlur,
  value,
  onChange,
  style: initialStyle,
  ...props
}: EmailInputProps) => {
  const [email, setEmail] = useState(value);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setError("Email is required");
    } else if (!regex.test(email)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
    onBlur?.(e);
  };

  return (
    <div>
      <Input
        type="email"
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

export default function Project21() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Subscribe to our newsletter</CardTitle>
          <CardDescription>
            Get the latest updates about Project 21 delivered to your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <EmailInput
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-lg font-medium text-green-600 mb-2">
                Thank you for subscribing!
              </h3>
              <p>We've sent a confirmation email to {email}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setEmail("");
                  setSubmitted(false);
                }}
              >
                Subscribe another email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
