import React, { useState } from "react";
import { Clear } from "./SvgIcons";

function InputBox({ updateInputText }) {
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="relative bg-accent h-56 rounded-lg w-full shadow-custom-sm hover:shadow-custom-md transition-all md:h-64 md:rounded-x lg:h-full">
      <div
        className="absolute top-1 right-1 z-10 cursor-pointer hover"
        onClick={handleClear}
        role="button"
      >
        <Clear />
      </div>
      <textarea
        id="textarea"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          updateInputText(e.target.value);
        }}
        placeholder="Type or paste your text here to convert it to speech."
        className="bg-accent font-inherit placeholder-lighter px-4 my-7 placeholder-opacity-80 focus:outline-none font-normal text-lg h-44 w-full md:h-48 md:text-xl md:px-5 md:my-9 lg:h-[calc(100%-4rem)] xl:text-[1.375rem] min-[1750px]:text-2xl"
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        draggable="false"
        style={{ userSelect: "none", resize: "none" }}
        maxLength={1000}
      />
      <div className="absolute bottom-1.5 right-2 text-sm text-lighter md:text-base md:right-3 md:bottom-2 min-[1750px]:text-lg">
        {text.length}/1000
      </div>
    </div>
  );
}

export default InputBox;
