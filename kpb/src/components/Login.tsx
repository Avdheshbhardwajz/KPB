"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <div
      className={`${poppins.className}flex items-center justify-center border-2 border-black   `}
    >
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form className="space-y-6">
            <div>
              <Label
                htmlFor="loginId"
                className="text-[#13213e] font-semibold text-lg"
              >
                Email or Phone Number
              </Label>
              <Input
                type="text"
                id="loginId"
                placeholder="Enter your email or phone number"
                className="mt-2 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-[#13213e] font-semibold text-lg"
              >
                Password
              </Label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  className="block w-full pr-10 border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <Button className="w-full bg-[#13213e] text-[#ffbd59] hover:bg-[#13213e]/90 text-lg py-6 rounded-lg flex items-center justify-center group">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-[#13213e] hover:text-[#ffbd59] transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
