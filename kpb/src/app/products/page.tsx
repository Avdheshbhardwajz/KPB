import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const page = () => {
  return (
    <div className={`${poppins.className} font-bold text-2xl`}>
      this page will show all the products
    </div>
  );
};

export default page;
