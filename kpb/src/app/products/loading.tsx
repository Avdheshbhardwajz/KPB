import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const loading = () => {
  return (
    <div className={`${poppins.className} text-2xl font-bold`}>
      Page is loading bitch
    </div>
  );
};

export default loading;
