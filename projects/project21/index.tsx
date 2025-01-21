import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");

  const strengthConditions = [
    {
      condition: (password: string) => password.length >= 8,
      message: "Password should be at least 8 characters long",
    },
    {
      condition: (password: string) => /[A-Z]/.test(password),
      message: "Password should contain at least one uppercase letter",
    },
    {
      condition: (password: string) => /[a-z]/.test(password),
      message: "Password should contain at least one lowercase letter",
    },
    {
      condition: (password: string) => /[0-9]/.test(password),
      message: "Password should contain at least one number",
    },
    {
      condition: (password: string) =>
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      message: "Password should contain at least one special character",
    },
  ];

  const strength = useMemo(() => {
    return strengthConditions.filter(({ condition }) => condition(password))
      .length;
  }, [password]);

  return (
    <div className="w-full p-4 relative space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="w-full p-2 border border-gray-200 rounded-md max-w-lg"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex flex-col space-y-2">
        {strengthConditions.map(({ message }, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className={cn("w-4 h-4 rounded-full bg-gray-200", {
                "bg-green-500": strength >= index + 1,
              })}
            ></div>
            <span
              className={cn("text-sm", {
                "text-green-500": strength >= index + 1,
              })}
            >
              {message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default function Project21() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 21</h1>
      <div className="w-1/2">
        <PasswordStrengthChecker />
      </div>
    </div>
  );
}
