"use client";

import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const error = () => {
  return (
    <div className={`${poppins.className} font-bold text-2xl`}>
      Ooops !!! can you please check the products page later on !!
    </div>
  );
};

export default error;
