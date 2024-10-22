import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const page = () => {
  return (
    <div
      className={`${poppins.className} text-6xl font-bold h-screen w-screen  flex flex-row items-center justify-center`}
    >
      Krishna Poshaak Bhandaar
    </div>
  );
};

export default page;
