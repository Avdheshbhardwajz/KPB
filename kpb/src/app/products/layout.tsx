import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const layout = ({ children }) => {
  return (
    <div>
      <header
        className={`${poppins.className} p-4 border-2 border-black bg-orange-200 font-bold text-2xl m-4 text-center`}
      >
        this is a header
      </header>
      <main className="border-2 p-8 m-4 border-black text-center">
        {children}
      </main>
      <footer
        className={`${poppins.className} p-4 border-2 border-black bg-orange-200 font-bold text-2xl m-4 text-center`}
      >
        this is just a footer
      </footer>
    </div>
  );
};

export default layout;
