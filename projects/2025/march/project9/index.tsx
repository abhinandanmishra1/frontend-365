import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="relative h-[50vh] w-full max-w-3xl flex shadow-lg rounded-lg overflow-hidden">
        <div
          className={`w-1/2 h-full flex flex-col justify-center items-center text-white p-8 transition-all duration-500 ease-in-out 
            ${isSignUp ? "bg-purple-600" : "bg-blue-600"}
          `}
        >
          <motion.h2
            key={isSignUp ? "signup" : "signin"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center"
          >
            {isSignUp ? "Happy to see you join!" : "Welcome Back!"}
          </motion.h2>
          <p className="text-center mt-2 text-lg">
            {isSignUp ? "Join us and explore endless possibilities!" : "Log in to continue your journey!"}
          </p>
        </div>

        <div className="w-1/2 h-full bg-white p-8 flex flex-col justify-center relative overflow-hidden">
          <motion.div
            initial={{ x: isSignUp ? "100%" : "0%" }}
            animate={{ x: isSignUp ? "-100%" : "0%" }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full flex"
          >
            <div className="min-w-full h-full">
              <Card className="p-6 shadow-md rounded-lg h-full">
                <CardContent>
                  <h1 className="text-2xl font-bold mb-4 text-gray-700">Sign In</h1>
                  <Input type="email" placeholder="Email" className="mb-4" />
                  <Input type="password" placeholder="Password" className="mb-4" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                  <p
                    className="text-center text-sm cursor-pointer text-blue-500 mt-4"
                    onClick={() => setIsSignUp(true)}
                  >
                    Don't have an account? Sign up
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="min-w-full h-full">
              <Card className="p-6 shadow-md rounded-lg h-full">
                <CardContent>
                  <h1 className="text-2xl font-bold mb-4 text-gray-700">Sign Up</h1>
                  <Input type="text" placeholder="Name" className="mb-4" />
                  <Input type="email" placeholder="Email" className="mb-4" />
                  <Input type="password" placeholder="Password" className="mb-4" />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>
                  <p
                    className="text-center text-sm cursor-pointer text-purple-500 mt-4"
                    onClick={() => setIsSignUp(false)}
                  >
                    Already have an account? Sign in
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
