import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const page = () => {
  return (
    <div
      className={`${poppins.className} text-6xl font-bold h-screen w-screen  flex flex-col gap-5 items-center justify-center`}
    >
      Krishna Poshaak Bhandaar
      <Link
        href={"/products"}
        className={`${poppins.className} font-light text-xl p-4 border-2`}
      >
        See All Products
      </Link>
    </div>
  );
};

export default page;
