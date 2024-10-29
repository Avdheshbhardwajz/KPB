"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
// Assume these components exist
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Loginotp from "../../components/Loginotp";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function LoginPage() {
  const [activeComponent, setActiveComponent] = useState<
    "login" | "signup" | "otp"
  >("login");

  return (
    <div className={`${poppins.className} flex h-screen`}>
      {/* Left side - Background and Text */}
      <div className="w-[50%] bg-[#13213e] flex flex-col justify-center items-center p-12">
        <h1 className="text-[#ffbd59] text-5xl font-bold mb-6">Welcome Back</h1>
        <p className="text-[#ffbd59] text-xl text-center max-w-2xl">
          Log in to access your account and enjoy our services. We're glad to
          see you again!
        </p>
      </div>

      {/* Right side - Login/Signup/OTP Components */}
      <div className="w-[50%] bg-white flex flex-col justify-center items-center ">
        {activeComponent === "login" && (
          <>
            <Login />
            <button
              onClick={() => setActiveComponent("signup")}
              className="mt-4 text-blue-600 hover:underline"
            >
              Don't have an account? Create one
            </button>
            <button
              onClick={() => setActiveComponent("otp")}
              className="mt-2 text-blue-600 hover:underline flex items-center"
            >
              Login using mobile number{" "}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </>
        )}

        {activeComponent === "signup" && (
          <>
            <Signup />
            <button
              onClick={() => setActiveComponent("login")}
              className="mt-4 text-blue-600 hover:underline"
            >
              Already have an account? Log in
            </button>
          </>
        )}

        {activeComponent === "otp" && (
          <>
            <Loginotp />
            <button
              onClick={() => setActiveComponent("login")}
              className="mt-4 text-blue-600 hover:underline"
            >
              Back to regular login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
