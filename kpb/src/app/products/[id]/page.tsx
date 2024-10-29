import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div className={`${poppins.className} text-2xl font-bold`}>
      page of Product - {id}
    </div>
  );
};

export default page;
