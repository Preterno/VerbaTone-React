import React from "react";
import { FileText, TextInput } from "./SvgIcons";

function InputType({onMethodUpdate}) {

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[1.375rem] font-medium md:text-[1.725rem] xl:text-3xl min-[1750px]:text-[2.125rem]">
        Select a method to convert your text into speech
      </h2>
      <div className="flex gap-6 md:gap-8">
        <div className="flex gap-1 px-4 py-2 rounded-lg items-center text-xl text-lighter bg-accent cursor-pointer hover:bg-accent-light shadow-custom-sm hover:shadow-custom-md transition-all md:text-2xl md:px-5 md:rounded-xl min-[1750px]:text-3xl"
        onClick={()=>onMethodUpdate(0)}>
            <TextInput/>
            <h3>Text input</h3>
        </div>
        <div className="flex gap-2 px-4 py-2 rounded-lg items-center text-xl text-lighter bg-accent cursor-pointer hover:bg-accent-light shadow-custom-sm hover:shadow-custom-md transition-all md:text-2xl md:px-5 md:rounded-xl  min-[1750px]:text-3xl"
        onClick={()=>onMethodUpdate(1)}>
            <FileText/>
            <h3>File upload</h3>
        </div>
      </div>
    </div>
  );
}

export default InputType;
