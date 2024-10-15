import React from "react";
import { Github } from "./SvgIcons";
import "../index.css";

function Navbar() {
  return (
    <div className="bg-primary max-h-14 text-3xl flex justify-between items-center px-5 py-2 shadow-custom-sm cursor-pointer sm:px-10 md:text-4xl lg:px-[5.75%] min-[1750px]:text-[2.5rem] min-[1750px]:py-8 min-[1750px]:px-[7%]">
      <h1 className="title">
        Verba<span className="text-secondary">Tone</span>
      </h1>
      <a href="https://github.com/Preterno/VerbaTone-React">
        <Github />
      </a>
    </div>
  );
}

export default Navbar;
